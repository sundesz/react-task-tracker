import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/htmlelements/Header'
import Footer from './components/htmlelements/Footer'
import About from './components/pages/About'
import Index from './components/pages/Index'

function App() {

  const [taskFormValue, setTaskFormValue] = useState(false)
  const [tasks, setTasks] = useState([])


  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer.sort((a, b) => (a.id < b.id) ? 1 : -1))
    }

    getTasks()
  }, [])


  // Get Server address
    const getAddress = (id = null) => {
      const defaultAddress = 'http://localhost:5000/tasks'

      return (id === null) ? defaultAddress : `${defaultAddress}/${id}`;
    }


  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(getAddress())
    const data = await res.json()

    return data
  }

  // Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(getAddress(id))
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    // const maxIdValue = tasks.length ? tasks
    //   .map((task) => task.id)
    //   .reduce((a, b) => Math.max(a, b)) : 0
    // const id = maxIdValue + 1
    // const newTask = {id, ...task}
    // setTasks([newTask, ...tasks])


    const res = await fetch(getAddress(), {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([data, ...tasks])
  }


  // Delete Task
  const deleteTask = async (id) => {

    await fetch(getAddress(id), {method: 'DELETE'})
    setTasks(tasks.filter((task) => task.id !== id ))
  }


  // Task remainder
  const taskRemainder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, remainder: !taskToToggle.remainder}

    const res = await fetch(getAddress(id), {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
    const data = await res.json()

    setTasks(tasks.map((task) => (task.id === id ? { ...task, remainder: data.remainder} : task)))
  }


  // Set task from value
  const toggleTaskForm = () => {
    setTaskFormValue(!taskFormValue)
  }

  return (
    <Router>
      <div className="container">

        <Header formValue={taskFormValue} onClick={toggleTaskForm} />


        <Route path="/" exact render={(props) => (

          <Index
            tasks={tasks}
            taskFormValue={taskFormValue}
            addTask={addTask}
            deleteTask = {deleteTask}
            taskRemainder = {taskRemainder}
          />
        )} />


        <Route path="/about" component={About} />

        <Footer />

      </div>
    </Router>
  );
}

export default App;
