import { fetchMarvelData } from "./api.mjs";
import { renderCharacters, clearContent } from "./ui.mjs";

// Function to handle character search
async function searchCharacters(query) {
  console.log(`Searching for: ${query}`); // Debugging
  clearContent();
  const characters = await fetchMarvelData(
    "characters",
    `&nameStartsWith=${query}`
  );
  console.log("Characters found:", characters); // Debugging
  if (characters.length === 0) {
    console.error("No characters found. Check query and API response.");
  }
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
