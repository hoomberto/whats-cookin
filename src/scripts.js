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

// getByTag.onClick = expandOptions();

const setSiteWideRepository = () => {
  return new RecipeRepository(importedRecipes.map(recipe => {
    return new Recipe(recipe)
  }))
}

const expandOptions = () => {
  options.classList.toggle('hidden')
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
    `<input type="check-box" id="checkBox" name="check-box" value="">
<label for="vehicle1">${tag}</label><br>`
  });
};


    // return this.recipes.filter(recipe => recipe.tags.some(tag => searchedTags.includes(tag)));
// const setTags

// onclick

console.log('Hello world');

// Event Listeners GO HERE

getByTag.addEventListener("click", expandOptions);
