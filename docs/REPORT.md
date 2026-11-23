# CHESTER MOVIE HUB - Project Report (draft)
> Sections marked **[GROUP TO COMPLETE]** need your real information. Do not invent results, screenshots, references or contributions.

## 1. Cover page  **[GROUP TO COMPLETE]**
Limkokwing University of Creative Technology | Faculty of ICT | BIWD1110/DIWD1110 Principles of Web Design | Group assignment (40%) | CHESTER MOVIE HUB | Group member names and student IDs | Lecturer | Date | Public URL.

## 2. Introduction
CHESTER MOVIE HUB is a responsive movie-streaming demonstration website with a dark cinematic design. Visitors can browse a catalogue, search and filter, read details, watch trailers, and keep a personal list.

## 3. Background
Streaming platforms are a major way people discover entertainment. This project recreates the general user experience (not the branding) of such platforms to practise front-end web development.

## 4. Problem statement
Many beginner websites look good but have buttons that do nothing. The project aims to build a site where every feature works and the code is simple enough to explain.

## 5. Objectives
- Build six linked, semantic HTML5 pages.
- Style them with an external CSS3 file and Bootstrap 5.
- Load data from a JSON file with the Fetch API.
- Implement search, genre filtering, My List (localStorage) and form validation.
- Publish the site online.

## 6. Target audience
Students, young adults and families who want a simple movie catalogue on any device.

## 7. Scope
Included: catalogue, details, trailers, My List, demo forms, about/FAQ. Not included: real login, payments, full-length video streaming, a database or server code.

## 8. Technologies
HTML5, CSS3, Bootstrap 5.3 (CDN), JavaScript (ES6), JSON, Fetch API, localStorage, VS Code + Live Server, Git/GitHub Pages.

## 9. Structure and sitemap
```
Home (index) --- Browse --- Details (details.html?id=N)
     |-- My List
     |-- About / Help
     |-- Sign In / Sign Up (demo)
```

## 10. Design and colours
Black #080808 (background), charcoal #151515 (cards, footer), red #E50914 (accents, buttons), dark red #B20710 (hover), white #FFFFFF (text), grey #B3B3B3 (secondary text). Fonts: Bebas Neue for headings, Inter for body. The colours are stored as CSS variables in `:root`.

## 11. HTML5
Semantic elements `header`, `nav`, `main`, `section`, `article`, `footer`; headings, paragraphs, lists, images with `alt` text, links, forms with `label`s, buttons, unique page titles and a viewport meta tag.

## 12. CSS3
`css/style.css` uses element, class and ID selectors; typography; colours; borders; margin/padding and the box model; Flexbox (hero, rows, card buttons); CSS Grid (`.movie-grid`); hover effects (cards, buttons, links); `:focus-visible` outlines; media queries at 991px and 575px.

## 13. Bootstrap
Used for: responsive navbar with collapse toggler (mobile menu), grid system (`row`/`col-*`), buttons, forms and validation classes, modal (trailer player), accordion (FAQ), alerts, and spacing/flex utilities (`py-4`, `d-flex`, `gap-2`). Bootstrap's 12-column grid and breakpoints let layouts rearrange automatically on phones, tablets and desktops.

## 14. JavaScript
Variables, data types, operators, conditions, loops, functions, arrays, objects, DOM selection and manipulation, and events (`click`, `input`, `submit`). Key functions: `loadMovies()`, `createMovieCard()`, `showMovies()` (search + filter), `addToList()`, `removeFromList()`, `isValidEmail()`, `openTrailer()`.

## 15. Arrays and objects
The catalogue is an array of 12 objects: `id, title, genre, year, duration, description, fullDescription, poster, trailer, source`. Loops build cards from this array, so cards are not hardcoded.

## 16. Search and filtering
`showMovies()` in `browse.js` filters the array: a movie is kept if its genre matches the selected genre AND the typed text appears in its title or description. Results update on every `input` event; a message appears when nothing matches.

## 17. localStorage
`watchlist.js` saves an array of movie IDs under the key `CHESTER MOVIE HUBMyList` using `JSON.stringify`, and reads it with `JSON.parse`. `addToList` refuses duplicates. The list is restored on every page load.

## 18. Fetch API and JSON
`loadMovies()` fetches `data/movies.json`, shows "Loading..." while waiting, checks `response.ok`, and on failure (try/catch) returns the built-in fallback array and shows a warning message.

## 19. Testing and results  **[GROUP TO COMPLETE - record real results]**
| Test | Device / browser | Pass / Fail | Notes |
|---|---|---|---|
| Navigation works on every page | | | |
| 12 movies appear; 3+ genres | | | |
| Search works | | | |
| Genre filter works | | | |
| Details page opens for each movie | | | |
| Trailers play (all 12) | | | |
| Add / remove My List; survives refresh | | | |
| Form validation (valid + invalid input) | | | |
| JSON fetch works; error message when JSON missing | | | |
| Mobile layout, no sideways scrolling | | | |
| Public URL works without login | | | |

## 20. Challenges  **[GROUP TO COMPLETE - write your real experience]**
## 21. Conclusion  **[GROUP TO COMPLETE]**
## 22. References  **[GROUP TO COMPLETE - list only sources you actually used]**
Suggested to verify and cite: Bootstrap 5 documentation (getbootstrap.com); MDN Web Docs (Fetch API, localStorage); Blender Foundation open movies (blender.org/about/projects); lecturer notes.
## 23. Group contribution log  **[GROUP TO COMPLETE]**
| Member | Student ID | Tasks actually completed |
|---|---|---|
