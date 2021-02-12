import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/htmlelements/Header'
import Footer from './components/htmlelements/Footer'
import Tasks from './components/Tasks'
import AddForm from './components/htmlelements/AddForm'
import About from './components/pages/About'


function App() {

  const [taskForm, setTaskForm] = useState(false)
  const [tasks, setTasks] = useState([])
    // const [tasks, setTasks] = useState(
  //   [
  //     {
  //       "id": 1,
  //       "title": "Task 1",
  //       "day": "Friday",
  //       "remainder": false,
  //     },
  //     {
  //       "id": 2,
  //       "title": "Task 2",
  //       "day": "Saturday",
  //       "remainder": true,
  //     }
  //   ]
  // )

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])


  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }


  // Task delete
  const taskDelete = async (id) => {
    // console.log('delete', id)
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE',})

    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Task remainder
  const taskRemainder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, remainder: !taskToToggle.remainder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => (task.id === id ? {...task, remainder: data.remainder} : task)))
    // console.log(tasks)
  }

  // Add task
  const addTask = async (task) => {
    // console.log(task)

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([data, ...tasks])
  }

  // Toggle task form
  const toggleTaskForm = () => {
    setTaskForm(!taskForm)
    // console.log(taskForm)
  }


  return (
    <Router>
      <div className="container">
        <Header onClick={toggleTaskForm} formValue={taskForm} />



        <Route path="/" exact render={(props) => (
          <>
            {taskForm ? <AddForm onAdd={addTask} /> : ''}

            { tasks.length ? <Tasks tasks={tasks} onDelete={taskDelete} onRemainder={taskRemainder} /> :
            <h1 style={{textAlign: 'center'}}> No Task </h1>
            }
          </>
        )} />
        <Route path="/about" component={About} />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
