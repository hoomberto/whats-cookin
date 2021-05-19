import { recipeData } from '../data/recipes.js';
const importedRecipes = recipeData;
import Recipe from '../classes/Recipe.js';

class RecipeRepository {
  constructor(recipe) {
    // this.newRecipe = recipe || undefined;
    this.recipes = recipe || importedRecipes.map(recipe => {
      return new Recipe(recipe);
    });
  }

  filterByTags() {

  }

  filterByProperty() {

  }
}

export default RecipeRepository;
