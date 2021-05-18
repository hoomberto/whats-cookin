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

  ingredientsNeeded() {
      let ingredientNames = [];
      const newIngredients = ingData.map(item => {
        return new Ingredient(item)
      });
      this.ingredients.forEach(ingredient => {
        let foundIngredient = (newIngredients.find(ing => ing.id === ingredient.id))
        ingredientNames.push(foundIngredient.name);
      });
      return ingredientNames;
      }
    }
export default Recipe;
// module.exports = Recipe;
