import './styles.css';
import RecipeRepository from './classes/RecipeRepository.js';
import User from './classes/User.js';
import Recipe from './classes/Recipe.js';
import apiCalls from './data/apiCalls';

// const getByTag = document.getElementById('getByTag');
const options = document.getElementById('options')
let optionsContainer = document.getElementById('optionsContainer');
// const siteWideSearchInput = document.getElementById('siteWideSearch');
// const getNameOrIngredient = document.getElementById('getNameOrIngredient');
// let tagBtn = document.getElementById('tagSearch');
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
    // console.log(cookBook)
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
  // currentUser = new User()
  renderDefaultSearch();
}

const expandOptions = () => {
  optionsContainer.classList.toggle('hidden')
  console.log("WORKING")
  loadOptions();
}

const loadOptions = () => {
  // options.innerHTML = "";
  optionsContainer.innerHTML = "";
  let allUniqueTags = [];
  cookBook.recipes.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (!allUniqueTags.includes(tag)) {
        allUniqueTags.push(tag);
        // we changed this from options.
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
  // options.innerHTML = "";
  optionsContainer.innerHTML = "";
  let allUniqueTags = [];
  cookBook.recipes.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (!allUniqueTags.includes(tag)) {
        allUniqueTags.push(tag);
        // we changed this from options.
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
  // apiCalls.getData()
  // .then(promise => {
  //   cookBook = new RecipeRepository(promise[1]['recipeData'].map(recipe => {
  //     return new Recipe(recipe, promise[2]['ingredientsData'])
  //   }))
  //   let query = siteWideSearchInput.value.toLowerCase().split(' ');
  //   let search = cookBook.filterByProperty(query);
  //   renderRecipes(search)
  // })
}


const searchUserFaves = () => {
  cardArea.innerHTML = "";
  let query = userFaveSearch.value.toLowerCase().split(' ');
  let search = currentUser.favoriteRecipes.filterByProperty(query);
  renderRecipes(search)
  // apiCalls.getData()
  // .then(promise => {
  //   cookBook = new RecipeRepository(promise[1]['recipeData'].map(recipe => {
  //     return new Recipe(recipe, promise[2]['ingredientsData'])
  //   }))
  //   let query = siteWideSearchInput.value.toLowerCase().split(' ');
  //   let search = cookBook.filterByProperty(query);
  //   renderRecipes(search)
  // })
}

const searchUserFaveByTags = () => {
  let query = [];
  checkBoxes.forEach(box => {
    if (box.checked) {
      query.push(box.value)
    }
  });
  renderRecipes(currentUser.favoriteRecipes.filterByTags(query))
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
  // getByTag = document.getElementById('getByTag')
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
// const renderBody = () => {
//   body.innerHTML = "";
//   body.innerHTML +=
//   `<nav>
//     <h1 id="userNameGreeting">Whats Cookin', ${currentUser.data.name}!</h1>
//     <div class="nav-btns-container">
//       <button type="button" id="userFavorites" class="buttons" name="button">View Favorites</button>
//       <button type="button" id="userToCook" class="buttons" name="button">Recipes to Cook</button>
//     </div>
//   </nav>
//   <form autocomplete="off" class="" action="index.html" placeholder="Search through favorites" method="post">
//     <input id="favoriteSearch" class="main-search" type="text" name="ingredientsearch">
//     <button id="getNameOrIngredient" class="search-buttons" type="button" name="button">Search By Name</button>
//     <button id="getByTag" type="button" class="search-buttons" name="button">Search By Tag</button>
//     <section id="optionsContainer" class="tag-options hidden"></section>
//   </form>
//   <main id="cardArea">
//   </main>
//   `
//   const favSearch = document.getElementById('favoriteSearch');
//   favSearch.addEventListener("click", searchUserFaves)
// }

const renderFavorites = (recipeRepo) => {
  // body.innerHTML = ""
  // renderBody();
  renderFavoriteSearch();
  cardArea.innerHTML = "";
  recipeRepo.forEach(recipe => {
    const recipeInfo = setRecipe(recipe)
    cardArea.innerHTML += `
    <div class="recipe">
      <h3>${recipe.name}</h3>
      <img src="${recipe.image}">
      <button name="${recipe.id}" class="remove-recipe">Remove from Favorites</button>
      <button id="${recipe.id}"class="add-cook">Add to Cook</button>
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
  recipeRepo.forEach(recipe => {
    const recipeInfo = setRecipe(recipe)
    cardArea.innerHTML += `
    <div class="recipe">
      <h3>${recipe.name}</h3>
      <img src="${recipe.image}">
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
  removeBtns = document.querySelectorAll('.remove-recipe')
  addToCookBtns = document.querySelectorAll('.add-cook')

  recipeInfoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showRecipeInfo(event)
    })
  })
  favoriteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // addToUserFaves(event)
      setTimeout(addToUserFaves(event), 700);
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
  // setTimeout(currentUser.addToFavorites(formattedRecipe), 500)
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

// const removeFromUserToCook = (event) => {
//   const foundRecipe = cookBook.recipes.find(recipe => recipe.id.toString() === event.target.id)
//
// }

const addToUserCook = (event) => {
  const foundRecipe = cookBook.recipes.find(recipe => recipe.id.toString() === event.target.id)
  // let found = cookBook.recipes.filter(recipe => recipe.id != event.target.id)
  console.log(event.target)
  console.log(cookBook.recipes.find(recipe => recipe.id.toString() === event.target.id.toString()))
  let formattedFound = new Recipe(foundRecipe, fetchedIngData)
  currentUser.addToRecipesToCook(formattedFound);
  // renderToCook(currentUser.recipesToCook.recipes)
}

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
}

const showUserFavorites = () => {
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

  // getByTag.addEventListener("click", expandOptions);
  // getNameOrIngredient.addEventListener("click", searchByName)

}

// Event Listeners GO HERE

// getByTag.addEventListener("click", expandOptions);
// getNameOrIngredient.addEventListener("click", searchByName)
// tagBtn.addEventListener("click", searchByTags)
userToCook.addEventListener("click", showUserToCook)
userFavorites.addEventListener("click", showUserFavorites)
allRecipes.addEventListener("click", showAllRecipes)
if (recipeInfoBtns) {
  recipeInfoBtns.addEventListener('click', showRecipeInfo)
}
// siteWideSearchInput.addEventListener("keypress", (event) => {
//   if (event.keyCode === 13) {
//     event.preventDefault();
//   }
// });

window.addEventListener('load', defaultPageSetup);
