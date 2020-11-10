import ProductCard from '../components/ProductCard'

import styles from '../styles/Carousel.module.css'

export default function Carousel({ products }) {
    return (
        <div className={styles.carousel}>
            <h2 className={styles.carousel__title}>Newest Products</h2>
            <div className={styles.carousel__slider}>
                {products.map(product => <ProductCard product={product} />)}
            </div>
        </div>
    )
}