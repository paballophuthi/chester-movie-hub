/* ==========================================================
   watchlist.js - My List stored in localStorage
   We only save movie IDs (numbers), e.g. [1, 4, 7]
   ========================================================== */
const STORAGE_KEY = "CHESTER MOVIE HUBMyList";

// Read the saved list (returns an array of ids)
function getList() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];                                 // corrupted data or storage blocked
  }
}

function saveList(list) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
}

function isInList(id) {
  return getList().includes(id);
}

// Add a movie. Returns false if it was already there (no duplicates).
function addToList(id) {
  const list = getList();
  if (list.includes(id)) { return false; }
  list.push(id);
  saveList(list);
  updateListBadge();
  return true;
}

function removeFromList(id) {
  const list = getList().filter(function (savedId) { return savedId !== id; });
  saveList(list);
  updateListBadge();
}

// Show how many movies are saved next to the "My List" link
function updateListBadge() {
  const badge = document.getElementById("listCount");
  if (badge) { badge.textContent = getList().length; }
}
