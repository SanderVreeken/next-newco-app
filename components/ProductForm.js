import Line from './Line'

import styles from '../styles/ProductForm.module.css'

import { capitalizeFirstLetter } from '../utils/helpers'
 
export default function ProductForm({ basicFields, data, onFieldChange, onPhotoChange }) {
    return (
        <form className={styles.productForm}>
            <h2>Product Information</h2>
            <div className={styles.productForm__basic}>
                <div className={styles.productForm__mainFields}>
                    {basicFields.map((field, index) => (
                        <div className={styles.productForm__field} key={index}>
                            <label>{capitalizeFirstLetter(field.name)}</label>
                            <input name={field.name} onChange={(event) => onFieldChange(event, false)} type={field.type}></input>
                        </div>
                    ))}
                </div>
                <div>
                    <div className={styles.productForm__image} style={{
                        backgroundImage: data.photo && `url(${data.photo})`,
                        border: data.photo && '0',
                    }}></div>
                </div>
            </div>
            <div className={styles.productForm__field}>
                <label>Photo</label>
                <input name='photo' onChange={(event) => onPhotoChange(event)} type='file'></input>
            </div>
            <Line />
            <div className={styles.productForm__field}>
                <label>Price</label>
                <div className={styles.productForm__price}>
                    <select className={styles.productForm__dropdown} name='currency' onChange={(event) => onFieldChange(event, false)}>
                        <option value='USD'>USD</option>
                        <option value='EUR'>EUR</option>
                    </select>
                    <input name='amount' onChange={(event) => onFieldChange(event, true)} type='number'></input>
                </div>
            </div>
        </form>
    )
}