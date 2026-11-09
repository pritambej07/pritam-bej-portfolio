# Pritam Bej — Portfolio

A static, no-build-step portfolio (HTML + CSS + vanilla JS). Three.js is loaded from a CDN for the hero background, with an automatic 2D fallback.

## Run it (VS Code)
1. Unzip and open the folder in VS Code.
2. Install the **Live Server** extension → right-click `index.html` → **Open with Live Server**.
   (Or in a terminal: `python -m http.server 8080` then open http://localhost:8080)
> Open it via a local server, not by double-clicking the file — the JS uses ES modules.
> An internet connection is needed for Google Fonts and Three.js (CDN). Without it the site still works with fallback fonts and a 2D particle background.

## Make the contact form send real emails
1. Go to https://web3forms.com, enter `bpritam2005@gmail.com`, and get your free Access Key by email.
2. Paste it into `js/config.js` → `WEB3FORMS_ACCESS_KEY`.
Until then the form honestly says it is not connected and offers a mailto fallback. The key is a public key by design; no private secrets live in this project.

## Edit content
- Projects, skills, certifications, social links: top of `js/main.js` (`PROJECTS`, `SKILLS`, `CERTS`, `SOCIALS`).
  To add a repo/demo link to a project, add `repo: '...'` and/or `demo: '...'` (and `desc`, `tags`, `features`).
- Intro text, About, Education: `index.html`.
- Colours: CSS variables at the top of `css/styles.css` (`--bg`, `--lime`, ...). Theme = black `#050505`, white, electric lime `#CCFF00`.
- Images: replace files in `images/` keeping the same names. Personal photos: `images/personal/`.
- Resume: no CV file was supplied, so no resume button exists. Add `resume.pdf` and a button in `index.html` when ready.

## Deploy (free)
Upload the folder to Netlify (drag & drop), Vercel, GitHub Pages or Cloudflare Pages. Afterwards:
- Add `<link rel="canonical" href="https://YOUR-DOMAIN/">` in `index.html`.
- Replace `YOUR-DOMAIN` in `sitemap.xml` and `robots.txt`.
- For link previews, use absolute URLs for `og:image`.

## Features
Cinematic Three.js hero (quality tiers, pause off-screen, reduced-motion & no-WebGL fallbacks), scramble-text headline, drawer menu, project cards with 3D tilt + detail modals, Ctrl/Cmd+K command palette, scroll progress, validated contact form with spam protection, SEO metadata + JSON-LD, accessible focus states.

## Notes
- The 14 non-personal images are procedurally generated conceptual illustrations (not AI photos and not screenshots). Swap in your own anytime.
- Fiverr's icon is a simple stylised mark; swap in the official logo SVG if you want exact branding.
- Only Fitness Zone has verified details; the other nine show their category and "Details soon" until you add real info.

## Dark cinematic redesign
- Hero portrait: `images/personal/pritam-hero-bw.webp` (black & white, vignette baked in, transparent edges). Your untouched originals are in `images/personal/originals/`.
- To use a different hero photo, regenerate the B&W file and keep the same filename (or change the `<img>` in `index.html`).
- Supporting illustrations are shown in monochrome via CSS filters (`grayscale(1)`); the About photo turns to colour on hover.
- Cinematic layer (film grain, ambient lime glows, hero ring) sits at the end of `css/styles.css`.
