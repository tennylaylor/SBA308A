function clearContent() {
  const content = document.getElementById("content");
  content.innerHTML = ""; // Clear previous content
}

function renderCharacters(characters) {
  const content = document.getElementById("content");
  clearContent();

  if (characters.length === 0) {
    content.innerHTML = "<p>No results found</p>";
    return;
  }

  characters.forEach((character) => {
    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6";

    card.innerHTML = `
          <div class="character-card">
              <div class="character-card-inner">
                  <div class="character-card-front">
                      <img src="${character.thumbnail.path}.${
      character.thumbnail.extension
    }" alt="${character.name}">
                      <div class="card-details">
                          <h2>${character.name}</h2>
                      </div>
                  </div>
                  <div class="character-card-back">
                      <h2>${character.name}</h2>
                      <p>${
                        character.description || "No description available."
                      }</p>
                  </div>
              </div>
          </div>
      `;
    content.appendChild(card);
  });
}

export { renderCharacters, clearContent };
