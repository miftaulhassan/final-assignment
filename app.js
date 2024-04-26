const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const mealResults = document.getElementById('mealResults');
const showAllButton = document.getElementById('showAllButton');


let meals = [];
let visibleMeals = [];


async function fetchMeals(searchText) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`);
  const data = await response.json();
  return data.meals;
}
