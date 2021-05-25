import './styles.css';
import RecipeRepository from './classes/RecipeRepository.js';
import User from './classes/User.js';
import Recipe from './classes/Recipe.js';
import apiCalls from './data/apiCalls';

const options = document.getElementById('options')
let optionsContainer = document.getElementById('optionsContainer');

const cardArea = document.getElementById('cardArea');
const userNameGreeting = document.getElementById('userNameGreeting');
const userFavorites = document.getElementById('userFavorites')
const userToCook = document.getElementById('userToCook')
const searchContainer = document.getElementById('searchContainer');
const allRecipes = document.getElementById('allRecipes');

let getByTag, getNameOrIngredient, searchUserByNameBtn, searchUserByTag, checkBoxes, recipeInfoBtns, favoriteBtns, removeBtns, currentUser, cookBook, fetchedIngData, addToCookBtns, userFaveSearch, siteWideSearchInput, tagBtn;


const setSiteWideRepository = () => {
  apiCalls.getData()
  .then(promise => {
    cookBook = new RecipeRepository(promise[1]['recipeData'].map(recipe => {
      return new Recipe(recipe, promise[2]['ingredientsData'])
    }))
    renderRecipes(cookBook.recipes);
    let users = promise[0]['usersData'];
    currentUser = new User(users[getRandomIndex(users)]);
    fetchedIngData = promise[2]['ingredientsData'];
    userNameGreeting.innerText += `', ${currentUser.data.name}!`;
  })
}

const setData = (data) => {
  cookBook = data;
  console.log(cookBook.recipeData)
  return cookBook
}

const defaultPageSetup = () => {
  setSiteWideRepository();
  renderDefaultSearch();
}

const expandOptions = () => {
  optionsContainer.classList.toggle('hidden')
  console.log("WORKING")
  loadOptions();
}

const loadOptions = () => {
  optionsContainer.innerHTML = "";
  let allUniqueTags = [];
  cookBook.recipes.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (!allUniqueTags.includes(tag)) {
        allUniqueTags.push(tag);
        optionsContainer.innerHTML += `
        <div><input type="checkbox" name="check" value="${tag}">
      <label>${tag}</label></div>
      `;}
      });
    });
    optionsContainer.innerHTML += `
      <button id="tagSearch" class="filter-button" type="button" name="button">SEARCH BY TAG</button>
    `;
    tagBtn = document.getElementById('tagSearch');
    tagBtn.addEventListener("click", searchByTags);
    checkBoxes = document.querySelectorAll('input[name="check"]');
}



const expandFavOptions = () => {
  optionsContainer.classList.toggle('hidden')
  loadFavOptions();
}

const loadFavOptions = () => {
  optionsContainer.innerHTML = "";
  let allUniqueTags = [];
  cookBook.recipes.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (!allUniqueTags.includes(tag)) {
        allUniqueTags.push(tag);
        optionsContainer.innerHTML += `
        <div><input type="checkbox" name="check" value="${tag}">
      <label>${tag}</label></div>
      `;}
      });
    });
    optionsContainer.innerHTML += `
      <button id="tagSearch" class="filter-button" type="button" name="button">SEARCH BY TAG</button>
    `;
    tagBtn = document.getElementById('tagSearch');
    tagBtn.addEventListener("click", searchUserFaveByTags);
    checkBoxes = document.querySelectorAll('input[name="check"]');
}




const searchByName = () => {
  cardArea.innerHTML = "";
  let query = siteWideSearchInput.value.toLowerCase().split(' ');
  let search = cookBook.filterByProperty(query);
  renderRecipes(search)
}


const searchUserFaves = () => {
  cardArea.innerHTML = "";
  let query = userFaveSearch.value.toLowerCase().split(' ');
  let search = currentUser.favoriteRecipes.filterByProperty(query);
  // cardArea.innerHTML = "";
  renderFavorites(search)
}

const searchUserFaveByTags = () => {
  let query = [];
  checkBoxes.forEach(box => {
    if (box.checked) {
      query.push(box.value)
    }
  });
  let search = currentUser.favoriteRecipes.filterByTags(query)
  renderFavorites(search)
}

const showRecipeInfo = (event) => {
  let nextItem = event.target.nextElementSibling;
  if (nextItem) {
    nextItem.classList.add('show');
  }
  event.target.classList.add('hidden')
}

const searchByTags = () => {
  let query = [];
  checkBoxes.forEach(box => {
    if (box.checked) {
      query.push(box.value)
    }
  });
  renderRecipes(cookBook.filterByTags(query))
}

const renderRecipes = (recipeRepo) => {
  cardArea.innerHTML = "";
  recipeRepo.forEach(recipe => {
    const recipeInfo = setRecipe(recipe)
    cardArea.innerHTML += `
    <div class="recipe">
      <h3>${recipe.name}</h3>
      <img src="${recipe.image}">
      <button class="btn favoriteBtn"><i class="fa fa-heart favorite" id="${recipe.id}"></i></i></button>
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


const setupDefaultSeach = () => {
  siteWideSearchInput = document.getElementById('siteWideSearch');
  getNameOrIngredient = document.getElementById('getNameOrIngredient');
  getByTag = document.getElementById('getByTag');
  optionsContainer = document.getElementById('optionsContainer');
  getByTag.addEventListener("click", expandOptions);
  getNameOrIngredient.addEventListener("click", searchByName)
  siteWideSearchInput.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });
}

const setupFaveSearch = () => {
  userFaveSearch = document.getElementById('userFaveSearch')
  searchUserByNameBtn = document.getElementById('searchUserByName');
  searchUserByNameBtn.addEventListener("click", searchUserFaves)
  searchUserByTag = document.getElementById('searchUserByTag')
  searchUserByTag.addEventListener("click", expandFavOptions);
  optionsContainer = document.getElementById('optionsContainer')
  userFaveSearch.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });
}

const renderDefaultSearch = () => {
  searchContainer.innerHTML = "";
  searchContainer.innerHTML +=
  `
  <form autocomplete="off" class="" action="index.html" method="post">
    <input id="siteWideSearch" class="main-search" type="text" placeholder="Search by name or ingredient" name="ingredientsearch">
    <button id="getNameOrIngredient" class="search-buttons" type="button" name="button">Search By Name</button>
    <button id="getByTag" type="button" class="search-buttons" name="button">Search By Tag</button>
    <section id="optionsContainer" class="tag-options hidden"></section>
  </form>
  `
  setupDefaultSeach();
}



const renderFavoriteSearch = () => {
  searchContainer.innerHTML = "";
  searchContainer.innerHTML +=
  `
  <form autocomplete="off" class="" action="index.html" method="post">
    <input id="userFaveSearch" class="main-search" type="text" placeholder="Search favorites by name or ingredient" name="ingredientsearch">
    <button id="searchUserByName" class="search-buttons" type="button" name="button">Search By Name</button>
    <button id="searchUserByTag" type="button" class="search-buttons" name="button">Search By Tag</button>
    <section id="optionsContainer" class="tag-options hidden"></section>
  </form>
  `
  setupFaveSearch();
}

const renderFavorites = (recipeRepo) => {
  cardArea.innerHTML = "";
  renderFavoriteSearch();
  recipeRepo.forEach(recipe => {
    const recipeInfo = setRecipe(recipe)
    cardArea.innerHTML += `
    <div class="recipe">
      <h3>${recipe.name}</h3>
      <img src="${recipe.image}">
      <div class="add-remove-container">
        <button name="${recipe.id}" class="remove-recipe">Remove</button>
        <button id="${recipe.id}"class="add-cook">Add to Cook</button>
      </div>
      <button class='show-recipe show-recipe-favorite'>More info</button>
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


const renderToCook = (recipeRepo) => {
  cardArea.innerHTML = "";
  if (!recipeRepo.length) {
    cardArea.innerHTML +=
    `
    <h3 class="nothing-yet">There's nothing here yet! Favorite then add something 😊</h3>
    `
  }
  recipeRepo.forEach(recipe => {
    const recipeInfo = setRecipe(recipe)
    cardArea.innerHTML += `
    <div class="recipe">
      <h3>${recipe.name}</h3>
      <img src="${recipe.image}">
      <button class='show-recipe cook-recipe-btn'>More info</button>
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
  return {
    recipeIngredients: ingredients,
    recipeCost: cost,
    recipeInstructions: instructions
  }
}

const formatValues = (ingredients) => {
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
  removeBtns = document.querySelectorAll('.remove-recipe')
  addToCookBtns = document.querySelectorAll('.add-cook')

  recipeInfoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showRecipeInfo(event)
    })
  })
  favoriteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      addToUserFaves(event)
    })
  })
  if (removeBtns.length) {
    removeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromUserFaves(event)
      })
    })
  }
  addToCookBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log("button clicks fine")
      addToUserCook(event)
    })
  })


}

// To be utilized for userFavorites, and load random user

const addToUserFaves = (event) => {
  console.log(event.target.id);
  const foundRecipe = cookBook.recipes.find(recipe => recipe.id.toString() === event.target.id)
  console.log(foundRecipe);
  let formattedRecipe = new Recipe(foundRecipe, fetchedIngData);
  currentUser.addToFavorites(formattedRecipe);
  console.log(currentUser);
}

const removeFromUserFaves = (event) => {
  console.log(event.target.name);
  const foundRecipe = cookBook.recipes.find(recipe => recipe.id.toString() === event.target.name)
  console.log(foundRecipe);
  currentUser.removeFromFavorite(foundRecipe);
  console.log(currentUser);
  renderFavorites(currentUser.favoriteRecipes.recipes)
}


const addToUserCook = (event) => {
  const foundRecipe = cookBook.recipes.find(recipe => recipe.id.toString() === event.target.id)
  console.log(event.target)
  console.log(cookBook.recipes.find(recipe => recipe.id.toString() === event.target.id.toString()))
  let formattedFound = new Recipe(foundRecipe, fetchedIngData)
  currentUser.addToRecipesToCook(formattedFound);
  event.target.classList.disable = true;
}

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
}

const showUserFavorites = () => {
  cardArea.innerHTML = "";
  // if (!currentUser.favoriteRecipes.recipes.length) {
  //   cardArea.innerHTML +=
  //   `
  //   <h3 class="nothing-yet">There's nothing here yet! Favorite a recipe first 😊</h3>
  //   `
  // }
  renderFavorites(currentUser.favoriteRecipes.recipes)
}

const showUserToCook = () => {
  searchContainer.innerHTML = "";
  searchContainer.innerHTML +=
  `
  <h2 class="to-cook">Recipes to Cook</h2>
  `
  renderToCook(currentUser.recipesToCook.recipes)
}

const showAllRecipes = () => {
  renderDefaultSearch();
  renderRecipes(cookBook.recipes)
}

// Event Listeners GO HERE

userToCook.addEventListener("click", showUserToCook)
userFavorites.addEventListener("click", showUserFavorites)
allRecipes.addEventListener("click", showAllRecipes)
if (recipeInfoBtns) {
  recipeInfoBtns.addEventListener('click', showRecipeInfo)
}

window.addEventListener('load', defaultPageSetup);
