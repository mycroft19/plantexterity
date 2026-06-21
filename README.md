# Plantexterity — Lab Website

Static multi-page website for **Plantexterity** — Integrated Plant Production & Aquaculture Lab.
No build step, no framework. Just HTML, CSS, and a small JS file. Open `index.html` to view.

## Pages
`index.html` (Home), `about.html`, `research.html`, `products.html`, `training.html`,
`academic.html`, `services.html`, `gallery.html`, `contact.html`.

## Project layout
```
plantexterity/
  *.html                 9 pages (shared header + footer markup in each)
  assets/css/styles.css  all styling; colors are CSS variables at the top
  assets/js/main.js      mobile nav, footer year, contact form handling
  assets/img/            favicon + (add your photos here)
  README.md              this file
```

## ⚠️ Placeholders to fill in
Search the project for these tokens and replace every occurrence:

| Token | What to put | Where |
|-------|-------------|-------|
| `REPLACE_EMAIL` | Lab email address | footer of every page + `contact.html` + `main.js` |
| `REPLACE_PHONE` | Phone number. For the WhatsApp link use country code + number, **no spaces or `+`** (e.g. `919812345678`) | footers + `contact.html` |
| `REPLACE_ADDRESS` | Physical lab address | footers + `contact.html` |
| `REPLACE_ME` | Contact form endpoint (see below) | `contact.html` `<form action>` |

Tip — replace across all files at once:
```bash
cd plantexterity
grep -rl REPLACE_EMAIL . | xargs sed -i '' 's/REPLACE_EMAIL/lab@example.com/g'   # macOS
```

## Contact form
The form currently has `action="REPLACE_ME"`. Until you set a real endpoint, submitting
the form opens the visitor's email app (via `mailto:`) so no message is lost.

To receive submissions on the site, use a free form relay — no server needed:
- **Formspree:** create a form at formspree.io, then set
  `action="https://formspree.io/f/yourID"` and `method="POST"` in `contact.html`.
- **Netlify Forms:** if hosting on Netlify, add `data-netlify="true"` to the `<form>` and
  set `action="/thank-you.html"` (Netlify auto-captures it).

## Google Map
In `contact.html`, find the `.map-embed` block and replace its inner content with the
embed iframe from Google Maps (Share → Embed a map → copy `<iframe>`).

## Gallery photos
In `gallery.html`, replace each `<div class="tile">…</div>` with:
```html
<img src="assets/img/your-photo.jpg" alt="Description of photo" class="tile" style="object-fit:cover" />
```
Put image files in `assets/img/`.

## Changing colors
All theme colors are CSS variables at the top of `assets/css/styles.css` (`:root { … }`).
Change `--green`, `--teal`, etc. in one place to retheme the whole site.

## Preview locally
```bash
cd plantexterity
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (free options)
- **Netlify:** drag the `plantexterity` folder onto app.netlify.com/drop.
- **GitHub Pages:** push to a repo, Settings → Pages → deploy from `main` / root.
- **Any web host:** upload all files via FTP. No server config required.
