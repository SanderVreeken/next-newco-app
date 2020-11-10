import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

import Header from '../../components/Header'
import Product from '../../components/Product'

import styles from '../../styles/ProductPage.module.css'

export default function ProductPage() {
    const router = useRouter()
    const [param, setParam] = useState(null)

    useEffect(() => {
        setParam(router.query._id)
    }) 

    return (
        <div className={styles.productPage}>
            <Header />
            {param && <Product _id={param} />}
        </div>
    )
}