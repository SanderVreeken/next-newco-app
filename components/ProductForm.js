import Line from './Line'
import styles from '../styles/ProductForm.module.css'

import { capitalizeFirstLetter } from '../utils/helpers'
 
export default function ProductForm({ basicFields, onChange }) {
    return (
        <form className={styles.productForm}>
            <h2>Product Information</h2>
            {basicFields.map(field => (
                <div className={styles.productForm__field}>
                    <label>{capitalizeFirstLetter(field.name)}</label>
                    <input name={field.name} onChange={(event) => onChange(event)}></input>
                </div>
            ))}
            <Line />
        </form>
    )
}