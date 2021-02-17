import React, { useState } from 'react'
import {FaTimes} from 'react-icons/fa'
import { useStateValue } from '../StateProvider'

const Task = ({task}) => {

    const [{tasks}, dispatch] = useStateValue()
    const [ remainder, setRemainder] = useState(false)

    const onDelete = () => {
        dispatch({
            type: 'TASK_DELETE',
            id: task.id
        })
    }

    const onRemainder = (e) => {
        setRemainder(e.currentTarget.value)

        dispatch({
            type: 'TASK_REMAINDER',
            id: task.id
        })
    }

    const onUpdate = () => {
        dispatch({
            type: 'TASK_EDIT',
            task: task
        })
    }

    return (
        <div className="card mb-3 mt-3">
            <div className={`task card-body `}>

                <div className={`task__column column__1 ${task.remainder ? 'task-remainder' : ''}`}>
                    <input
                        type="checkbox"
                        checked={task.remainder}
                        value={task.remainder}
                        onChange={(e) => onRemainder(e) }
                    />
                </div>

                <div className="task__column column__2" onClick={onUpdate}>
                    <h4>{task.title}</h4>
                    <p>{task.day}</p>
                </div>

                <div className="task__column column__3">
                    <FaTimes
                        className="task__delete"
                        onClick={onDelete}
                    />
                </div>
            </div>
        </div>
    )
}

export default Task