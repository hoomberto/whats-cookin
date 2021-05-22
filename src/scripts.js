import './styles.css';
// import apiCalls from './apiCalls';
import RecipeRepository from './classes/RecipeRepository.js';
import User from './classes/User.js';
import Ingredient from './classes/Ingredient.js';
import Recipe from './classes/Recipe.js';
import { recipeData } from './data/recipes.js';
const importedRecipes = recipeData;

const getByTag = document.getElementById('getByTag');
const options = document.getElementById('options')
const optionsContainer = document.getElementById('optionsContainer');
const siteWideSearchInput = document.getElementById('siteWideSearch');
const getNameOrIngredient = document.getElementById('getNameOrIngredient');
const tagBtn = document.getElementById('tagSearch');
const cardArea = document.getElementById('cardArea');


let checkBoxes, recipeInfoBtns;

const setSiteWideRepository = () => {
  return new RecipeRepository(importedRecipes.map(recipe => {
    return new Recipe(recipe)
  }))
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
  // search.forEach(recipe => {
  //   cardArea.innerHTML += `
  //   <div class="recipe">
  //     <h3>${recipe.name}</h3>
  //     <img src="${recipe.image}">
  //   </div>
  //   `;
  // })
}

const showRecipeInfo = (event) => {
  console.log("it works!");
  console.log(event.target.closest('.recipe'));
  let nextItem = event.target.nextElementSibling;
  if (nextItem) {
    nextItem.classList.remove('hidden');
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
    let recipeInfo = setRecipe(recipe)
    cardArea.innerHTML += `
    <div class="recipe">
      <h3>${recipe.name}</h3>
      <img src="${recipe.image}">
      <button class='show-recipe'>More info</button>
      <div class="recipe-info hidden">
        <h4>Ingredients</h4>
        <p>${recipeInfo.recipeIngredients}</p>
        <h4>Cost</h4>
        <p>${recipeInfo.recipeCost}</p>
        <h4>Instsructions</h4>
        <p>${recipeInfo.recipeInstructions}</p>
      </div>
    </div>
    `;
  });
  makeBtnsClickable();
}

const setRecipe = (recipe) => {
  let names = recipe.getIngredientNames();
  let formatted = names.map((word) => {
    return word[0].toUpperCase() + word.substring(1);
  });
  return {
    recipeIngredients: formatted.join(', '),
    recipeCost: recipe.ingredientsCost(),
    recipeInstructions: recipe.getInstructions()
  }
}

const makeBtnsClickable = () => {
  recipeInfoBtns = document.querySelectorAll('.show-recipe');
  recipeInfoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showRecipeInfo(event)
    })
  })
}

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

window.addEventListener('load', renderRecipes(setSiteWideRepository().recipes));
