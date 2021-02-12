import AddForm from '../htmlelements/AddForm'
import Tasks from '../Tasks'

const Index = ({tasks, taskFormValue, addTask, deleteTask, taskRemainder}) => {
    return (
        <>
            { taskFormValue ? <AddForm onAdd={addTask} /> : '' }

            {
            tasks.length ?
            <Tasks tasks={tasks} onDelete={deleteTask} onRemainder={taskRemainder} />
            : <h1 style={{textAlign:'center'}}>No Task</h1>
            }
        </>
    )
}

export default Index