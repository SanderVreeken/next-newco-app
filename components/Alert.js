import { AiOutlineBell } from 'react-icons/ai'
import styles from '../styles/Alert.module.css'

export default function Alert({ error }) {
    return (
        <div className={styles.alert}>
            <AiOutlineBell />
            {<p>{error}</p>}
        </div>
    )
}