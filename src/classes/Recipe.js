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
    let ingredientNames = this.ingredients.map(ingredient => {
      return ingredient.name;
    });
    // let formatted = ingredientNames.map((word) => {
    //   return word[0].toUpperCase() + word.substring(1);
    // });

    // [0].toUpperCase() + ingredient.name.substring(1)
    return ingredientNames
    // return ingredientNames.join(', ')
  }

  getIngredientTerms() {
    let currentIngredients = this.getIngredientNames();
    let ingredientsBroken = [];
    let spaces = new RegExp(" ")
    currentIngredients.forEach(ingredient => {
      if (!spaces.test(ingredient) && !ingredientsBroken.includes(ingredient)) {
        ingredientsBroken.push(ingredient)
      }
      else {
        let split = ingredient.split(' ');
        split.forEach(word => {
          if (!ingredientsBroken.includes(word)) {
            ingredientsBroken.push(word.toLowerCase())
          }
        })
      }
      })
    return ingredientsBroken;
    }

  ingredientsCost() {
    this.setIngredients();
    let final = this.ingredients.reduce((acc, currentVal) => {
      let units = ['tbsp', 'lbs', 'g', 'tablespoons', 'ounce', 'oz', 'ounces', 'slices', 'cups', 'teaspoons', 'handfuls', 'servings', 'strips', 't', 'T', 'Tablespoons', 'Tablespoon', 'large', '8-inch']
      if (units.includes(currentVal.quantity.unit)) {
        acc += (currentVal.estimatedCostInCents * (currentVal.quantity.amount))/200;
      }
      else {
        acc += currentVal.estimatedCostInCents * currentVal.quantity.amount;
      }

      return acc
      }, 0)
    return `$${(final/100).toFixed(2)}`
  }

  getInstructions() {
    let result = this.instructions.map(instruction => {
      return `${instruction.number}. ${instruction.instruction}<br>`
    })
    return result.join(' ')
  }
}
export default Recipe;
// module.exports = Recipe;
