# Presentation notes - what to say and show
1. **Start (30 s):** CHESTER MOVIE HUB, tagline, six pages. Show the home page on Live Server.
2. **HTML5:** open `browse.html` source, point at header/nav/main/section/article/footer.
3. **CSS3:** open `style.css`. Show `:root` colours, `.movie-grid` (Grid), `.hero` (Flexbox), hover on `.movie-card`, media queries. Resize the browser.
4. **Bootstrap:** navbar collapse on a narrow window, trailer modal, FAQ accordion, grid columns.
5. **Arrays/objects + Fetch:** open `data/movies.json`, then `movies.js` `loadMovies()`. Demo the fallback by renaming the JSON file for a moment (rename it back!).
6. **Search/filter:** type "robot", click "Science Fiction", search "zzz" to show the no-results message.
7. **localStorage:** add 2 movies, refresh, open DevTools > Application > Local Storage > `CHESTER MOVIE HUBMyList`. Remove one. Try adding twice (it removes - toggle).
8. **Validation:** wrong email shows error; correct email shows success. Mention it is demo-only with no password.
9. **Hosting:** show the public URL on a phone.
**Likely questions:** Why Live Server? (fetch needs http.) Why only IDs in localStorage? (small, avoids duplicate data.) What does `event.preventDefault()` do? (stops the form reloading the page.) How do you pass the movie to details.html? (`?id=3`, read with `URLSearchParams`.)
