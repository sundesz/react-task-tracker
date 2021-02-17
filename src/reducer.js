export const initialState = {
    showTaskForm: false,
    updateTask: false,
    updateTaskDetail: {},
    tasks : []
}

export const getServerAddress = (id = null) => (
    `http://localhost:5000/tasks/${id === null ? '' : id}`
)



// Fetch tasks
export const fetchTasks = async() => {
    let data
    try {
        const res = await fetch(getServerAddress())
        data = await res.json()
    } catch(err) {
        data = {}
    }

    return data
}

//Fetch task
const fetchTask = async(id) => {
    const res = await fetch(getServerAddress(id))
    const data = await res.json()

    return data
}

// update task
const updateTask = async(task) => {
    const res = await fetch(getServerAddress(task.id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    const data = await res.json()

    return data
}

// add task
const addTaskToServer = async(task) => {
    const res = await fetch(getServerAddress(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })

    const data = await res.json()
    return data
}

// delete task
const deleteTaskFromServer = async(id) => {
    await fetch(getServerAddress(id), {
        method: 'DELETE'
    })
}


const reducer = (state, action) => {
    switch(action.type) {

        case 'TASK_INIT':
            return {
                ...state,
                tasks: action.tasks
            }

        case 'TASK_ADD':

            const add = async() => {
                await addTaskToServer(action.task)
            }

            add()

            return {
                ...state,
                tasks: [action.task, ...state.tasks]
            }

        case 'TASK_EDIT':

            return {
                ...state,
                showTaskForm: true,
                updateTask: true,
                updateTaskDetail: action.task
            }

        case 'TASK_UPDATE':

            updateTask(action.task)

            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.task.id ? {...action.task} : task),
                showTaskForm: false,
                updateTask: false,
                updateTaskDetail: {}
            }

        case 'TASK_DELETE':

            const del = async(action) => {
                await deleteTaskFromServer(action.id)
            }

            del(action)

            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.id)
            }

        case 'TASK_REMAINDER':

            const data = state.tasks.find(task => task.id === action.id)
            updateTask({...data, remainder: !data.remainder})

            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.id ? {...task, remainder: !task.remainder} : task)
            }

        case 'TOGGLE_TASK_FORM':
            return {
                ...state,
                showTaskForm: !state.showTaskForm,
                updateTask: false
            }

        default:
            return state
    }
}

export default reducer