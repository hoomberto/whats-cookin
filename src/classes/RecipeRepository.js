import { recipeData } from '../data/recipes.js';
const importedRecipes = recipeData;
import Recipe from '../classes/Recipe.js';

class RecipeRepository {
  constructor(recipes) {
    this.recipes = recipes || [];
  }

  filterByTags(searchedTags) {
    return this.recipes.filter(recipe => recipe.tags.some(tag => searchedTags.includes(tag)));
  }

  filterByProperty(searchedTerm) {


    return this.recipes.filter(recipe => recipe.getIngredientNames().some(ingredient => searchedTerm.includes(ingredient)) || searchedTerm.includes(recipe.name.toLowerCase()) || recipe.name.toLowerCase().split(' ').some(word => searchedTerm.includes(word)) || recipe.getIngredientTerms().some(word => searchedTerm.includes(word)));
  }
}

export default RecipeRepository;
