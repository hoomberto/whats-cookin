import { recipeData } from '../data/recipes.js';
const importedRecipes = recipeData;
import Recipe from '../classes/Recipe.js';

class RecipeRepository {
  constructor(...recipe) {
    // this.newRecipe = recipe || undefined;
    // console.log(recipe);
    this.recipes = recipe;
    // this.recipes = recipe || importedRecipes.map(recipe => {
    //   return new Recipe(recipe);
    // });
  }
  // For every recipe in this.recipes
  // Check if recipe contains what is passed as an input
  // for filterByTags method
  filterByTags(tags) {
    this.recipes.filter(recipe => recipe.tags.include(tags));
  }

  filterByProperty() {

  }
}

export default RecipeRepository;
