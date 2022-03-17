import axios from "axios"

const URL = 'http://192.168.43.67/products_api/api/read'

export default async function fetchProducts() {
  const body = {
    method: 'GET',
  }
  let products = []
  await fetch(URL, body)
      .then(response =>{
        products = response.json();
      })
      .catch(error =>{
        console.log("errorrr: " + error)

      });


  return products;
}