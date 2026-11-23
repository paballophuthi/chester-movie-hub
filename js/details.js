/* details.js - shows ONE movie chosen with the URL (details.html?id=3) */
const box = document.getElementById("detailsBox");

function renderDetails(movie) {
  document.title = movie.title + " | CHESTER MOVIE HUB";
  const inList = isInList(movie.id);
  box.innerHTML =
    '<div class="row g-4 align-items-start">' +
      '<div class="col-12 col-md-4"><img class="details-poster w-100" src="' + movie.poster + '" alt="Poster of ' + movie.title + '" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\'"></div>' +
      '<div class="col-12 col-md-8">' +
        '<h1 class="display-4">' + movie.title + '</h1>' +
        '<p><span class="badge badge-genre me-2">' + movie.genre + '</span>' + movie.year + ' • ' + movie.duration + '</p>' +
        '<p class="fs-5">' + movie.fullDescription + '</p>' +
        '<p class="small">Source: ' + movie.source + '</p>' +
        (movie.trailer ? '<button class="btn btn-cine btn-lg me-2 mb-2 trailer-btn" data-id="' + movie.id + '">▶ Watch Trailer</button>' : '<p class="text-secondary">Trailer not available for this title yet.</p>') +
        '<button class="btn btn-outline-cine btn-lg mb-2 list-btn" data-keep="1" data-id="' + movie.id + '" id="detailsListBtn">' + (inList ? "Remove from My List" : "Add to My List") + '</button>' +
      '</div>' +
    '</div>';
}

// Keep the button text correct after it is clicked
document.addEventListener("listchanged", function () {
  const btn = document.getElementById("detailsListBtn");
  if (btn) { btn.textContent = isInList(Number(btn.dataset.id)) ? "Remove from My List" : "Add to My List"; }
});

async function startDetails() {
  box.innerHTML = "<p>Loading movie...</p>";
  const result = await loadMovies();
  setAllMovies(result.movies);
  // Read the id from the URL
  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const movie = findMovieById(result.movies, id);
  if (movie) {
    renderDetails(movie);
  } else {
    box.innerHTML = '<div class="text-center py-5"><h1>Movie not found</h1><p>Choose a movie from the catalogue.</p><a class="btn btn-cine" href="browse.html">Browse movies</a></div>';
  }
}
startDetails();
