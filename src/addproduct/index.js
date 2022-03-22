import React, {useRef, useState } from 'react'
import createProduct from '../api/createProduct';

import InputContianer from '../components/inputContainer';
import { Link } from 'react-router-dom';

import styles from './add-product.module.scss';
const AddProduct = () =>{

    // for handling display for different Product types
    const [dvdDisplay, setDvdDisplay] = useState('flex');
    const [furnitureDisplay, setFurnitureDisplay] = useState('none');
    const [bookDisplay, setBookDisplay] = useState('none');

    //product types
    const FURNITURE ='furniture';
    const DVD ='dvd';
    const BOOK ='book';

    //states for sku, name, price, details etc
    
    const [sku, setSku] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [details, setDetails] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');

    //state for Product types initializing it with DVD
    const [productType, setProductType] = useState(DVD);
    //state for diplaying saveing information
    const [savingText, setSavingText] = useState('');

    // ref used in the 'select' tag for product types
    const productTypeSelector = useRef();
    
    //for handling display
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
    
    //Handling Save if sku, name or price is empty, cancel execution, else save to database

    const handleSave = async () => {
        if (sku==='' || name==='' || price===0) {
            setSavingText("fill in required details")
            return
        }
        setSavingText("Saving Product...");
        let product = {
            sku: sku,
            price: price,
            name: name,
            category_id: productType,
            details: productType === FURNITURE ? `${height}X${width}X${length}`  : details
        };
        try {
            const data = await createProduct(product);
            setSavingText(data.message)
            
        } 
        catch (error) {
            setSavingText('error connecting to database')
        }

        console.log(product)
    };

    
    return(
        <div className={styles.index}>
            <div className={styles.container}>
                <p>Add Product</p>
                
                <div>
                    <p>{savingText}</p>
                    <button  onClick={handleSave}>SAVE</button>
                    
                    <Link to={'/'}>
                        <button  >CANCEL</button>
                    </Link>
                </div>

                    
            </div>

            <form id={'product-form'} className={styles.productForm}>

                <InputContianer 
                    inputId='sku' 
                    labelText='SKU'
                    handler= {
                        (value)=>setSku(value)
                    }
                />

                <InputContianer 
                    inputId='name' 
                    labelText='Name' 
                    handler= {
                        (value)=>setName(value)
                    }

                    valueText={sku}
                />


                <InputContianer 
                    inputId='price' 
                    labelText='Price ($)' 
                    handler= {
                        (value)=>setPrice(value)
                    }
                />
                
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
                    <InputContianer 
                        inputId='height' 
                        labelText='Height (CM)' 
                        handler= {
                            (value)=>setHeight(value)
                        }
                    />

                    <InputContianer 
                        inputId='width' 
                        labelText='Width (CM)' 
                        handler= {
                            (value)=>setWidth(value)
                        }
                    />

                    <InputContianer 
                        inputId='length' 
                        labelText='Length (CM)' 
                        handler= {
                            (value)=>setLength(value)
                        }
                    />
                </div>

                <InputContianer 
                    inputId='size' 
                    labelText='Size (MB)' 
                    displayProp={`${dvdDisplay}`} 
                    handler= {
                        (value)=>setDetails(`${value}MB`)
                    }
                />

                <InputContianer 
                    inputId='weight' 
                    labelText='Weight (KG)' 
                    displayProp={`${bookDisplay}`} 
                    handler= {
                        (value)=>setDetails(`${value}KG`)
                    }
                />
            </form>
            
            <footer className={styles.footer} >Scandiweb Test assignment</footer>
            
        </div>
    )

}

export default AddProduct