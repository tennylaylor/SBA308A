import * as md5 from "https://cdn.jsdelivr.net/npm/js-md5@0.7.3/src/md5.min.js";

// Install md5 with `npm install md5`

const API_BASE_URL = "http://gateway.marvel.com/v1/public";
const PUBLIC_KEY = "e7852d7a7f2a6424596a8f481e320e19";

// Function to construct API URL with hash
const getApiUrl = (endpoint, params = "") => {
  const ts = new Date().getTime(); // Generate timestamp
  const hash = md5.default(`${ts}${PUBLIC_KEY}`);
  // Generate hash using only the public key
  const url = `${API_BASE_URL}/${endpoint}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}${params}`;
  return url;
};

async function fetchMarvelData(endpoint, params = "") {
  try {
    const url = getApiUrl(endpoint, params); // Build the full URL
    const response = await fetch(url); // Send request
    const data = await response.json(); // Parse response as JSON

    if (data.code === 401 || data.code === 403) {
      throw new Error("Unauthorized: Check your API key or hash.");
    }

    if (data.data && data.data.results) {
      return data.data.results; // Return the results
    }

    return []; // Return an empty array if no data
  } catch (error) {
    console.error("Error fetching data from Marvel API:", error);
    return [];
  }
}

// Exporting fetchMarvelData to make it available to other modules
export { fetchMarvelData };
