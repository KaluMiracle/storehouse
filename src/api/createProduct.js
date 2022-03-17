import axios from "axios";

const URL = 'http://localhost/products_api/api/create'

export default async function createProduct(product) {
    const body = {
        method: 'POST',
        body: JSON.stringify(product)
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