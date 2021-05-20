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



const expandOptions = () => {
  options.classList.toggle('hidden')
  console.log("WORKING")
}



// const setTags

// onclick
const setSiteWideRepository = () => {
  return new RecipeRepository(importedRecipes.map(recipe => {
    return new Recipe(recipe)
  }))
}
console.log('Hello world');

// Event Listeners GO HERE

getByTag.addEventListener("click", expandOptions);
