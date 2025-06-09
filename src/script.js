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