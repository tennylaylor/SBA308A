import { fetchMarvelData } from "./api.js";
import { renderCharacters } from "./ui.js";

// Function to handle character search
async function searchCharacters(query) {
  const characters = await fetchMarvelData(
    "characters",
    `&nameStartsWith=${query}`
  );
  renderCharacters(characters);
}

// Event listeners for search input
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("search").value.trim();
  if (query) {
    searchCharacters(query);
  } else {
    alert("Please enter a character name to search.");
  }
});
