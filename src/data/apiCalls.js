// export default { fetchUsersData }


const fetchUsersData = () => {
  return fetch('http://localhost:3001/api/v1/users')
  .then(response => response.json())
  .catch(err => console.error("not working"))
}

const fetchRecipeData = () => {
  return fetch('http://localhost:3001/api/v1/recipes')
  .then(response => response.json())
  .catch(err => console.error("not working"))
}

const fetchIngredientData = () => {
  return fetch('http://localhost:3001/api/v1/ingredients')
  .then(response => response.json())
  .catch(err => console.error("not working"))
}

const getData = () => {
  return Promise.all([ fetchUsersData(), fetchRecipeData(), fetchIngredientData() ])
}

export default { fetchUsersData, fetchIngredientData, fetchRecipeData, getData }
