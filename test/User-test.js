// user test
import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import User from '../src/classes/User';


describe('User', () => {
  let user, recipe, chocChip;

  beforeEach('Setup', () => {
    user = new User();
    chocChip = {
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

    recipe = new Recipe(chocChip);
  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should be an instatnce of Recipe Repository', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('Should have favorite recipes', () => {
    expect(user.favoriteRecipes).to.be.an.instanceof(RecipeRepository);
  });

  it('Should have recipes to cook', () => {
    expect(user.recipesToCook).to.be.an.instanceof(RecipeRepository);
  });

  it('Should be able to add to a users favorite recipes', () => {
    user.addToFavorites(recipe);
    expect(user.favoriteRecipes.recipes[0]).to.be.an.instanceof(Recipe);
  });

  it('Should be able to remove a favorite recipe', () => {
    user.addToFavorites(recipe);
    expect(user.favoriteRecipes.recipes.length).to.equal(1);
    user.removeFromFavorite(recipe);
    expect(user.favoriteRecipes.recipes.length).to.equal(0);
  });

  it('Should get an error message if there are no favorite recipes', () => {
    expect(user.removeFromFavorite(recipe)).to.equal('There are no favorite recipes!');
  });

  it('Should be able to add a recipe to cook', () => {
    user.addToRecipesToCook(recipe);
    expect(user.recipesToCook.recipes[0]).to.deep.equal(recipe);
  });

  it('Should be able to filter favorite recipes by tags', () => {
    user.addToFavorites(recipe);
    let search = user.filterFavoritesByTags('snack');
    expect(search[0]).to.deep.equal(recipe);
  });

  it('Should be able to filter favorite recipes by a name or ingredient term', () => {
    expect(user.filterFavoritesByTerm('asdf')).to.deep.equal([]);
    user.addToFavorites(recipe);
    expect(user.filterFavoritesByTerm('asdf')).to.deep.equal([]);
    let search = user.filterFavoritesByTerm(['wheat flour']);
    expect(search[0]).to.deep.equal(recipe);
  });
});
