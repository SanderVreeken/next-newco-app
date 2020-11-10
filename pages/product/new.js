import jwtDecode from 'jwt-decode'
import { request } from 'graphql-request'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Header from '../../components/Header'
import ProductForm from '../../components/ProductForm'
import { useStateValue } from '../../components/StateProvider'

import styles from '../../styles/New.module.css'
import Button from '../../components/Button'

const INSERT_PRODUCT_QUERY = /* GraphQL */ `
    mutation($title: String!, $description: String!, $published: Boolean!, $username: String!) {
        createProduct(title: $title, description: $description, published: $published, username: $username) {
            _id
            title
            description
            published
            user {
                _id
                email
                username
            }
        }
    }
`

const createProduct = variables => {
    return request('/api/products', INSERT_PRODUCT_QUERY, variables)
}

export default function New() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    })
    const [isLoading, setIsLoading] = useState(true)
    const [{ user }, dispatch] = useStateValue()
    const basicFields = [{
        name: 'title'
    }, {
        name: 'description'
    }]

    // The hook is used to check whether the user is logged in and will redirect otherwisw before rendering most of the page.
    useEffect(() => {
        if (localStorage.getItem('AUTHORIZATION_TOKEN')) {
            const token = jwtDecode(localStorage.getItem('AUTHORIZATION_TOKEN'))
            if (token.exp * 1000 < Date.now()) {
                localStorage.removeItem('AUTHORIZATION_TOKEN')
                router.push('/login')
            } else {
                dispatch({
                    type: 'UPDATE_USER',
                    item: token,
                })
                setIsLoading(false)
            }
        } else {
            router.push('/login')
        }
    }, [])

    const handleFormData = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const registerProduct = async (publishBool) => {
        const title = formData.title
        const description = formData.description
        const published = publishBool
        const username = user.username

        try {
            const data = await createProduct({ title, description, published, username })
            console.log(data)
            router.push('/')
        } catch(error) {
            console.log(error)
        }
    }

    // Function that is used to render the elements when the user is logged in.
    const renderAuthElements = () => {
        return (
            <div className={styles.new__authElements}>
                <div className={styles.new__productHeader}>
                    <div></div>
                    <div className={styles.new__productHeaderButtons}>
                        <div style={{
                            marginRight: '0.8rem'
                        }}>
                            <Button background='white' border='white' color='#666' hoverBackground='white' hoverBorder='white' hoverColor='#111' onClick={() => registerProduct(false)} text='Save Product' type='button' />
                        </div>
                        <Button background='#0076ff' border='#0076ff' color='white' hoverBackground='white' hoverBorder='#0076ff' hoverColor='#0076ff' onClick={() => registerProduct(true)} text='Save & Publish' type='button' />
                    </div>
                </div>
                <ProductForm basicFields={basicFields} onChange={handleFormData} />
            </div>
        )
    }

    return (
        <div className={styles.new}>
            <Header />    
            {!isLoading && renderAuthElements()}
        </div>
    )
}