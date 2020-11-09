import Link from 'next/link'
import { request } from 'graphql-request'
import { useState } from 'react'
import { useRouter } from 'next/router'

import Alert from '../components/Alert'
import AuthForm from '../components/AuthForm'
import { useStateValue } from '../components/StateProvider'

import styles from '../styles/Login.module.css'

const VALIDATE_USER_QUERY = /* GraphQL */ `
    query($username: String!, $password: String!) {
        validateUser(username: $username, password: $password) {
            _id
            email
            token
            username
        }
    }
`

const validateUser = variables => {
    return request('/api/users', VALIDATE_USER_QUERY, variables)
}

export default function Login() {
    const router = useRouter()
    const [error, setError] = useState(null)
    const [, dispatch] = useStateValue()
    // Fields that will be rendered in the form.
    const fields = [{
        name: 'username',
        placeholder: 'username',
        type: 'text'
    }, {
        name: 'password',
        placeholder: 'password',
        type: 'password'
    }]

    const loginUser = async (event) => {
        event.preventDefault()

        const username = event.target[0].value
        const password = event.target[1].value

        try {
            const data = await validateUser({ username, password })
            dispatch({
                type: 'UPDATE_USER',
                item: {
                    _id: data.validateUser._id,
                    email: data.validateUser.email,
                    username: data.validateUser.username
                },
            })
            localStorage.setItem('AUTHORIZATION_TOKEN', data.validateUser.token)
            router.push('/')
        } catch(error) {
            setError(error.response.errors[0].message)
        }
    }

    return (
        <div className={styles.login}>
            <div className={styles.login__left}>

            </div>
            <div className={styles.login__right}>
                <h1 className={styles.login__title}>Login</h1>
                {error && <Alert error={error} />}
                <AuthForm buttonText='Login' fields={fields} onSubmit={loginUser} />
                <p className={styles.login__register}>If you are new, <Link href='/register'>click here</Link> to register.</p>
            </div>
        </div>
    )
}