function renderCharacters(characters) {
  clearContent();
  if (characters.length === 0) {
    document.getElementById("content").innerHTML = "<p>No results found</p>";
    return;
  }
  characters.forEach((character) => {
    const thumbnail = character.thumbnail
      ? `${character.thumbnail.path}.${character.thumbnail.extension}`
      : "https://via.placeholder.com/300"; // Placeholder image
    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6";
    card.innerHTML = `
      <div class="character-card">
        <img src="${thumbnail}" alt="${character.name}">
        <div class="card-details">
          <h2>${character.name}</h2>
          <p>${character.description || "No description available."}</p>
        </div>
      </div>
    `;
    document.getElementById("content").appendChild(card);
  });
}

export { renderCharacters, clearContent };
