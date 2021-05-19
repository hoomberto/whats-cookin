import { recipeData } from '../data/recipes.js';
const importedRecipes = recipeData;
import Recipe from '../classes/Recipe.js';

class RecipeRepository {
  constructor(recipes) {
    this.recipes = recipes;
  }

  filterByTags(searchedTags) {
    let test = this.recipes.filter(recipe => recipe.tags.some(tag => searchedTags.includes(tag)));
    return test;
  }

  filterByProperty() {

  }
}

export default RecipeRepository;
