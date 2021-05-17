import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';


describe('Ingredient', () => {
  let ingredient;
  beforeEach('Setup', () => {
    const newIngredient = {
      "id": 20081,
      "name": "wheat flour",
      "estimatedCostInCents": 142
    };

    ingredient = new Ingredient(newIngredient);
  });

  it('should be an ingredient', () => {
    expect(ingredient).to.be.an.instanceOf(Ingredient);
  });

  it('should have an id', () => {
    expect(ingredient.id).to.equal(20081);
  });
});
