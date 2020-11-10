import moment from 'moment'
import useSWR from 'swr'
import { request } from 'graphql-request'

import Button from './Button'
import Line from './Line'

import styles from '../styles/Product.module.css'

const READ_PRODUCT_QUERY = /* GraphQL */ `
    query($_id: ID!) {
        readProduct(_id: $_id) {
            _id
            createdAt
            title
            description
            photo
            price {
                amount
                currency
            }
            published
            user {
                _id
                email
                username
            }
        }
    }
`

const productFetcher = (query, _id) => request('/api/products', query, { _id })

export default function Product({ _id }) {
    const { data, error } = useSWR([READ_PRODUCT_QUERY, _id], productFetcher)

    const handleCheckout = () => {
        console.log('Handle checkout!')
    }

    const renderProduct = (product) => {
        return (
            <div>
                <div className={styles.product__basic}>
                    <div className={styles.product__info}>
                        <div>
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                        </div>
                        <div>
                            <p>{`${product.user.username} · ${moment(product.createdAt).startOf('minutes').fromNow()}`}</p>
                        </div>
                    </div>
                    <div>
                        <div className={styles.product__image} style={{
                            backgroundImage: `url(${product.photo})`
                        }}></div>
                    </div>
                </div>
                <Line />
                <div className={styles.product__pricing}>
                    <h3>{`${product.price.amount} ${product.price.currency}`}</h3>
                    <Button background='#0076ff' border='#0076ff' color='white' hoverBackground='white' hoverBorder='#0076ff' hoverColor='#0076ff' onClick={() => handleCheckout()} text='Buy Now' type='button' />
                </div>
            </div>
        )
    }

    return (
        <div className={styles.product}>
            {data && renderProduct(data.readProduct)}
        </div>
    )
}