import ProductCard from '../components/ProductCard'

import styles from '../styles/Carousel.module.css'
import Anchor from './Anchor'

export default function Carousel({ products }) {
    return (
        <div className={styles.carousel}>
            <h2 className={styles.carousel__title}>Newest Products</h2>
            <div className={styles.carousel__slider}>
                {products.map((product, index) => <Anchor child={<ProductCard product={product} />} href={`/product/${product._id}`} key={index} />)}
            </div>
        </div>
    )
}