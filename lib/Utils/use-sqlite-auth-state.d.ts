import type { AuthenticationState } from '../Types/index.js';
export declare function useSqliteAuthState(opts: {
    database?: any;
    dbPath?: string;
}): Promise<{
    state: AuthenticationState;
    saveCreds: () => Promise<void>;
}>;
//# sourceMappingURL=use-sqlite-auth-state.d.ts.map