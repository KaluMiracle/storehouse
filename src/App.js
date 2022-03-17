import styles from  './app.module.scss';
import { Link, Outlet } from 'react-router-dom';

import fetchProducts from './api/fetchProducts.js';
import deleteProducts from './api/deleteProducts.js';

import ProductCard from './components/productCard';
import { useEffect, useState } from 'react';

function App() {
  const [productsInfo, setProductInfo] = useState({
    message: "error check network connection",
    data: []
  });
  
  const [refresh, setRefresh] = useState(false);

  const [products, setProducts] = useState([]);
  
  const [selectedProducts, setSelectedProducts] = useState([]);
 
  
  const getProductsInfo = async () =>{
    const result ={refresh: true};
    const data = await fetchProducts();
    return  {...data};
  
  };

  const deleteHandler = async () =>{
    const data = await deleteProducts(selectedProducts);
    setRefresh(!refresh);  
  };

 

  useEffect( async ()=>{
    setProductInfo ({...productsInfo, ...await getProductsInfo()})
    setProducts([...productsInfo.data])
    setRefresh(productsInfo.refresh)
  }, [refresh])

  return (
    <div className={styles.index}>
      <div className={styles.container}>
        <p>Product List</p>
        <Link to={"addproduct"}>
          <button>ADD</button>
        </Link>
        <button disabled={selectedProducts.length === 0} onClick={deleteHandler}>MASS DELETE</button>
      </div>
        <div className={styles.cardsContainer}>
          {
            products.map(product => {
              
              return <ProductCard 
                  key={product.sku} 
                  sku={product.sku} 
                  name={product.name} 
                  details={product.details} 
                  price={product.price}
                  categoryId={product.category_id}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
            })
            
          }
          <p style={{
            display: products.length === 0 ? "flex" : "none"
          }}>{productsInfo.message}</p>
        </div>
      
      <footer className={styles.footer}>Scandiweb Test assignment</footer>
      
    </div>
  );
}

export default App;
