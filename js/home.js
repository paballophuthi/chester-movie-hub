
/* ==========================================================
   CHESTER MOVIE HUB
   home.js - Homepage movie sections and buttons
   ========================================================== */

// Homepage status message
const homeStatus = document.getElementById("homeStatus");


/* ==========================================================
   1. HOMEPAGE SEARCH
   ========================================================== */

const homeSearchForm = document.getElementById("homeSearchForm");

if (homeSearchForm) {
  homeSearchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const searchInput = document.getElementById("homeSearchInput");
    const query = searchInput ? searchInput.value.trim() : "";

    if (query) {
      window.location.href =
        "browse.html?q=" + encodeURIComponent(query);
    } else {
      window.location.href = "browse.html";
    }
  });
}


/* ==========================================================
   2. DISPLAY MOVIE CARDS IN A HOMEPAGE SECTION
   ========================================================== */

function fillRow(rowId, movies) {

  const row = document.getElementById(rowId);

  if (!row) {
    console.error("Homepage section not found:", rowId);
    return;
  }

  if (!movies || movies.length === 0) {
    row.innerHTML = "<p>No movies available yet.</p>";
    return;
  }

  if (typeof createMovieCard !== "function") {
    row.innerHTML = "<p>Movie card function is missing.</p>";
    console.error("createMovieCard() was not found.");
    return;
  }

  row.innerHTML = movies.map(function(movie) {
    return createMovieCard(movie, false);
  }).join("");
}


/* ==========================================================
   3. DISPLAY MOVIES BY GENRE
   ========================================================== */

function displayGenres(movies) {

  const genreSections = document.getElementById("genreSections");

  if (!genreSections) {
    console.error("Genre section was not found.");
    return;
  }

  const genreOrder = [
    "Action",
    "Comedy",
    "Horror",
    "Drama",
    "Adventure",
    "Science Fiction",
    "Animation"
  ];

  // Find every genre in the catalogue, including new ones
  const allGenres = [
    ...new Set(
      movies
        .map(function(movie) {
          return movie.genre;
        })
        .filter(Boolean)
    )
  ];

  // Show the preferred genres first, then any additional genres
  const extraGenres = allGenres.filter(function(genre) {
    return !genreOrder.some(function(item) {
      return item.toLowerCase() === genre.toLowerCase();
    });
  });

  const genresToDisplay = [
    ...genreOrder.filter(function(genre) {
      return allGenres.some(function(item) {
        return item.toLowerCase() === genre.toLowerCase();
      });
    }),
    ...extraGenres
  ];

  let genreHtml = "";

  genresToDisplay.forEach(function(genre) {

    const genreMovies = movies.filter(function(movie) {
      return movie.genre &&
        movie.genre.toLowerCase() === genre.toLowerCase();
    });

    if (genreMovies.length > 0) {

      const sectionId =
        "genre-" + genre.toLowerCase().replace(/\s+/g, "-");

      genreHtml += `
        <section class="mb-4" aria-labelledby="${sectionId}">
          <h3 class="section-title" id="${sectionId}">
            ${genre} Movies
          </h3>

          <div class="movie-row">
            ${genreMovies.map(function(movie) {
              return createMovieCard(movie, false);
            }).join("")}
          </div>
        </section>
      `;
    }
  });

  genreSections.innerHTML = genreHtml;
}


/* ==========================================================
   4. LOAD AND DISPLAY ALL HOMEPAGE MOVIES
   ========================================================== */

async function startHome() {

  try {

    if (homeStatus) {
      homeStatus.textContent = "Loading movies...";
    }

    // Load movies from data/movies.json or fallback data
    const result = await loadMovies();

    const movies = result.movies;

    if (!Array.isArray(movies) || movies.length === 0) {
      throw new Error("The movie catalogue is empty or invalid.");
    }

    // Make the catalogue available to other JavaScript files
    setAllMovies(movies);

    if (homeStatus) {
      homeStatus.textContent = result.usedFallback
        ? "Showing sample movies. Use Live Server to load movies.json."
        : "";
    }

    // Sort movies from newest to oldest
    const newest = movies.slice().sort(function(a, b) {
      return Number(b.year) - Number(a.year);
    });

    // TRENDING MOVIES
    fillRow("trendingRow", newest);

    // POPULAR MOVIES
    fillRow("popularRow", movies);

    // NEW RELEASES
    fillRow("newRow", newest);

    // RECOMMENDED MOVIES
    fillRow("recommendedRow", movies.slice().reverse());

    // EXPLORE BY GENRE
    displayGenres(movies);

  } catch (error) {

    console.error("Homepage loading error:", error);

    if (homeStatus) {
      homeStatus.textContent =
        "Sorry, movies could not be displayed. Check your movie files.";
    }
  }
}


/* ==========================================================
   5. MOVIE TRAILER BUTTONS
   ========================================================== */

function bindMovieButton(buttonId, movieId) {

  const button = document.getElementById(buttonId);

  if (!button) {
    return;
  }

  button.addEventListener("click", function() {

    const movieList =
      typeof ALL_MOVIES !== "undefined" && ALL_MOVIES.length
        ? ALL_MOVIES
        : [];

    const movie = findMovieById(movieList, movieId);

    if (movie && typeof openTrailer === "function") {
      openTrailer(movie);
    } else {
      console.error("Movie or trailer function not found:", movieId);
    }
  });
}

// Featured movie: Tears of Steel
bindMovieButton("heroTrailer", 3);

// Additional buttons, if they exist in your HTML
bindMovieButton("proudMaryTrailer", 13);
bindMovieButton("redNoticeTrailer", 14);


/* ==========================================================
   6. SURPRISE ME BUTTON
   ========================================================== */

const surpriseButton = document.getElementById("surpriseMovie");

if (surpriseButton) {

  surpriseButton.addEventListener("click", function() {

    if (typeof ALL_MOVIES === "undefined" || ALL_MOVIES.length === 0) {
      alert("Movies are still loading. Please try again.");
      return;
    }

    const randomIndex = Math.floor(
      Math.random() * ALL_MOVIES.length
    );

    const selectedMovie = ALL_MOVIES[randomIndex];

    window.location.href =
      "details.html?id=" + selectedMovie.id;
  });
}


/* ==========================================================
   7. START THE HOMEPAGE
   ========================================================== */

startHome();
