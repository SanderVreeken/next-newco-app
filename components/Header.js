import Anchor from './Anchor'
import Button from './Button'
import { useRouter } from 'next/router'
import { AiOutlinePieChart } from 'react-icons/ai'

import { useStateValue } from '../components/StateProvider'

import styles from '../styles/Header.module.css'

export default function Header() {
    const router = useRouter()
    const [{ user }, dispatch] = useStateValue()

    // Function to logout the user, whereafter the authorization token and the user in state is removed.
    const logoutUser = () => {
        localStorage.removeItem('AUTHORIZATION_TOKEN')
        dispatch({
            type: 'UPDATE_USER',
            item: null,
        })
        router.push('/login')
    }

    // Function to render the right side of the header component, which depends on whether the user is logged in.
    // Margin right is added to ensure equal spacing for the eye, as only the most right button has a border. 
    const renderHeaderRight = (user ) => {
        if (user) {
            return (
                <div className={styles.header__right}>
                    <Anchor child={<Button background='white' border='white' color='#666' hoverBackground='white' hoverBorder='white' hoverColor='#111' text='Add Product' type='button' />} href='/product/new' />
                    <div style={{
                        marginRight: '1rem'
                    }}>
                        <Button background='white' border='white' color='#666' hoverBackground='white' hoverBorder='white' hoverColor='#111' onClick={(event) => logoutUser(event)} text='Logout' type='button' />
                    </div>
                    <Anchor child={<Button background='#111' border='#111' color='white' hoverBackground='white' hoverBorder='#111' hoverColor='#111' text={user.username} type='button' />} href='/profile' /> 
                </div>
            )
        } else {
            return (
                <div className={styles.header__right}>
                    <div style={{
                        marginRight: '1rem'
                    }}>
                        <Anchor child={<Button background='white' border='white' color='#666' hoverBackground='white' hoverBorder='white' hoverColor='#111' text='Login' type='button' />} href='/login' />
                    </div>
                    <Anchor child={<Button background='#111' border='#111' color='white' hoverBackground='white' hoverBorder='#111' hoverColor='#111' text='Register' type='button' />} href='/register' /> 
                </div>
            )
        }
    }

    return (
        <header className={styles.header}>
            <div className={styles.header__icon}>
                <Anchor child={<AiOutlinePieChart />} href='/' />
            </div>
            {renderHeaderRight(user)}
        </header>
    )
}