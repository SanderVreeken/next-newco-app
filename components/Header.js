import Anchor from './Anchor'
import Button from './Button'

export default function Header() {
    return (
        <header>
            <div>

            </div>
            <div>
                <Anchor child={<Button background='#0076ff' border='#0076ff' color='white' hoverBackground='white' hoverColor='#0076ff' text='Register' type='button' />} href='/register' />  
            </div>
        </header>
    )
}