// Your fetch requests will live here!
// export default { fetchUsersData }


const fetchUsersData = () => {
  // let data;
  return fetch('http://localhost:3001/api/v1/users')
  .then(response => response.json())
  .catch(err => console.error("not working"))

}

const fetchRecipeData = () => {
  // const response = await fetch('http://localhost:3001/api/v1/recipes')
  // const parsed = await response.json();
  //
  // return parsed;

  return fetch('http://localhost:3001/api/v1/recipes')
  .then(response => response.json())
  .catch(err => console.error("not working"))

}
//
const fetchIngredientData = () => {
  return fetch('http://localhost:3001/api/v1/ingredients')
  .then(response => response.json())
  .catch(err => console.error("not working"))
  // const response = await fetch('http://localhost:3001/api/v1/ingredients');
  // const parsed = await response.json();
  // // console.log(deserializedData)
  // console.log(parsed)
  // return {data: parsed};

  // fetch('http://localhost:3001/api/v1/ingredients')
  // .then(response => response.json())
}

const getData = () => {
  // console.log(Promise.all([retrieveUserData(), retrieveIngredientsData(), retrieveRecipeData()]));
  return Promise.all([ fetchUsersData(), fetchRecipeData(), fetchIngredientData() ])
}


export default { fetchUsersData, fetchIngredientData, fetchRecipeData, getData }

// async function fetchIngredientData {
//   const response = await fetch('http://localhost:3001/api/v1/ingredients');
//   const parsed = await response.json();
//   // console.log(deserializedData)
//   console.log(parsed)
//   return parsed;
// }

console.log('I will be a fetch request!')
// export default fetchIngredientsData
