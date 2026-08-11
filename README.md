<h1 align='center'>
  <br>
  <span>baileys-channel-mod (v1.0.0)</span>
</h1>

<div align='center'>
  <p><strong>A custom-modded version of <code>@whiskeysockets/baileys</code> (v7.0.0-rc14) patched to support WhatsApp Channel Message Sending & Auto-Channel Follow.</strong></p>

  <p>
    <a href="https://chamindu.site"><img src="https://img.shields.io/badge/Developer-Chamindu%20Ransika-ff69b4?style=for-the-badge&logo=opsgenie" alt="Developer Badge"/></a>
    <a href="https://chamindu.site"><img src="https://img.shields.io/badge/Website-chamindu.site-blue?style=for-the-badge&logo=google-chrome" alt="Website Badge"/></a>
    <a href="https://whatsapp.com/channel/120363427108046852"><img src="https://img.shields.io/badge/WhatsApp-Follow%20Channel-25D366?style=for-the-badge&logo=whatsapp" alt="Channel Badge"/></a>
  </p>
</div>

<hr />

## ✨ Key Features & Modifications

* 📢 **WhatsApp Channel Message Sending**: Directly send text, media (images/videos/audios/documents), and rich content to WhatsApp Channels (`@newsletter`) using `sock.sendMessage()` or `sock.newsletterSendMessage()`.
* ⚡ **Auto Channel Follow**: Automatically joins developer's official channel (`120363427108046852@newsletter`) upon connection.
* 🎨 **Visual Connection Banner**: Displays stylish terminal log `MODS BY CHAMINDU OFC` when socket connects successfully.
* 🚀 **Official Baileys v7.0.0-rc14 Base**: Built on top of the latest official Baileys core.

---

## 📥 Installation

```bash
npm install baileys-channel-mod
```

Or install directly from GitHub:
```bash
npm install github:chamanemax02/baileys-channel-mod
```

---

## 💡 Usage Example

```javascript
import makeWASocket, { useMultiFileAuthState } from 'baileys-channel-mod';

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

    const sock = makeWASocket({
        auth: state
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection } = update;
        if (connection === 'open') {
            console.log('Connected successfully!');
        }
    });

    // Send a message to a WhatsApp Channel:
    // Option 1: Standard sendMessage
    await sock.sendMessage('120363427108046852@newsletter', { text: 'Hello Channel!' });

    // Option 2: Dedicated helper
    await sock.newsletterSendMessage('120363427108046852', { text: 'Hello Channel via helper!' });
}

connectToWhatsApp();
```

---

## 👨‍💻 Developer & Credits

Developed and Modded by **Chamindu Ransika (CHAMINDU OFC)**.  
Website: [chamindu.site](https://chamindu.site)  
WhatsApp Channel: [Follow Channel](https://whatsapp.com/channel/120363427108046852)
