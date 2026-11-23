# CHESTER MOVIE HUB - Your World of Entertainment
Group assignment, Principles of Web Design (BIWD1110/DIWD1110), Limkokwing University of Creative Technology.
Technologies: HTML5, CSS3, Bootstrap 5 (CDN), vanilla JavaScript, JSON, Fetch API, localStorage.

## Run it in VS Code (required: Fetch API needs a server)
1. Open the `CHESTER MOVIE HUB` folder in VS Code (File > Open Folder).
2. Install the **Live Server** extension (Ritwick Dey).
3. Right-click `index.html` > **Open with Live Server**. Do NOT double-click the file (file:// blocks Fetch).
4. Internet is needed for Bootstrap, Google Fonts and YouTube trailers (all loaded from CDNs).

## Folder structure
```
index.html  browse.html  details.html  my-list.html  signin.html  about.html
css/style.css
js/  movies.js (data + fetch) | watchlist.js (localStorage) | script.js (shared cards, modal, messages)
     home.js | browse.js | details.js | my-list.js | validation.js
data/movies.json   images/logo.svg  images/banners/hero.svg  images/posters/*.svg
docs/REPORT.md  docs/PRESENTATION_NOTES.md
```

## Host online (GitHub Pages)
1. Create a free GitHub account and a new **public** repository named `CHESTER MOVIE HUB`.
2. Upload ALL files and folders (keep `index.html` at the top level, not inside another folder).
3. Repository > Settings > Pages > Source: **Deploy from a branch** > Branch `main` / `(root)` > Save.
4. After 1-2 minutes your link is `https://YOURNAME.github.io/CHESTER MOVIE HUB/`. Open it in a private window to confirm no login is needed, then submit it on Google Classroom.
(Netlify alternative: drag the folder onto app.netlify.com/drop.)

## Images, trailers and licences
- Posters, logo and banner are **original SVG artwork** created for this project (no copyright issues). Posters for the open movies are our own stylised art, not official posters.
- Six titles (Big Buck Bunny, Sintel, Tears of Steel, Elephants Dream, Cosmos Laundromat, Spring) are open movies by the Blender Foundation / Blender Studio, released under Creative Commons Attribution licences. Their trailer links point to the official YouTube videos.
- The other six titles are invented sample titles; they reuse an open-movie video as a demo trailer. Replace them with your own trailer links if your lecturer prefers.
- Sign In / Sign Up is a demonstration only: no password, nothing stored or sent.

## Before you submit - test these yourselves
Check every box in `docs/REPORT.md` section 19 on a real phone and a laptop, and confirm every trailer plays (the YouTube IDs could not be tested while this project was generated).
