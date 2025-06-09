//Data Structures
let breeds = [];              // All breeds from API
let filteredBreeds = [];      // Search-filtered breeds
let currentCatImage = null;   // Currently displayed image
let favorites = [];           // Array of FavoriteCat objects
let categories = [];          // Optional categories (if using)

//Objects
class CatImage {
  constructor(id, url, breed, width, height) {
    this.id = id;
    this.url = url;
    this.breed = breed;
    this.width = width;
    this.height = height;
  }
}
class Breed {
  constructor(id, name, temperament, origin) {
    this.id = id;
    this.name = name;
    this.temperament = temperament;
    this.origin = origin;
  }
}
class FavoriteCat {
  constructor(id, url, addedAt) {
    this.id = id;
    this.url = url;
    this.addedAt = addedAt;
  }
}
class Category {
  constructor(id, name, description = "No description provided.") {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
class UserSettings {
  constructor(theme, imageSize, autoRefresh) {
    this.theme = theme;
    this.imageSize = imageSize;
    this.autoRefresh = autoRefresh;
  }
}

//DOM Elements
const breedSelect = document.getElementById("breedSelect");
const newCatBtn = document.getElementById("newCatBtn");
const catImage = document.getElementById("catImage");
const catInfo = document.getElementById("catInfo");
const favBtn = document.getElementById("favBtn");
const favoritesContainer = document.getElementById("favorites");
const breedSearch = document.getElementById("breedSearch");

loadFavoritesFromLocalStorage(); //Initialization
fetchBreeds().then(() => fetchCatImage());

//Fetch Cat Images from the API
async function fetchBreeds() {
  const res = await fetch("https://api.thecatapi.com/v1/breeds");
  const data = await res.json();
  breeds = data.map(
    (b) => new Breed(b.id, b.name, b.temperament, b.origin || "Unknown")
  );
  filteredBreeds = breeds;
  populateBreedDropdown(filteredBreeds);
} //async for better response time
async function fetchCatImage(breedId = "") {
  let url = "https://api.thecatapi.com/v1/images/search";
  if (breedId) url += `?breed_ids=${breedId}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.length) {
    catImage.src = "";
    catInfo.textContent = "No images found.";
    currentCatImage = null;
    return;
  }
  const cat = data[0];
  const breed = cat.breeds?.[0]
    ? new Breed(cat.breeds[0].id, cat.breeds[0].name, cat.breeds[0].temperament, cat.breeds[0].origin || "Unknown")
    : null;
  currentCatImage = new CatImage(cat.id, cat.url, breed, cat.width, cat.height);
  renderCatImage();
}
