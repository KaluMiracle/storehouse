import styles from  './app.module.scss';
import { Link, Outlet } from 'react-router-dom';

import fetchProducts from './api/fetchProducts.js';
import deleteProducts from './api/deleteProducts.js';

import ProductCard from './components/productCard';
import { useEffect, useState } from 'react';


function App() {

  const [productsInfo, setProductInfo] = useState({
    data: []
  });
  
  const [refresh, setRefresh] = useState(false);

  const [products, setProducts] = useState([]);
  
  const [selectedProducts, setSelectedProducts] = useState([]);
 
  const [infoText, setInfoText] = useState('');

  //geting Products
  const getProductsInfo = async () =>{
    setInfoText('Getting Products')
    try{
      const data = await fetchProducts();
      setInfoText(data.message)

      return  {...data};

    }catch(error){
      return {message: "error check network connection"}
    }
  };

  //deleting PRoducts
  const deleteHandler = async () =>{
    setInfoText("deleting...");

    try{
      const data = await deleteProducts(selectedProducts);
      setInfoText(data.message);
      setRefresh(!refresh);
    }catch(error){
      setInfoText('error connecting to database');
    }
      
  };



  //function that runs when the page rerenders
  const handleRefresh = async () =>{
    setProductInfo ({...productsInfo, ...await getProductsInfo()});
    setProducts([...productsInfo.data]);
    setRefresh(productsInfo.refresh);
  }
 

  useEffect(()=>{
    handleRefresh();
  }, [refresh])

  return (
    <div className={styles.index}>
      <div className={styles.container}>
        <p>Product List</p>

        <div>
          <p>{infoText}</p>
          <Link to={"addproduct"}>
            <button>ADD</button>
          </Link>
          <button disabled={selectedProducts.length === 0} onClick={deleteHandler} style = {{
            background: 'red',
            color: 'white',
            ...styles
          }}>MASS DELETE</button>
        </div>
        
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
