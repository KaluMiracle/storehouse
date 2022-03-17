import axios from "axios";

const URL = 'http://192.168.43.67/products_api/api/delete'

export default async function deleteProducts(selectedProducts) {
    const body = {
        method: 'DELETE',
        body: JSON.stringify({products: selectedProducts})
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