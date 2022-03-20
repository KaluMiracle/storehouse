
const URL = 'https://products-api-miracle.herokuapp.com/api/create'

// function to add a Product to the Database
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

    return products;

}