import React from 'react'
import Task from './Task'

const Tasks = ({tasks, onDelete, onRemainder}) => {
    return(
        <>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onRemainder={onRemainder} />
            ))}
        </>
    )
}

export default Tasks