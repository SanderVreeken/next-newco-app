import Button from './Button'

export default function Form({ onSubmit, fields }) {
    return (
        <form onSubmit={(event) => onSubmit(event)}>
            {fields.map((field, key) => <input key={key} placeholder={field.placeholder} type={field.type}></input>)}
            <Button background='#111' color='white' hoverBackground='white' hoverColor='#111' text='Register' type='submit' width='100%' />
        </form>
    )
}