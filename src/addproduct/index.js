import React, { useRef, useState } from 'react'
import styles from './add-product.module.scss'
import createProduct from '../api/createProduct';
import { Link } from 'react-router-dom';
const AddProduct = () =>{

    const [dvdDisplay, setDvdDisplay] = useState('flex');
    const [furnitureDisplay, setFurnitureDisplay] = useState('none');
    const [bookDisplay, setBookDisplay] = useState('none');

    const FURNITURE ='furniture';
    const DVD ='dvd';
    const BOOK ='book';

    let product = {};

    const [sku, setSku] = useState(0);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    const [productType, setProductType] = useState(DVD);
    const [details, setDetails] = useState('');

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [length, setLength] = useState(0);

    const buttonDisable =  (sku === 0 || name === '' || price === 0) ? true : false;;
    

    const productTypeSelector = useRef();
    
    const displayDetailsFormHandler = {
        'dvd': () => {
            setDvdDisplay('flex')
            setBookDisplay('none')
            setFurnitureDisplay('none')
            setProductType(DVD) 
            setDetails('')
        },
        'book': () => {
            setDvdDisplay('none')
            setBookDisplay('flex')
            setFurnitureDisplay('none')
            setProductType(BOOK)
            setDetails('')
        },
        'furniture': () => {
            setDvdDisplay('none')
            setBookDisplay('none')
            setFurnitureDisplay('flex')
            setProductType(FURNITURE)
            setDetails('')
        }
    };

    const skuGenerator = {
        'dvd': 'JVC',
        'book': 'GGWP',
        'furniture': 'TRI'
    };
    

    const handleSave = async () => {
        product = {
            sku: `${skuGenerator[productType]}${sku}`,
            price: parseInt(price),
            name: name,
            category_id: productType,
            details: productType === FURNITURE ? `${height}X${width}X${length}`  : details
        };

        const data = await createProduct(product);
        console.log(data.message);

    };

    

    return(
        <div className={styles.index}>
                <div className={styles.container}>
                        <p>Add Product</p>
                        <button disabled={buttonDisable}  onClick={handleSave}>SAVE</button>
                        <Link to={'/'}>
                            <button  >CANCEL</button>
                        </Link>
                        
                </div>

                <form id={'product-form'} className={styles.productForm}>

                    <div className={styles.inputContainer}>
                        <label>SKU</label>
                        <input id='sku' type={'number'} placeholder={`${skuGenerator[productType]}-`}  onChange={
                            (e) => setSku(e.target.value)
                        }/>
                    </div>

                    <div className={styles.inputContainer}>
                        <label>Name</label>
                        <input id='name' className={styles.name} onChange={
                            (e) => setName(e.target.value)
                        }/>
                    </div>

                    <div className={styles.inputContainer}>
                        <label>Price ($)</label>
                        <input id='price' type={'number'} onChange={
                            (e) => setPrice(e.target.value)
                        }/>
                    </div>
                    
                    <div className={styles.inputContainer} >
                        <label>Type Switcher</label>
                        <select id='productType' ref={productTypeSelector} onChange={
                            () => displayDetailsFormHandler[productTypeSelector.current.value]()
                        }>
                            <option value={'dvd'}>DVD</option>
                            <option value={'book'}>Book</option>
                            <option value={'furniture'}>Furniture</option>

                        </select>
                    </div>

                    <div className={styles.furnitureContainer} style={{
                        display: `${furnitureDisplay}`,
                        ...styles
                    }}>
                        <div className={styles.inputContainer}>
                            <label>Height (CM)</label>
                            <input id='height' onChange={
                                (e) => setHeight(e.target.value)
                            }/>
                        </div>

                        <div className={styles.inputContainer}>
                            <label>Width (CM)</label>
                            <input id='width' onChange={
                                (e) => setWidth(e.target.value)
                            }/>
                        </div>

                        <div className={styles.inputContainer}>
                            <label>Length (CM)</label>
                            <input id='length' onChange={
                                (e) => setLength(e.target.value)
                            }/>
                        </div>
                    </div>

                    <div className={styles.inputContainer}  style={{
                        display: `${dvdDisplay}`,
                        ...styles
                    }}>
                        <label>Size (MB)</label>
                        <input  id='size' onChange={
                            (e) => setDetails(`${e.target.value}MB`)
                        }/>
                    </div>

                    <div className={styles.inputContainer} style={{
                        display: `${bookDisplay}`,
                        ...styles
                    }}>
                        <label>Weight (KG)</label>
                        <input id='weight' onChange={
                            (e) =>setDetails(`${e.target.value}KG`)
                        }/>
                    </div>
                </form>
            
            <footer className={styles.footer} >Scandiweb Test assignment</footer>
            
        </div>
    )

}

export default AddProduct