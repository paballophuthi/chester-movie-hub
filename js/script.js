/* ==========================================================
   script.js - shared code used on every page
   (movie cards, trailer modal, My List buttons, messages)
   ========================================================== */

const PLACEHOLDER = "images/posters/placeholder.svg";

// Small feedback message (toast) in the corner of the screen
function showMessage(text) {
  const old = document.querySelector(".cv-toast");
  if (old) { old.remove(); }
  const box = document.createElement("div");
  box.className = "cv-toast";
  box.setAttribute("role", "status");
  box.textContent = text;
  document.body.appendChild(box);
  setTimeout(function () { box.remove(); }, 2500);
}

// Build one movie card (returns an HTML string)
function createMovieCard(movie, showRemove) {
  const inList = isInList(movie.id);
  const listBtn = showRemove
    ? '<button class="btn btn-outline-cine list-btn" data-id="' + movie.id + '">Remove</button>'
    : '<button class="btn btn-outline-cine list-btn" data-id="' + movie.id + '">' + (inList ? "In My List ✓" : "+ My List") + '</button>';
  return '' +
    '<article class="movie-card">' +
      '<a href="details.html?id=' + movie.id + '">' +
        '<img src="' + movie.poster + '" alt="Poster of ' + movie.title + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\'">' +
      '</a>' +
      '<div class="card-body">' +
        '<h3>' + movie.title + '</h3>' +
        '<p class="movie-meta">' + movie.genre + ' • ' + movie.year + ' • ' + movie.duration + '</p>' +
        '<p class="movie-meta">' + movie.description + '</p>' +
        '<div class="movie-actions">' +
          '<a class="btn btn-cine" href="details.html?id=' + movie.id + '">Details</a>' +
          (movie.trailer ? '<button class="btn btn-outline-cine trailer-btn" data-id="' + movie.id + '">Trailer</button>' : '') +
          listBtn +
        '</div>' +
      '</div>' +
    '</article>';
}

// Turn a YouTube link into an embed link
function getEmbedUrl(url) {
  const match = url.match(/[?&]v=([\w-]{11})/);
  return match ? "https://www.youtube-nocookie.com/embed/" + match[1] + "?autoplay=1" : url;
}

// Trailer pop-up: a Bootstrap modal that we add to the page once
function ensureTrailerModal() {
  if (document.getElementById("trailerModal")) { return; }
  document.body.insertAdjacentHTML("beforeend",
    '<div class="modal fade" id="trailerModal" tabindex="-1" aria-labelledby="trailerTitle" aria-hidden="true">' +
      '<div class="modal-dialog modal-lg modal-dialog-centered"><div class="modal-content">' +
        '<div class="modal-header border-secondary"><h2 class="modal-title fs-4" id="trailerTitle">Trailer</h2>' +
        '<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button></div>' +
        '<div class="modal-body"><div class="ratio ratio-16x9"><video id="trailerVideo" controls playsinline style="display:none;width:100%;height:100%;background:#000"></video><iframe id="trailerFrame" title="Movie trailer" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>' +
        '<p class="mt-3 mb-0 small">If the player does not load, <a id="trailerLink" href="#" target="_blank" rel="noopener">open the video in a new tab</a>.</p></div>' +
      '</div></div></div>');
  // Stop the video when the modal closes
  document.getElementById("trailerModal").addEventListener("hidden.bs.modal", function () {
    document.getElementById("trailerFrame").src = "";
    const video = document.getElementById("trailerVideo");
    video.pause();
    video.removeAttribute("src");
    video.load();
  });
}

function openTrailer(movie) {
  ensureTrailerModal();
  document.getElementById("trailerTitle").textContent = movie.title + " - Trailer";
  const frame = document.getElementById("trailerFrame");
  const video = document.getElementById("trailerVideo");
  document.getElementById("trailerLink").href = movie.trailer || "#";
  if (/\.mp4($|\?)/i.test(movie.trailer || "")) {
    frame.style.display = "none";
    frame.src = "";
    video.style.display = "block";
    video.src = movie.trailer;
    video.load();
    video.play().catch(function () {});
  } else {
    video.pause();
    video.removeAttribute("src");
    video.load();
    video.style.display = "none";
    frame.style.display = "block";
    frame.src = getEmbedUrl(movie.trailer);
  }
  bootstrap.Modal.getOrCreateInstance(document.getElementById("trailerModal")).show();
}

// Cache of the loaded catalogue so click handlers can find a movie
let ALL_MOVIES = [];
function setAllMovies(list) { ALL_MOVIES = list; }

// EVENT 1: one click listener for all trailer and My List buttons (event delegation)
document.addEventListener("click", function (event) {
  const trailerBtn = event.target.closest(".trailer-btn");
  if (trailerBtn) {
    const movie = findMovieById(ALL_MOVIES, Number(trailerBtn.dataset.id));
    if (movie) { openTrailer(movie); }
    return;
  }
  const listBtn = event.target.closest(".list-btn");
  if (listBtn) {
    const id = Number(listBtn.dataset.id);
    const movie = findMovieById(ALL_MOVIES, id);
    const title = movie ? movie.title : "Movie";
    if (isInList(id)) {                         // already saved -> remove it
      removeFromList(id);
      showMessage(title + " removed from My List.");
    } else {                                    // not saved -> add it
      addToList(id);
      showMessage(title + " added to My List.");
    }
    document.dispatchEvent(new Event("listchanged"));
  }
});

// Refresh the text of every "+ My List" button after a change
document.addEventListener("listchanged", function () {
  document.querySelectorAll(".list-btn").forEach(function (btn) {
    if (btn.textContent.trim() !== "Remove" && !btn.dataset.keep) {
      btn.textContent = isInList(Number(btn.dataset.id)) ? "In My List ✓" : "+ My List";
    }
  });
});

// Runs on every page when it loads
document.addEventListener("DOMContentLoaded", function () {
  // Optional display theme; preference is remembered in this browser.
  const savedTheme = localStorage.getItem("CHESTER MOVIE HUB-theme");
  if (savedTheme === "light") document.body.classList.add("light-theme");
  const themeButton = document.createElement("button");
  themeButton.type = "button";
  themeButton.className = "theme-toggle btn btn-outline-cine btn-sm ms-lg-2";
  themeButton.textContent = document.body.classList.contains("light-theme") ? "☾ Dark" : "☀ Light";
  themeButton.setAttribute("aria-label", "Toggle colour theme");
  const nav = document.querySelector("#mainNav .navbar-collapse");
  if (nav) nav.appendChild(themeButton);
  themeButton.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");
    const light = document.body.classList.contains("light-theme");
    localStorage.setItem("CHESTER MOVIE HUB-theme", light ? "light" : "dark");
    themeButton.textContent = light ? "☾ Dark" : "☀ Light";
  });

  updateListBadge();
  const year = document.getElementById("year");
  if (year) { year.textContent = new Date().getFullYear(); }
});
