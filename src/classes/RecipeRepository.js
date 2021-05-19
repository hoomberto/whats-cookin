import { recipeData } from '../data/recipes.js';
const importedRecipes = recipeData;
import Recipe from '../classes/Recipe.js';

class RecipeRepository {
  constructor(recipe) {
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
    // const keys = Object.values(this.recipes);
    // if input is single
    // let test = this.recipes.filter(recipe => recipe.tags.includes(tags));
    // if input is an array
     // console.log('this.recipe tags', this.recipes[0].tags);
    let test = this.recipes.filter(recipe => recipe.tags.some(tag => tags.includes(tag)));
    // return arr1.some(item => arr2.includes(item))
    // let test = this.recipes.filter(recipe => Object.keys());
    console.log(test)
    return test
  }

  filterByProperty() {

  }
}

export default RecipeRepository;
