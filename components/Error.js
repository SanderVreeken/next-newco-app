import { AiOutlineBell } from 'react-icons/ai'
import styles from '../styles/Error.module.css'

export default function Error({ error }) {
    return (
        <div className={styles.error}>
            <AiOutlineBell />
            {<p>{error}</p>}
        </div>
    )
}