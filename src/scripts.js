import './styles.css';
// import apiCalls from './apiCalls';
import RecipeRepository from './classes/RecipeRepository.js';
import User from './classes/User.js';
import Ingredient from './classes/Ingredient.js';
import Recipe from './classes/Recipe.js';
import { recipeData } from './data/recipes.js';
const importedRecipes = recipeData;

const getByTag = document.getElementById('getByTag');
const options = document.getElementById('options')
const optionsContainer = document.getElementById('optionsContainer');
const siteWideSearchInput = document.getElementById('siteWideSearch');
const getNameOrIngredient = document.getElementById('getNameOrIngredient');
const tagBtn = document.getElementById('tagSearch');
const cardArea = document.getElementById('cardArea');

let checkBoxes;

const setSiteWideRepository = () => {
  return new RecipeRepository(importedRecipes.map(recipe => {
    return new Recipe(recipe)
  }))
}

const expandOptions = () => {
  optionsContainer.classList.toggle('hidden')
  console.log("WORKING")
  loadOptions();
}

const loadOptions = () => {
  options.innerHTML = "";
  let allRecipes = setSiteWideRepository();
  let allUniqueTags = [];
  allRecipes.recipes.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (!allUniqueTags.includes(tag)) {
        allUniqueTags.push(tag)
      }
    });

  });
  allUniqueTags.forEach(tag => {
    options.innerHTML +=
    `<input type="checkbox" name="check" value="${tag}">
<label>${tag}</label><br>`
  });
  checkBoxes = document.querySelectorAll('input[name="check"]');
};

const searchByName = () => {
  cardArea.innerHTML = "";
  let query = siteWideSearchInput.value.toLowerCase().split(' ');
  let recipeRepo = setSiteWideRepository();
  let search = recipeRepo.filterByProperty(query);
  search.forEach(recipe => {
    cardArea.innerHTML += `
    <div class="recipe">
      <h3>${recipe.name}</h3>
      <img src="${recipe.image}">
    </div>
    `;
  })
}

const searchByTags = () => {
  let allRecipes = setSiteWideRepository();
  let query = [];
  checkBoxes.forEach(box => {
    if (box.checked) {
      query.push(box.value)
    }
  });
}

const renderRecipes = () => {
  cardArea.innerHTML = ""
  let allRecipes = setSiteWideRepository();
  allRecipes.recipes.forEach(recipe => {
    cardArea.innerHTML += `
    <div class="recipe">
      <h3>${recipe.name}</h3>
      <img src="${recipe.image}">
    </div>
    `;
  });
}

console.log('Hello world');

// Event Listeners GO HERE

getByTag.addEventListener("click", expandOptions);
getNameOrIngredient.addEventListener("click", searchByName)
tagBtn.addEventListener("click", searchByTags)
window.addEventListener('load', renderRecipes);
