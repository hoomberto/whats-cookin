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
let checkBoxes;
const tagBtn = document.getElementById('tagSearch');

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
  let query = siteWideSearchInput.value.toLowerCase().split(' ');
  console.log(query)
  let recipeRepo = setSiteWideRepository();
  console.log(recipeRepo.filterByProperty(query))
}

const searchByTags = () => {
  let allRecipes = setSiteWideRepository();
  let query = [];
  checkBoxes.forEach(box => {
    if (box.checked) {
      query.push(box.value)
    }
  })
  console.log(allRecipes.filterByTags(query));

}



console.log('Hello world');

// Event Listeners GO HERE

getByTag.addEventListener("click", expandOptions);
getNameOrIngredient.addEventListener("click", searchByName)
tagBtn.addEventListener("click", searchByTags)
