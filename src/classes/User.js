// import { recipeData } from '../data/recipes.js';
// const importedRecipes = recipeData;
import RecipeRepository from '../classes/RecipeRepository.js';

class User {
  constructor() {
    this.favoriteRecipes = new RecipeRepository();
    this.recipesToCook = new RecipeRepository();
  }
  //
  // addToFavorites(recipe) {
  //   this.favoriteRecipes.push(recipe)
  // }
  // removeFromFavorite(recipe) {
  //   this.favoriteRecipes.splice(recipe, 1);
  // }
  // addToRecipesToCook(recipe){
  //   this.recipesToCook.push(recipe)
  // }
  // filterFavoritesByTags(searchedTags) {
  //   return this.favoriteRecipes.filterByTags(searchedTags)
  // }
  // filterFavoritesByTerm(searchedTerm) {
  //   return this.favoriteRecipes.filterByProperty(searchedTerm)
  // }
}

export default User;

// Allow a user to favorite or unfavorite recipes
//     (add to / remove from the user’s favoriteRecipes)

// Decide to cook a recipe that week (add to my recipesToCook)
// Filter my favoriteRecipes by one or more tags.
// Filter my favoriteRecipes by its name or ingredients.
