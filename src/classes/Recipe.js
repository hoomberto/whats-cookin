import { ingredientsData } from '../data/ingredients';
const ingData = ingredientsData;
import Ingredient from '../classes/Ingredient.js';
// console.log(ingData);

class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }

  getIngredients() {
    let currentIngredients = [];
    const newIngredients = ingData.map(item => {
      return new Ingredient(item)
    });
    this.ingredients.forEach(ingredient => {
      let foundIngredient = (newIngredients.find(ing => ing.id === ingredient.id))
      currentIngredients.push(foundIngredient);
    });
    return currentIngredients;
  }

  ingredientsNeeded() {
    let currentIng = this.getIngredients();
    let ingNames = [];
    currentIng.forEach(ing => {
      ingNames.push(ing.name)
    });
    return ingNames
    }

  ingredientsCost() {
    let currentIng = this.getIngredients();
    let result = 0;
    currentIng.forEach(ing => {
      result += ing.estimatedCostInCents;
    });
    console.log(result)
    return result;
  }
}
export default Recipe;
// module.exports = Recipe;
