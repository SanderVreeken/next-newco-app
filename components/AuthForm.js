import Button from './Button'

import styles from '../styles/AuthForm.module.css'

export default function AuthForm({ buttonText, onSubmit, fields }) {
    return (
        <form className={styles.authForm} onSubmit={(event) => onSubmit(event)}>
            {fields.map((field, key) => <input key={key} placeholder={field.placeholder} type={field.type}></input>)}
            <Button background='#111' color='white' hoverBackground='white' hoverColor='#111' text={buttonText} type='submit' width='100%' />
        </form>
    )
}