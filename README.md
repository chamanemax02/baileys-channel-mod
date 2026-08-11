<h1 align='center'>
  <br>
  <span>baileys-channel-mod (v1.0.0)</span>
</h1>

<div align='center'>
  <p><strong>A custom-modded version of <code>@whiskeysockets/baileys</code> (v7.0.0-rc14) patched to support WhatsApp Channel Message Sending, Interactive Native Flow Buttons, and Auto-Channel Follow.</strong></p>

  <p>
    <a href="https://chamindu.site"><img src="https://img.shields.io/badge/Developer-Chamindu%20Ransika-ff69b4?style=for-the-badge&logo=opsgenie" alt="Developer Badge"/></a>
    <a href="https://chamindu.site"><img src="https://img.shields.io/badge/Website-chamindu.site-blue?style=for-the-badge&logo=google-chrome" alt="Website Badge"/></a>
    <a href="https://whatsapp.com/channel/120363427108046852"><img src="https://img.shields.io/badge/WhatsApp-Follow%20Channel-25D366?style=for-the-badge&logo=whatsapp" alt="Channel Badge"/></a>
  </p>
</div>

<hr />

## ✨ Key Features & Modifications

* 🎛️ **Interactive Native Flow Buttons**: Built-in support for sending interactive button menus (Quick Replies, URL links, Copy Code, Call buttons) with 2-column grid support, formatted automatically with `viewOnceMessage` and `messageContextInfo`.
* 📢 **WhatsApp Channel Message Sending**: Directly send text, media, and rich content to WhatsApp Channels (`@newsletter`) using `sock.sendMessage()` or `sock.newsletterSendMessage()`.
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

## 💡 Interactive Buttons Example

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

    // 1. Send Interactive Native Flow Buttons (Quick Reply + URL + Copy Code + Call):
    await sock.sendMessage(jid, {
        title: "💖 Hello User...! 🌸",
        text: "✨ Welcome to MINI Menu ✨\n\nTap any category button below:",
        footer: "Powered by CHAMINDU OFC",
        buttons: [
            { type: 'quick_reply', text: '1. 🛠️ System', id: '.system' },
            { type: 'quick_reply', text: '2. 👥 Group', id: '.group' },
            { type: 'quick_reply', text: '3. 🏞️ Media', id: '.media' },
            { type: 'quick_reply', text: '4. 📥 Download', id: '.download' },
            { type: 'url', text: 'SULA-MD Web', url: 'https://chamindu.site' },
            { type: 'copy', text: 'Copy Code', code: 'CHAMINDU-OFC-2026' }
        ]
    });

    // Or use dedicated helper method:
    await sock.sendInteractiveButtons(jid, {
        text: "Tap a button:",
        buttons: [
            { type: 'quick_reply', text: 'Ping', id: '.ping' },
            { type: 'url', text: 'Visit Website', url: 'https://chamindu.site' }
        ]
    });

    // 2. Send Message to WhatsApp Channel:
    await sock.sendMessage('120363427108046852@newsletter', { text: 'Hello Channel!' });
}

connectToWhatsApp();
```

---

## 👨‍💻 Developer & Credits

Developed and Modded by **Chamindu Ransika (CHAMINDU OFC)**.  
Website: [chamindu.site](https://chamindu.site)  
WhatsApp Channel: [Follow Channel](https://whatsapp.com/channel/120363427108046852)
