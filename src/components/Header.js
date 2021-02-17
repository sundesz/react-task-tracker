import { useStateValue } from "../StateProvider"
import { Link, useLocation } from 'react-router-dom'

const Header = () => {

    const location = useLocation()
    const[{showTaskForm}, dispatch] = useStateValue()

    const onToggle = () => {
        dispatch({
            type: 'TOGGLE_TASK_FORM'
        })
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <Link to="/"><h2>Task tracker</h2></Link>
            {
                location.pathname === '/' &&
                <button
                    type="button"
                    className={`btn btn-outline-${showTaskForm ? 'danger' : 'success'} my-2 my-sm-0`}
                    onClick={onToggle}
                >
                        { showTaskForm ? 'Close form' : 'Add task' }
                </button>
            }
        </nav>
    )
}

export default Header