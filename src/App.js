import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { fetchTasks } from './reducer'
import { useStateValue } from './StateProvider';

// components
import AddTask from './components/AddTask';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import About from './components/pages/About';
import Terms from './components/pages/Terms';
import Support from './components/pages/Support';

// styles
import './App.css';

// npm i json-server

function App() {

  const [{tasks, showTaskForm}, dispatch] = useStateValue()

  useEffect(() => {
    const getTasks = async() => {
      const getTasksFromServer = await fetchTasks()
      dispatch({
        type: 'TASK_INIT',
        tasks: getTasksFromServer
      })
    }

    getTasks()
  }, [])




  return (
    <Router>
      <div className="container">
      <Header />
        <Route path="/about">
          <About />
        </Route>

        <Route path="/terms">
          <Terms />
        </Route>

        <Route path="/support">
          <Support />
        </Route>

        <Route path="/" exact>
          { showTaskForm && <AddTask /> }

          {
            tasks.length
            ?
            <Tasks />
            :
            <h1 style={{textAlign: 'center'}} className="mb-3 mt-3">No Task</h1>
          }
        </Route>

        <Footer />

      </div>
    </Router>
  );
}

export default App;
