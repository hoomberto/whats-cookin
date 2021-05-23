import './styles.css';
// import apiCalls from './apiCalls';
import RecipeRepository from './classes/RecipeRepository.js';
import User from './classes/User.js';
// import Ingredient from './classes/Ingredient.js';
import Recipe from './classes/Recipe.js';
import { recipeData } from './data/recipes.js';
// import { fetchUsersData } from './data/apiCalls.js';
// const fetchUsers = fetchUsersData;

// import { fetchRecipeData } from './data/apiCalls.js';
// const fetchRecipes = fetchRecipeData;


import apiCalls from './data/apiCalls';
//
// import { fetchIngredientsData } from './data/apiCalls.js';
//
// const fetchIngredients = fetchIngredientsData;

const importedRecipes = recipeData;

const getByTag = document.getElementById('getByTag');
const options = document.getElementById('options')
const optionsContainer = document.getElementById('optionsContainer');
const siteWideSearchInput = document.getElementById('siteWideSearch');
const getNameOrIngredient = document.getElementById('getNameOrIngredient');
const tagBtn = document.getElementById('tagSearch');
const cardArea = document.getElementById('cardArea');


let checkBoxes, recipeInfoBtns, favoriteBtns, currentUser, cookBook;

const setSiteWideRepository = () => {

apiCalls.getData()
.then(promise => {
  cookBook = new RecipeRepository(promise[1]['recipeData'].map(recipe => {
    return new Recipe(recipe, promise[2]['ingredientsData'])
  }))
  console.log(cookBook)
  renderRecipes(cookBook.recipes)
})

//   const fetched = () => {
//     fetchRecipeData()
//     .then(data => setData(data))
//     .catch(err => console.error("not working"))
// }
  // fetched();
  // console.log(cookBook)
  // return new RecipeRepository(importedRecipes.map(recipe => {
  //   return new Recipe(recipe)
  // }))
}

const setData = (data) => {
  cookBook = data;
  console.log(cookBook.recipeData)
  return cookBook


}




const defaultPageSetup = () => {
  setSiteWideRepository();
  currentUser = new User()
  // console.log(fetchUsers);
  // fetchUsersData().then(data => console.log(data.usersData))
  //   .catch(error => console.log('Error'));
}

const expandOptions = () => {
  optionsContainer.classList.toggle('hidden')
  console.log("WORKING")
  loadOptions();
}

const loadOptions = () => {
  options.innerHTML = "";
  let allRecipes = setSiteWideRepository();
  let allUniqueTags = [];
  allRecipes.recipes.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (!allUniqueTags.includes(tag)) {
        allUniqueTags.push(tag)
      }
    });
  });
  allUniqueTags.forEach(tag => {
    options.innerHTML +=
    `<input type="checkbox" name="check" value="${tag}">
    <label>${tag}</label><br>`
  });
  checkBoxes = document.querySelectorAll('input[name="check"]');
};

const searchByName = () => {
  cardArea.innerHTML = "";
  let query = siteWideSearchInput.value.toLowerCase().split(' ');
  let recipeRepo = setSiteWideRepository();
  let search = recipeRepo.filterByProperty(query);
  renderRecipes(search)
}

const showRecipeInfo = (event) => {
  console.log("it works!");
  console.log(event.target.closest('.recipe'));
  let nextItem = event.target.nextElementSibling;
  if (nextItem) {
    nextItem.classList.add('show');
  }
  event.target.classList.add('hidden')
}

const searchByTags = () => {
  let allRecipes = setSiteWideRepository();
  let query = [];
  checkBoxes.forEach(box => {
    if (box.checked) {
      query.push(box.value)
    }
  });
  renderRecipes(allRecipes.filterByTags(query))
}

const renderRecipes = (recipeRepo) => {
  cardArea.innerHTML = "";
  recipeRepo.forEach(recipe => {
    const recipeInfo = setRecipe(recipe)
    cardArea.innerHTML += `
    <div class="recipe">
      <h3>${recipe.name}</h3>
      <img src="${recipe.image}">
      <button class="btn favorite"><i class="fa fa-heart"></i></i></button>
      <button class='show-recipe'>More info</button>
      <div class="recipe-info">
        <h3>Ingredients</h3>
        <p>${recipeInfo.recipeIngredients}</p>
        <h3>Cost</h3>
        <p>${recipeInfo.recipeCost}</p>
        <h3>Instructions</h3>
        <p>${recipeInfo.recipeInstructions}</p>
      </div>
    </div>
    `;
  });
  makeBtnsClickable();
}


const setRecipe = (recipe) => {
  recipe.setIngredients();
  let instructions = recipe.getInstructions()
  let cost = recipe.ingredientsCost()
  let ingredients = formatValues(recipe.ingredients).join(' ')
  // console.log(recipe)
  return {
    recipeIngredients: ingredients,
    recipeCost: cost,
    recipeInstructions: instructions
    // recipeIngredients: formatValues(recipe.ingredients).join(' '),
    // recipeCost: recipe.ingredientsCost(),
    // recipeInstructions: recipe.getInstructions()
  }
}

const formatValues = (ingredients) => {
  // console.log(ingredients)
  let decsToFracs = {
    "0.3333333333333333": '1/3',
    "0.25": '1/4',
    "0.5": '1/2',
    "0.75": '3/4',
    "0.6666666666666666": '2/3',
    "0.125": '1/8',
    "1.125": '1 & 1/8'
  };
  return ingredients.reduce((acc, currentVal) => {
    Object.entries(decsToFracs).forEach(([key, value]) => {
      // console.log(currentVal)
      if (key === currentVal.quantity.amount.toString()) {
        currentVal.quantity.formattedAmount = value;
      }
    })
    acc.push(`<strong>${currentVal.quantity.formattedAmount || currentVal.quantity.amount} ${currentVal.quantity.unit}</strong> ${currentVal['name'] || currentVal.name} <br>`)
    return acc
  }, []);
}

const makeBtnsClickable = () => {
  recipeInfoBtns = document.querySelectorAll('.show-recipe');
  favoriteBtns = document.querySelectorAll('.favorite')
  recipeInfoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showRecipeInfo(event)
    })
  })
  // Add event listeners to favorite icons

  // favoriteBtns.forEach(btn => {
  //   btn.addEventListener('click', () => {
  //     addToUserFaves(event)
  //   })
  // })
}

// To be utilized for userFavorites, and load random user

// const addToUserFaves = (event) => {
//
// }
//
// const getRandomIndex = (array) => {
//   return Math.floor(Math.random() * array.length);
// }

// Event Listeners GO HERE

getByTag.addEventListener("click", expandOptions);
getNameOrIngredient.addEventListener("click", searchByName)
tagBtn.addEventListener("click", searchByTags)
if (recipeInfoBtns) {
  recipeInfoBtns.addEventListener('click', showRecipeInfo)
}
siteWideSearchInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
});

window.addEventListener('load', defaultPageSetup);
