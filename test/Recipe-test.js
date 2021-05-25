import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';

describe('Recipe', () => {
  let recipe, ingredient1, ingredient2, ingredient3;
  beforeEach('Setup', () => {

    const chocChip = {
      "id": 595736,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [
        {
          "id": 20081,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "id": 18372,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        },
      ],
      "instructions": [
        {
          "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
          "number": 1
        },
        {
          "instruction": "Add egg and vanilla and mix until combined.",
          "number": 2
        },
        {
          "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
          "number": 3
        },
      ],
      "name": "Loaded Chocolate Chip Pudding Cookie Cups",
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
    }

    ingredient1 = {
      "id": 20081,
      "name": "wheat flour",
      "estimatedCostInCents": 142
    };

    ingredient2 = {
        "id": 18372,
        "name": "bicarbonate of soda",
        "estimatedCostInCents": 582
    }

    ingredient3 = {
      "id": 1123,
      "name": "eggs",
      "estimatedCostInCents": 472
    }
    const ingArr = [ingredient1, ingredient2, ingredient3];
    recipe = new Recipe(chocChip, ingArr);
  });

  it('should have an id', () => {
    expect(recipe.id).to.equal(595736);
  });

  it('should have an image', () => {
    expect(recipe.image).to.equal("https://spoonacular.com/recipeImages/595736-556x370.jpg");
  });

  it('should have a list of ingredients', () => {
    expect(recipe.ingredients[0]).to.deep.equal({
      "id": 20081,
      "quantity": { "amount": 1.5, "unit": "c" }
    });
  });

  it('should have a list of instructions', () => {
    expect(recipe.instructions.length).to.equal(3);

    expect(recipe.instructions).to.deep.equal([
      {
        "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
        "number": 1
      },
      {
        "instruction": "Add egg and vanilla and mix until combined.",
        "number": 2
      },
      {
        "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
        "number": 3
      }
    ]);
  });

  it('should have a name', () => {
    expect(recipe.name).to.equal("Loaded Chocolate Chip Pudding Cookie Cups");
  });

  it('should have a list of tags', () => {
    expect(recipe.tags).to.deep.equal([
      "antipasti",
      "starter",
      "snack",
      "appetizer",
      "antipasto",
      "hor d'oeuvre"
    ]);
  });

  it('should determine the ingredients needed to make a dish', () => {
    const result = [
      "wheat flour",
      "bicarbonate of soda",
      "eggs"
    ];
    expect(recipe.getIngredientNames()).to.deep.equal(result);
  });

  it('should return total cost of the ingredients', () => {
    // Previously $9.76, however it was reduced to reflect a more realistic cost of ingredients
    // (lowered value of certain quantities by 200%)
    expect(recipe.ingredientsCost()).to.equal('$5.06');
  });

  it('should return its own instructions', () => {
    expect(recipe.getInstructions()).to.equal(
      `1. In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.<br> 2. Add egg and vanilla and mix until combined.<br> 3. Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.<br>`
    );
  });
});
