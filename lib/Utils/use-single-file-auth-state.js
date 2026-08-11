import { existsSync, readFileSync, writeFileSync } from 'fs';
import { DEFAULT_CACHE_TTLS } from '../Defaults/index.js';
import { proto } from '../../WAProto/index.js';
import { initAuthCreds } from './auth-utils.js';
import { BufferJSON } from './generics.js';
import { LRUCache } from 'lru-cache';
import { Mutex } from 'async-mutex';
const FLUSH_TIMEOUT_MS = 3000;
export const useSingleFileAuthState = async (fileName) => {
    const cache = new LRUCache({
        max: 15000,
        ttl: 1000 * DEFAULT_CACHE_TTLS.SIGNAL_STORE,
        updateAgeOnGet: false,
        updateAgeOnHas: false,
        ttlAutopurge: true
    });
    const mutex = new Mutex();
    let fileData = {};
    let isLoaded = false;
    let flushTimeout = null;
    const loadKey = async () => {
        return await mutex.runExclusive(async () => {
            if (isLoaded)
                return;
            try {
                if (existsSync(fileName)) {
                    const data = JSON.parse(readFileSync(fileName, 'utf-8'), BufferJSON.reviver);
                    fileData = data || {};
                    for (const [keyName, value] of Object.entries(fileData)) {
                        cache.set(keyName, value);
                    }
                }
            }
            catch {
                fileData = {};
            }
            isLoaded = true;
        });
    };
    const flushKey = () => {
        if (flushTimeout)
            return;
        flushTimeout = setTimeout(async () => {
            flushTimeout = null;
            await mutex.runExclusive(async () => {
                try {
                    const tempFile = fileName + '.temp';
                    writeFileSync(tempFile, JSON.stringify(fileData, BufferJSON.replacer));
                    const fsPromises = await import('fs/promises');
                    await fsPromises.rename(tempFile, fileName);
                }
                catch { }
            });
        }, FLUSH_TIMEOUT_MS);
    };
    const writeKey = (keyName, value) => {
        cache.set(keyName, value);
        fileData[keyName] = value;
        flushKey();
    };
    const removeKey = (keyName) => {
        cache.delete(keyName);
        delete fileData[keyName];
        flushKey();
    };
    if (!existsSync(fileName)) {
        writeFileSync(fileName, '{}');
    }
    await loadKey();
    const creds = fileData['creds'] || initAuthCreds();
    return {
        state: {
            creds,
            keys: {
                get: (type, ids) => {
                    const data = {};
                    for (const id of ids) {
                        const keyName = type + id;
                        let value = cache.get(keyName);
                        if (value === undefined && fileData[keyName] !== undefined) {
                            value = fileData[keyName];
                            cache.set(keyName, value);
                        }
                        if (type === 'app-state-sync-key' && value) {
                            value = proto.Message.AppStateSyncKeyData.fromObject(value);
                        }
                        data[id] = value;
                    }
                    return data;
                },
                set: (data) => {
                    for (const category in data) {
                        for (const id in data[category]) {
                            const keyName = category + id;
                            const value = data[category][id];
                            value ? writeKey(keyName, value) : removeKey(keyName);
                        }
                    }
                }
            }
        },
        saveCreds: () => writeKey('creds', creds)
    };
};
//# sourceMappingURL=use-single-file-auth-state.js.map