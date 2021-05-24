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
    } else {
      console.log('already there');
    }
  }

  removeFromFavorite(inputRecipe) {
    let error = 'There are no favorite recipes!';
    console.log(inputRecipe)
    // let found = this.favoriteRecipes.recipes.find(recipe => recipe.id === inputRecipe.id)
    if (inputRecipe) {
      let updated = this.favoriteRecipes.recipes.filter(recipe => recipe.id != inputRecipe.id)
      this.favoriteRecipes.recipes = updated
      // this.favoriteRecipes.recipes.forEach(recipe => {
      //   if (recipe.id === inputRecipe.id) {
      //     this.favoriteRecipes.recipes.splice(recipe, 1)
      //     console.log(`Should have removed ${recipe.name}`)
      //   }
      // })
    }
    return error;
  }

  addToRecipesToCook(recipe){
    if (!this.recipesToCook.recipes.includes(recipe)) {
      this.recipesToCook.recipes.push(recipe);
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

// Allow a user to favorite or unfavorite recipes
//     (add to / remove from the user’s favoriteRecipes)

// Decide to cook a recipe that week (add to my recipesToCook)
// Filter my favoriteRecipes by one or more tags.
// Filter my favoriteRecipes by its name or ingredients.
