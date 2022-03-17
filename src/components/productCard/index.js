import book from '../../assets/img/book.png';
import furniture from '../../assets/img/furniture.png';
import dvd from '../../assets/img/dvd.png';

import styles from './product-card.module.scss';

const ProductCard = ({
    sku,
    name,
    price,
    details,
    categoryId,
    selectedProducts,
    setSelectedProducts
}) => {

    const categories ={
        "furniture": "dimensions",
        "book": 'weight',
        'dvd': "size",
        
    }
    const images={
        "furniture": furniture,
        "book": book,
        'dvd': dvd,
        
    }
    
    const handleCheck = (e) => {
        const {checked} = e.target;
        if(checked) setSelectedProducts([...selectedProducts, sku])
        else setSelectedProducts([...selectedProducts.filter(i => i !== sku)]) 
    }
    return (
        <div className={styles.productCard}>
            <input 
                className={`delete-checkbox ${styles.deleteCheckbox}`}
                checked={Boolean(selectedProducts.find(i => i === sku))}  
                type={'checkbox'} 
                onChange={handleCheck}
            />
            <img src={images[categoryId]}/>
            <div className={styles.imageOverlay}></div>

            <div className={styles.sku}>{sku}</div>

            <div className={styles.container}>
                <p>{name}</p>
                <p className={styles.price}>${price}</p>
                <p>{`${categories[categoryId]}: ${details}`}</p>
            </div>

        </div>
    )
}

export default ProductCard;