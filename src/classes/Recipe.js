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

  setIngredients() {
    const newIngredients = ingData.map(item => {
      return new Ingredient(item)
    });
    this.ingredients.forEach(ingredient => {
      let foundIngredient = (newIngredients.find(ing => ing.id === ingredient.id));
      ingredient.name = foundIngredient.name;
      ingredient.estimatedCostInCents = foundIngredient.estimatedCostInCents;
    });
  }

  getIngredientNames() {
    this.setIngredients();
    return this.ingredients.map(ingredient => {
      return ingredient.name;
    });
  }

  ingredientsCost() {
    this.setIngredients();
    let final = this.ingredients.reduce((acc, currentVal) => {
        acc += currentVal.estimatedCostInCents * currentVal.quantity.amount;
        return acc
      }, 0)
    return `$${final/100}`
  }

  getInstructions() {
    let result = this.instructions.map(instruction => {
      return `${instruction.number}, ${instruction.instruction}`
    })
    return result.join('')
  }
}
export default Recipe;
// module.exports = Recipe;
