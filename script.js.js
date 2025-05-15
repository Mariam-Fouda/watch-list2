document.addEventListener("DOMContentLoaded", function () {
  const user = "user1"; 
  const watchlistKey = `${user}_watchlist`;
  const savedItems = JSON.parse(localStorage.getItem(watchlistKey)) || [];
  savedItems.forEach(movie => addMovieCardToDOM(movie));
});
document.getElementById("addToWatchlist").addEventListener("click", function () {
  const input = document.getElementById("movieInput");
  const title = input.value.trim().toLowerCase();
  if (!title) return;
  const movieDatabase = JSON.parse(localStorage.getItem("movieDatabase")) || [];
  const foundMovie = movieDatabase.find(movie => movie.title.toLowerCase() === title);
  if (!foundMovie) {
    alert("Movie not found in the database.");
    return;
  }
  const user = "user1";
  const watchlistKey = `${user}_watchlist`;
  const currentWatchlist = JSON.parse(localStorage.getItem(watchlistKey)) || [];
  if (currentWatchlist.some(movie => movie.title.toLowerCase() === title)) {
    alert("Movie already in watchlist.");
    return;
  }
  currentWatchlist.push(foundMovie);
  localStorage.setItem(watchlistKey, JSON.stringify(currentWatchlist));
  addMovieCardToDOM(foundMovie);
  input.value = "";
});
function addMovieCardToDOM(movie) {
  const container = document.getElementById("watchlistItems");
  const card = document.createElement('div');
  card.classList.add("movie-card");

  card.innerHTML = `
    <div class="image-container">
      <img src="${movie.image}" alt="${movie.title} image">
    </div>
    <div class="movie-details">
      <h3>${movie.title}</h3>
    </div>
    <button class="delete-btn">✖</button>
  `;
  card.querySelector(".delete-btn").addEventListener("click", function () {
    card.remove();
    const user = "user1";
    const watchlistKey = `${user}_watchlist`;
    let currentWatchlist = JSON.parse(localStorage.getItem(watchlistKey)) || [];

    currentWatchlist = currentWatchlist.filter(m => m.title !== movie.title);
    localStorage.setItem(watchlistKey, JSON.stringify(currentWatchlist));
  });
  container.appendChild(card);
}
