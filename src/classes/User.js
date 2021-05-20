// import { recipeData } from '../data/recipes.js';
// const importedRecipes = recipeData;
import RecipeRepository from '../classes/RecipeRepository.js';

class User {
  constructor() {
    this.favoriteRecipes = new RecipeRepository();
    this.recipesToCook = new RecipeRepository();
  }
  //
  addToFavorites(recipe) {
    console.log(this.favoriteRecipes)
    this.favoriteRecipes.recipes.push(recipe)
  }
  removeFromFavorite(recipe) {
    let error = 'There are no favorite recipes!'
    if (recipe) {
      if (this.favoriteRecipes.recipes.length) {
        this.favoriteRecipes.recipes.splice(recipe, 1)
      }
    }
    return error
  }
  addToRecipesToCook(recipe){
    if (!this.recipesToCook.recipes.includes(recipe)) {
      this.recipesToCook.recipes.push(recipe)
    }
  }
  // filterFavoritesByTags(searchedTags) {
  //   return this.favoriteRecipes.recipes.filterByTags(searchedTags)
  // }
  // filterFavoritesByTerm(searchedTerm) {
  //   return this.favoriteRecipes.recipes.filterByProperty(searchedTerm)
  // }
}

export default User;

// Allow a user to favorite or unfavorite recipes
//     (add to / remove from the user’s favoriteRecipes)

// Decide to cook a recipe that week (add to my recipesToCook)
// Filter my favoriteRecipes by one or more tags.
// Filter my favoriteRecipes by its name or ingredients.
