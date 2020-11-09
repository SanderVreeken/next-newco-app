import Anchor from './Anchor'
import Button from './Button'
import { useStateValue } from '../components/StateProvider'

import styles from '../styles/Header.module.css'

export default function Header() {
    const [{ user }, dispatch] = useStateValue()

    // Function to logout the user, whereafter the authorization token and the user in state is removed.
    const logoutUser = () => {
        localStorage.removeItem('AUTHORIZATION_TOKEN')
        dispatch({
            type: 'UPDATE_USER',
            item: null,
        })
    }

    // Function to render the right side of the header component, which depends on whether the user is logged in.
    const renderHeaderRight = (user ) => {
        if (user) {
            return (
                <div>
                    <Button background='white' border='white' color='#666' hoverBackground='white' hoverBorder='white' hoverColor='#111' onClick={(event) => logoutUser(event)} text='Logout' type='button' />
                    <Anchor child={<Button background='#0076ff' border='#0076ff' color='white' hoverBackground='white' hoverBorder='#0076ff' hoverColor='#0076ff' text={user.username} type='button' />} href='/profile' /> 
                </div>
            )
        } else {
            return (
                <div>
                    <Anchor child={<Button background='white' border='white' color='#666' hoverBackground='white' hoverBorder='white' hoverColor='#111' text='Login' type='button' />} href='/login' />
                    <Anchor child={<Button background='#0076ff' border='#0076ff' color='white' hoverBackground='white' hoverBorder='#0076ff' hoverColor='#0076ff' text='Register' type='button' />} href='/register' /> 
                </div>
            )
        }
    }

    return (
        <header className={styles.header}>
            <div></div>
            {renderHeaderRight(user)}
        </header>
    )
}