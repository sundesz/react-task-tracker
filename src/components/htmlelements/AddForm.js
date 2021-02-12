import { useState } from 'react'
import Button from './Button'
import InputText from './InputText'
import InputCheckbox from './InputCheckbox'

const AddForm = ({onAdd}) => {

    const [title, setTitle] = useState('')
    const [day, setDay] = useState('')
    const [remainder, setRemainder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!title) {
            alert('Please add title')
            return
        }

        if (!day) {
            alert('Please add day and time')
            return
        }

        onAdd({ title, day, remainder })

        setTitle('')
        setDay('')
        setRemainder(false)
    }

    return(
        <div className='card bg-light border-info mb-5'>
            <div className='card-body'>

                <form onSubmit={onSubmit}>

                    <InputText
                        id="title"
                        label="Title :"
                        value={title}
                        setValue={setTitle}
                    />

                    <InputText
                        id="day_time"
                        label="Day & time :"
                        value={day}
                        setValue={setDay}
                    />

                    <InputCheckbox
                        id="remainder"
                        label="Remainder :"
                        value={remainder}
                        setValue={setRemainder}
                    />

                    <Button btnType="submit" btnName="Save task" btnClass="btn btn-success btn-block" />

                </form>

            </div>
        </div>
    )
}

export default AddForm