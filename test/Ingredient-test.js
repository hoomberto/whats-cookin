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

  it('should have a name', () => {
    expect(ingredient.name).to.equal("wheat flour");
  });

  it('should have an estimated cost in cents', () => {
    expect(ingredient.estimatedCostInCents).to.equal(142);
  });
});
