import { request } from 'graphql-request'
import { useState } from 'react'
import { useRouter } from 'next/router'

import Error from '../components/Error'
import Form from '../components/Form'
import { useStateValue } from '../components/StateProvider'

import styles from '../styles/Register.module.css'

const INSERT_USER_QUERY = /* GraphQL */ `
    mutation($email: String!, $username: String!, $password: String!, $passwordConfirm: String!) {
        createUser(email: $email, username: $username, password: $password, passwordConfirm: $passwordConfirm) {
            _id
            email
            token
            username
        }
    }
`

const createUser = variables => {
    return request('/api/users', INSERT_USER_QUERY, variables)
}

export default function Register() {
    const router = useRouter()
    const [error, setError] = useState(null)
    const [, dispatch] = useStateValue()
    // Fields that will be rendered in the form.
    const fields = [{
        name: 'username',
        placeholder: 'username',
        type: 'text'
    }, {
        name: 'email',
        placeholder: 'you@domain.com',
        type: 'text'
    }, {
        name: 'password',
        placeholder: 'password',
        type: 'password'
    }, {
        name: 'password-confirm',
        placeholder: 'password',
        type: 'password'
    }]

    const registerUser = async (event) => {
        event.preventDefault()
        
        const username = event.target[0].value
        const email = event.target[1].value
        const password = event.target[2].value
        const passwordConfirm = event.target[3].value
        
        try {
            const data = await createUser({ email, username, password, passwordConfirm })
            console.log(data)
            dispatch({
                type: 'UPDATE_USER',
                item: {
                    _id: data.createUser._id,
                    email: data.createUser.email,
                    username: data.createUser.username
                },
            })
            localStorage.setItem('AUTHORIZATION_TOKEN', data.createUser.token)
            router.push('/')
        } catch(error) {
            setError(error.response.errors[0].message)
        }
    }

    return (
        <div className={styles.register}>
            <div className={styles.register__left}>

            </div>
            <div className={styles.register__right}>
                <h1 className={styles.register__title}>Register</h1>
                {error && <Error error={error} />}
                <Form onSubmit={registerUser} fields={fields} />
            </div>
        </div>
    )
}