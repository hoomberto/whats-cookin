import './styles.css';
import apiCalls from './apiCalls';
import RecipeRepository from '../classes/RecipeRepository';
import User from '../src/classes/User';
import Ingredient from '../src/classes/Ingredient';
import Recipe from '../src/classes/Recipe';
import { recipeData } from '../data/recipes';
const importedRecipes = recipeData;



// onclick
const setSiteWideRepository = () => {
  return new RecipeRepository(importedRecipes.map(recipe => {
    return new Recipe(recipe)
  }))
}
console.log('Hello world');
