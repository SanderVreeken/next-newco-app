import styles from '../styles/ProductCard.module.css'

export default function ProductCard({ product }) {
    return (
        <div className={styles.productCard}>
            <div className={styles.productCard__image}></div>
            <div>
                <h4>{product.title}</h4>
                <p>{product.description}</p>
            </div>
        </div>
    )
}