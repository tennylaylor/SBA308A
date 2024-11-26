import md5 from "js-md5"; // Install md5 with `npm install md5`
import dotenv from "dotenv";
dotenv.config();

const API_BASE_URL = "http://gateway.marvel.com/v1/public";
const PUBLIC_KEY = "e7852d7a7f2a6424596a8f481e320e19";
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Access the private key from the .env file

// Function to construct API URL with hash
const getApiUrl = (endpoint, params = "") => {
  const ts = new Date().getTime(); // Generate timestamp
  const hash = md5(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`); // Generate hash
  const url = `${API_BASE_URL}/${endpoint}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}${params}`;
  return url;
};

async function fetchMarvelData(endpoint, params = "") {
  try {
    const url = getApiUrl(endpoint, params); // Build the full URL
    const response = await fetch(url); // Send request
    const data = await response.json(); // Parse response as JSON

    if (data.code === 401 || data.code === 403) {
      throw new Error(
        "Unauthorized: Check your API key, hash, or private key."
      );
    }

    if (data.data && data.data.results) {
      return data.data.results;
    }

    return []; // Return an empty array if no data
  } catch (error) {
    console.error("Error fetching data from Marvel API:", error);
    return [];
  }
}

export { fetchMarvelData };
