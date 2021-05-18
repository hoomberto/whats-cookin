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

  // ingredientsNeeded() {
  //   let currentIng = this.getIngredients();
  //   let ingNames = [];
  //   currentIng.forEach(ing => {
  //     ingNames.push(ing.name)
  //   });
  //   return ingNames
  //   }

  // ingredientsCost() {
  //   let currentIng = this.getIngredients();
  //   let result = 0;
  //   currentIng.forEach(ing => {
  //     result += ing.estimatedCostInCents;
  //   });
  //   console.log(result)
  //   return result;
  // }

  ingredientsCost() {
    this.setIngredients();
    let final = this.ingredients.reduce((acc, currentVal) => {
        acc += currentVal.estimatedCostInCents * currentVal.quantity.amount;
        return acc
      }, 0)
    return `$${final/100}`
  }

  getInstructions() {
    return this.instructions;
  }
}
export default Recipe;
// module.exports = Recipe;
