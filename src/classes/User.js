// import { recipeData } from '../data/recipes.js';
// const importedRecipes = recipeData;
import RecipeRepository from '../classes/RecipeRepository.js';

class User {
  constructor(data) {
    this.favoriteRecipes = new RecipeRepository();
    this.recipesToCook = new RecipeRepository();
    this.data = data;
  }

  addToFavorites(inputRecipe) {
    if (!this.favoriteRecipes.recipes.find(recipe => recipe.id === inputRecipe.id)) {
      this.favoriteRecipes.recipes.push(inputRecipe);
    }
  }

  removeFromFavorite(inputRecipe) {
    let error = 'There are no favorite recipes!';
    if (inputRecipe) {
      let updated = this.favoriteRecipes.recipes.filter(recipe => recipe.id != inputRecipe.id);
      this.favoriteRecipes.recipes = updated;
    }
    return error;
  }

  addToRecipesToCook(inputRecipe){
    if (!this.recipesToCook.recipes.find(recipe => recipe.id === inputRecipe.id)) {
      this.recipesToCook.recipes.push(inputRecipe);
    }
  }

  filterFavoritesByTags(searchedTags) {
    return this.favoriteRecipes.filterByTags(searchedTags);
  }

  filterFavoritesByTerm(searchedTerm) {
     return this.favoriteRecipes.filterByProperty(searchedTerm);
  }
}

export default User;
