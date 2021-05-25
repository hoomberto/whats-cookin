import Ingredient from '../classes/Ingredient.js';

class Recipe {
  constructor(recipe, data) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
    this.data = data;
  }

  setIngredients() {
    const newIngredients = this.data.map(item => {
      return new Ingredient(item);
    });
    this.ingredients.forEach(ingredient => {
      let foundIngredient = (this.data.find(ing => ing.id === ingredient.id));
      ingredient.name = foundIngredient.name;
      ingredient.estimatedCostInCents = foundIngredient.estimatedCostInCents;
    })
  }

  getIngredientNames() {
    this.setIngredients();
    let ingredientNames = this.ingredients.map(ingredient => {
      if (ingredient.name) {
        return ingredient.name;
      }
    });
    return ingredientNames;
  }

  getIngredientTerms() {
    let currentIngredients = this.getIngredientNames();
    let ingredientsBroken = [];
    let spaces = new RegExp(" ")
    currentIngredients.forEach(ingredient => {
      if (!spaces.test(ingredient) && !ingredientsBroken.includes(ingredient)) {
        ingredientsBroken.push(ingredient);
      } else {
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
    this.setIngredients()
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
      return `${instruction.number}. ${instruction.instruction}<br>`;
    })
    return result.join(' ');
  }
}

export default Recipe;
