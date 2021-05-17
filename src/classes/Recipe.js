import ingredients from './ingredients';
const ingData = ingredients.ingredientsData;
import Ingredient

class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }

  ingredientsNeeded() {
        const newIngredients = ingData.map(item => item)
  // use map to create a new array with ingredient objects
  // use map to return a new ingredient object
  // go through each obj in this.ingredients

  // filter ingredients list to
  // return the ingredient name that matches the id in this.ingredients
}

}
export default Recipe;
// module.exports = Recipe;
