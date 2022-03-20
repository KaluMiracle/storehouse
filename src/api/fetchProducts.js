
const URL = 'https://products-api-miracle.herokuapp.com/api/read'
//function to get Products from the DataBase
export default async function fetchProducts() {
  const body = {
    method: 'GET',
  }
  let products = []
  await fetch(URL, body)
    .then(response =>{
      products = response.json();
    })
  return products;
}