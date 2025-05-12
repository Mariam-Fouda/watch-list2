document.addEventListener("DOMContentLoaded", function () {
  const savedItems = JSON.parse(localStorage.getItem("watchlist")) || [];
  savedItems.forEach(addMovieToDOM);
});
document.getElementById("addToWatchlist").addEventListener("click", function () {
  const input = document.getElementById("movieInput");
  const value = input.value.trim();
  if (value !== "") {
    addMovieToDOM(value);
    saveToLocalStorage(value);
    input.value = "";
  }
});
function addMovieToDOM(value) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = value;
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "×";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", function () {
    li.remove();
    removeFromLocalStorage(value);
  });
  li.appendChild(span);
  li.appendChild(deleteBtn);
  document.getElementById("watchlistItems").appendChild(li);
}
function saveToLocalStorage(value) {
  const items = JSON.parse(localStorage.getItem("watchlist")) || [];
  if (!items.includes(value)) {
    items.push(value);
    localStorage.setItem("watchlist", JSON.stringify(items));
  }
}
function removeFromLocalStorage(value) {
  let items = JSON.parse(localStorage.getItem("watchlist")) || [];
  items = items.filter(item => item !== value);
  localStorage.setItem("watchlist", JSON.stringify(items));
}