## Board-approved design refresh (Version 1.1)
The header now uses the supplied SLDHA logo and approved slogan. This is still a public resource-link dashboard, **not** an authenticated portal. Links in `config.js` remain unconfigured. Do not store private Board records or credentials in this repository. The Board-approved initiative status does not imply the application is production-ready.

# SLDHA Board Connect — Free PWA Starter

This is a **public-facing shortcut dashboard**, not a private authentication system. It stores **no** confidential Board data, passwords, patient data, or personal health information. Official Association branding and links must be approved before public launch.

## Upload to your existing GitHub repository

1. Download the ZIP and extract it on your computer.
2. Open your `sldha-board-connect` GitHub repository.
3. Choose **Add file → Upload files** (or use the upload link on the repository home page).
4. Upload the contents of the extracted `sldha-board-connect` folder **into the repository root**: `index.html`, `style.css`, `app.js`, `config.js`, `manifest.webmanifest`, `service-worker.js`, `README.md`, and the `icons` folder. Do not upload an extra enclosing folder.
5. Select **Commit changes**.
6. Go to **Settings → Pages → Build and deployment**. Set **Source: Deploy from a branch**, **Branch: main**, **Folder: / (root)** and save.
7. Visit `https://YOUR-GITHUB-USERNAME.github.io/sldha-board-connect/` after GitHub publishes the site. If you used a different repository name, change the URL accordingly.

## Connect Google folders (next step)

Edit `config.js` on GitHub and replace the empty strings with *approved* HTTPS links to Google Drive folders, Calendar pages, or Google Forms. Example:

```js
window.SLDHA_CONFIG = {
  meetings: 'https://drive.google.com/drive/folders/EXAMPLE',
  documents: '',
  reports: '',
  announcements: '',
  fundraising: '',
  directory: ''
};
```

Do not put secret links, private member names, credentials, tokens, private emails, patient records, or confidential text in `config.js` or elsewhere in the GitHub repository. **Even restricted Google Drive URLs will be visible to anyone viewing the dashboard source**; only share URLs the Association approves exposing. Google Drive permissions must remain **Restricted**, with access explicitly granted to authorized Board members. A visible link does not grant access, but may expose document IDs. For particularly sensitive material, avoid publishing its link at all.

## Install

- **Android:** Open the deployed site in Chrome, then choose Install app / Add to Home screen.
- **iPhone:** Open the deployed site in Safari, use Share → Add to Home Screen.
- **Desktop:** Supported browsers may show an install option.

Offline mode provides the dashboard shell only. Google resources require an internet connection and authorized access.

## Security and maintenance

- GitHub Pages is public; this starter app has **no Board login**.
- Do not use the app for medical records or private internal announcements.
- Protect Google accounts with two-step verification and review folder access regularly.
- All icons are generic placeholders, not the official SLDHA logo.
- The service worker caches only the app shell and same-origin assets, not external Google documents.
- Free services have usage limits and policies that can change.
