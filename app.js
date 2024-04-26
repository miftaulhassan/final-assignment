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

//function 

function displayMealCards(meals, showAll = false) {
  mealResults.innerHTML = '';
  visibleMeals = showAll ? meals : meals.slice(0, 5);

  visibleMeals.forEach(meal => {
    const mealCard = document.createElement('div');
    mealCard.className = 'col-md-6 col-lg-4';
    mealCard.innerHTML = `
      <div class="card meal-card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
        <div class="card-body">
          <h5 class="card-title">${meal.idMeal} - ${meal.strMeal}</h5>
          <div class="instructions-container">
            <p class="card-text">${meal.strInstructions}</p>
          </div>
        </div>
      </div>
    `;
    mealResults.appendChild(mealCard);
  });

  showAllButton.style.display = meals.length > 5 && !showAll ? 'block' : 'none';
}


// Event listener for search button
searchButton.addEventListener('click', async () => {
  const searchText = searchInput.value.trim();
  if (searchText) {
    const fetchedMeals = await fetchMeals(searchText);
    meals = fetchedMeals || [];
    displayMealCards(meals);
  }
});

// Event listener for "Show All" button
showAllButton.addEventListener('click', () => {
  displayMealCards(meals, true);
});


