# DakuBhaiya Cricket Website

A responsive, static HTML/CSS/JavaScript website suitable for free static hosting.

## Customize first
Open `script.js` and update:
- `telegramUrl`: your real Telegram group/channel link, such as `https://t.me/yourgroup`
- `matchTitle`, `teamA`, `teamB`, `format`, and `matchTime`
- `fixtures`: add your current match schedule
- `streamType` and `streamUrl`: use `mp4` only for an authorized direct MP4 URL, or `embed` for an authorized provider embed URL. Leave `none` until you have a permitted stream.

The site does not host or provide cricket streams. Some providers block embedding; in that case, use the broadcaster's official watch link instead.

## Free deploy with Cloudflare Pages
1. Create a GitHub repository and upload `index.html`, `style.css`, and `script.js`.
2. Sign in to Cloudflare and open **Workers & Pages**.
3. Choose **Create** → **Pages** → connect your Git repository.
4. Framework preset: **None**. Build command: leave blank. Build output directory: `/` (or the repository root, as shown by the current Cloudflare UI).
5. Deploy. Cloudflare will give you a `*.pages.dev` address.
6. Test on a phone, then share the link in your Telegram group.

## Quick local test
Open `index.html` in a browser. Some stream providers require HTTPS and may not play from a local file; test those after deployment.

## Safety and permissions
Use only streams you own or have permission to embed. Never publish private stream tokens, API keys, or paid-access credentials in front-end code.
