import { useStateValue } from "../StateProvider"
import Task from "./Task"


const Tasks = () => {

    const [{tasks}, dispatch] = useStateValue()

    return (
        <div className="tasks">
            { tasks.map((task) =>
                (<Task key={task.id} task={task} />)
            )}
        </div>
    )
}

export default Tasks