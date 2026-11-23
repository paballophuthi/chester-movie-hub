/* browse.js - catalogue with search + genre filter */
const grid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const genreButtons = document.getElementById("genreButtons");
const resultInfo = document.getElementById("resultInfo");
let movies = [];
let selectedGenre = "All";

// Read a search term passed from the homepage navigation.
const initialQuery = new URLSearchParams(window.location.search).get("q");
if (initialQuery) { searchInput.value = initialQuery; }

// Show movies that match BOTH the search text and the selected genre
function showMovies() {
  const text = searchInput.value.trim().toLowerCase();
  const matches = movies.filter(function (movie) {
    const genreOk = selectedGenre === "All" || movie.genre === selectedGenre;
    const textOk = movie.title.toLowerCase().includes(text) ||
                   movie.description.toLowerCase().includes(text) ||
                   movie.fullDescription.toLowerCase().includes(text);
    return genreOk && textOk;
  });

  const sortMode = sortMovies ? sortMovies.value : "default";
  if (sortMode === "newest") matches.sort(function (a, b) { return b.year - a.year; });
  if (sortMode === "oldest") matches.sort(function (a, b) { return a.year - b.year; });
  if (sortMode === "title") matches.sort(function (a, b) { return a.title.localeCompare(b.title); });

  if (matches.length === 0) {
    grid.innerHTML = '<p class="text-center py-5" style="grid-column:1/-1">No movies match your search. Try a different word or choose "All".</p>';
  } else {
    let html = "";
    for (const movie of matches) { html += createMovieCard(movie, false); }
    grid.innerHTML = html;
  }
  resultInfo.textContent = matches.length + " of " + movies.length + " movies";
}

// Create one button per genre (found by looping the data)
function buildGenreButtons() {
  const genres = ["All"];
  movies.forEach(function (m) { if (!genres.includes(m.genre)) { genres.push(m.genre); } });
  genreButtons.innerHTML = genres.map(function (g) {
    return '<button type="button" class="btn btn-outline-light btn-sm genre-btn' + (g === "All" ? " active" : "") + '" data-genre="' + g + '">' + g + '</button>';
  }).join("");
}

// EVENT 2: click on a genre button
genreButtons.addEventListener("click", function (event) {
  const btn = event.target.closest(".genre-btn");
  if (!btn) { return; }
  selectedGenre = btn.dataset.genre;
  document.querySelectorAll(".genre-btn").forEach(function (b) { b.classList.remove("active"); });
  btn.classList.add("active");
  showMovies();
});

// EVENT 3: typing in the search box updates results immediately
searchInput.addEventListener("input", showMovies);
if (sortMovies) { sortMovies.addEventListener("change", showMovies); }

document.getElementById("surpriseBrowse").addEventListener("click", function () {
  if (!movies.length) return;
  const pool = movies.filter(function (movie) {
    const text = searchInput.value.trim().toLowerCase();
    return (selectedGenre === "All" || movie.genre === selectedGenre) &&
      (!text || movie.title.toLowerCase().includes(text) || movie.description.toLowerCase().includes(text));
  });
  const choices = pool.length ? pool : movies;
  const pick = choices[Math.floor(Math.random() * choices.length)];
  window.location.href = "details.html?id=" + pick.id;
});

async function startBrowse() {
  grid.innerHTML = '<p style="grid-column:1/-1">Loading movies...</p>';
  const result = await loadMovies();
  movies = result.movies;
  setAllMovies(movies);
  if (result.usedFallback) {
    document.getElementById("browseAlert").classList.remove("d-none");
  }
  buildGenreButtons();
  const requestedGenre = pageParams.get("genre");
  if (requestedGenre && movies.some(function (m) { return m.genre === requestedGenre; })) {
    selectedGenre = requestedGenre;
    document.querySelectorAll(".genre-btn").forEach(function (b) {
      b.classList.toggle("active", b.dataset.genre === requestedGenre);
    });
  }
  showMovies();
}
startBrowse();
