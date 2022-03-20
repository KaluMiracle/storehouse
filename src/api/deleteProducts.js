
const URL = 'https://products-api-miracle.herokuapp.com/api/delete'

//function to delete Products from the database

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


    return products;
    
  
}