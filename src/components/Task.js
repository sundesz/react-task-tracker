// npm i react-icons
import { FaTimes } from 'react-icons/fa'

const Task = ({task, onDelete, onRemainder}) => {
    return(
        <div
        style={{cursor: 'pointer'}}
        className={`card mb-3 ${task.remainder ? 'bg-info text-white' : 'bg-light'}`}
        onDoubleClick={() => onRemainder(task.id)}
        >
            <div className="card-body">
                <h5 className="card-title" style={{ textTransform: 'capitalize' }}>
                    { task.title }
                    <FaTimes
                    onClick={() => onDelete(task.id)}
                    style={{color: 'red', float: 'right', cursor: 'pointer'}} />
                </h5>
                <p className="card-text">{ task.day }</p>
            </div>
        </div>
    )
}

export default Task