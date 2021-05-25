import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';

describe('Recipe RecipeRepository', () => {
  let recipeRepository, recipes, recipe1, recipe2, newRecipe1, newRecipe2, ingredient1, ingredient2, ingredient3, ingredient4, ingredient5;
  // , recipe3;

  beforeEach('Setup', () => {
    recipe1 =
      {
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
          }
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
          {
            "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
            "number": 4
          },
          {
            "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
            "number": 5
          },
          {
            "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
            "number": 6
          }
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
      //
    recipe2 =  {
      "id": 678353,
      "image": "https://spoonacular.com/recipeImages/678353-556x370.jpg",
      "ingredients": [
        {
          "id": 1009016,
          "quantity": {
            "amount": 1.5,
            "unit": "cups"
          }
        },
        {
          "id": 9003,
          "quantity": {
            "amount": 2,
            "unit": ""
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!",
          "number": 1
        }
      ],
      "name": "Maple Dijon Apple Cider Grilled Pork Chops",
      "tags": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ]
    }

    // recipe3 =  {
    //     "id": 412309,
    //     "image": "https://spoonacular.com/recipeImages/412309-556x370.jpeg",
    //     "ingredients": [
    //       {
    //         "id": 1002030,
    //         "quantity": {
    //           "amount": 4,
    //           "unit": "teaspoons"
    //         }
    //       },
    //       {
    //         "id": 19334,
    //         "quantity": {
    //           "amount": 8,
    //           "unit": "tablespoons"
    //         }
    //       },
    //       {
    //         "id": 1001,
    //         "quantity": {
    //           "amount": 2,
    //           "unit": "cups"
    //         }
    //       },
    //       {
    //         "id": 4582,
    //         "quantity": {
    //           "amount": 4,
    //           "unit": "servings"
    //         }
    //       },
    //       {
    //         "id": 2031,
    //         "quantity": {
    //           "amount": 4,
    //           "unit": "teaspoons"
    //         }
    //       },
    //       {
    //         "id": 5100,
    //         "quantity": {
    //           "amount": 1,
    //           "unit": "pound"
    //         }
    //       },
    //       {
    //         "id": 2009,
    //         "quantity": {
    //           "amount": 4,
    //           "unit": "teaspoons"
    //         }
    //       },
    //       {
    //         "id": 1022020,
    //         "quantity": {
    //           "amount": 4,
    //           "unit": "teaspoons"
    //         }
    //       },
    //       {
    //         "id": 6168,
    //         "quantity": {
    //           "amount": 8,
    //           "unit": "cups"
    //         }
    //       },
    //       {
    //         "id": 9176,
    //         "quantity": {
    //           "amount": 0.5,
    //           "unit": "cup"
    //         }
    //       },
    //       {
    //         "id": 2026,
    //         "quantity": {
    //           "amount": 4,
    //           "unit": "teaspoons"
    //         }
    //       },
    //       {
    //         "id": 1042047,
    //         "quantity": {
    //           "amount": 1.5,
    //           "unit": "tablespoons"
    //         }
    //       },
    //       {
    //         "id": 1042047,
    //         "quantity": {
    //           "amount": 4,
    //           "unit": "teaspoons"
    //         }
    //       }
    //     ],
    //     "instructions": [
    //       {
    //         "instruction": "Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.",
    //         "number": 1
    //       }
    //     ],
    //     "name": "Dirty Steve's Original Wing Sauce",
    //     "tags": [
    //       "sauce"
    //     ]
    //   }

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

    ingredient4 = {
      "id": 1009016,
      "name": "apple cider",
      "estimatedCostInCents": 468
    };

    ingredient5 = {
      "id": 9003,
      "name": "apple",
      "estimatedCostInCents": 207
    }
    // ingredient = new Ingredient(newIngredient);
    const ingArr = [ingredient1, ingredient2, ingredient3, ingredient4, ingredient5]

    newRecipe1 = new Recipe(recipe1, ingArr);
    newRecipe2 = new Recipe(recipe2, ingArr);



    recipes = [newRecipe1, newRecipe2]

    recipeRepository = new RecipeRepository(recipes);

  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('Should be an instatnce of Recipe Repository', () => {
    expect(recipeRepository).to.be.an.instanceof(RecipeRepository);
  });

  it('Should be have a new recipe', () => {
    expect(recipeRepository.recipes[0]).to.be.an.instanceof(Recipe);
  });

  it('Should be able to filter recipes by their tags', () => {
    let test = recipeRepository.filterByTags(['snack', 'lunch'])
    expect(test).to.be.an('array');
    expect(test.length).to.equal(2);
    // expect(test[0].name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups');
  });

  it('Should be able to filter recipes by name or ingredients', () => {
    let search1 = recipeRepository.filterByProperty(['maple dijon apple cider grilled pork chops'])
    let search2 = recipeRepository.filterByProperty(['wheat flour', 'maple dijon apple cider grilled pork chops'])
    let search3 = recipeRepository.filterByProperty([])
    expect(search1[0]).to.be.an.instanceof(Recipe);
    expect(search1[0].name).to.equal('Maple Dijon Apple Cider Grilled Pork Chops')
    expect(search2.length).to.equal(2)
    expect(search3).to.deep.equal([]);
  });
})
