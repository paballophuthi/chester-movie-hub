/* my-list.js - shows the movies saved in localStorage */
const listGrid = document.getElementById("listGrid");
const emptyMsg = document.getElementById("emptyMsg");
let catalogue = [];

function showMyList() {
  const ids = getList();
  const saved = [];
  for (let i = 0; i < ids.length; i++) {            // loop over the saved ids
    const movie = findMovieById(catalogue, ids[i]);
    if (movie) { saved.push(movie); }
  }
  emptyMsg.classList.toggle("d-none", saved.length > 0);   // message when empty
  document.getElementById("clearBtn").classList.toggle("d-none", saved.length === 0);
  listGrid.innerHTML = saved.map(function (m) { return createMovieCard(m, true); }).join("");
}

document.addEventListener("listchanged", showMyList);

// EVENT: clear the whole list
document.getElementById("clearBtn").addEventListener("click", function () {
  if (confirm("Remove every movie from My List?")) {
    getList().forEach(removeFromList);
    showMessage("My List cleared.");
    showMyList();
  }
});

async function startMyList() {
  const result = await loadMovies();
  catalogue = result.movies;
  setAllMovies(catalogue);
  showMyList();
}
startMyList();
