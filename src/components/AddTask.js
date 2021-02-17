import { useState } from "react"
import { useStateValue } from "../StateProvider"

const AddTask = () => {

    const [ {tasks, updateTask, updateTaskDetail}, dispatch ] = useStateValue()

    const [title, setTitle] = useState(updateTask ? updateTaskDetail.title : '')
    const [day, setDay] = useState(updateTask ? updateTaskDetail.day : '')
    const [remainder, setRemainder] = useState(updateTask ? updateTaskDetail.remainder : false)

    const formSubmit = (e) => {
        e.preventDefault()

        if (title === '') {
            alert('Please add Title')
            return
        }

        if (day === '') {
            alert('Please add Day & Time')
            return
        }

        const id = tasks.length ? tasks.length + 1 : 0

        updateTask
        ?
        dispatch({
            type: 'TASK_UPDATE',
            task: {...updateTaskDetail, title: title, day: day, remainder: remainder}
        })
        :
        dispatch({
            type: 'TASK_ADD',
            task: {id, title, day, remainder}
        })

        setTitle('')
        setDay('')
        setRemainder(false)
    }

    return (
        <form
            onSubmit={(e) => formSubmit(e)}
            className="mb-3 mt-3"
            style={{border: '1px solid', padding: '10px', borderRadius: '5px'}}
        >
            <div className="form-group row">
                <label htmlFor="title" className="col-sm-2 col-form-label">Title :</label>
                <div className="col-sm-10">
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value) }
                />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="day" className="col-sm-2 col-form-label">Day & Time :</label>
                <div className="col-sm-10">
                <input
                    type="text"
                    className="form-control"
                    id="day"
                    value={day}
                    onChange={(e) => setDay(e.target.value) }
                />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="remainder" className="col-sm-2 col-form-label">Remainder :</label>
                <div className="col-sm-10">
                <input
                    type="checkbox"
                    className="form-control"
                    id="remainder"
                    checked={remainder}
                    value={remainder}
                    onChange={(e) => setRemainder(e.currentTarget.checked) }
                />
                </div>
            </div>
            <button className="btn btn-success btn-block">{updateTask ? 'Update Task' : 'Save Task'}</button>

        </form>
    )
}

export default AddTask