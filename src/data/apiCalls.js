// Your fetch requests will live here!
// export default { fetchUsersData }


export const fetchUsersData = () => {
  // let data;
  return fetch('http://localhost:3001/api/v1/users')
  .then(response => response.json())
  // .then(res => console.log('res>>>>>', res))
  // .catch(error => console.log('Error'));
  // return promise;
}

console.log('I will be a fetch request!')
