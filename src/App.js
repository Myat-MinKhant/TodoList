import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([
    { "id": 1, "title": "Task 1", "status": false},
    { "id": 2, "title": "Task 2", "status": false}
  ]);

  // Temp State
  const [newTask, setNewTask] = useState('');
  const cursor = useRef();
  const edit = useRef();
  const [active, setActive] = useState(false);
  const [updateData, setUpdateData] = useState({
    text: '',
    id: null
  });

  // Add task
  const addTask = () => {
    if (newTask !== ""){
      let newTasks = [...toDo, {id: toDo.length + 1, title: newTask, status: false}]
      setToDo(newTasks)
      setNewTask("");
    } else {
      cursor.current.focus();
    }
  }
  
  // Delete task
  const deleteTask = (id) => {
    
    let newTasks = toDo.filter(task => task.id !== id)
  
    setToDo(newTasks)
  }
  
  // Mark task as done
  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return ({...task, status: !task.status})
      }
      return task
    })
    setToDo(newTask)
  }

  // Cancel update
  const cancelUpdate = () => {
    setActive(false);
    setUpdateData('');
  }

  // change task for update
  const changeTask = (value) => {
    setActive(current => !current)
    setUpdateData({
      text: value.title,
      id: value.id
    })
    edit.current.focus();
  }

  // Update task

  const updateTask = () => {
    let newToDo = toDo.map((task) => {
      if (task.id === updateData.id) {
        return {...task, title: updateData.text}
      }
      return task
    })
    setToDo(newToDo)
    setUpdateData({
      text: '',
      id: null
    })
    setActive(false);
  };

  return (
   <div className="container App">

    <br /><br />
    <h2>To Do List (ReactJS)</h2>
    <br /><br />

    {/* Update task */}
      <div className={active ? 'active' : 'text disable'}>
        <div className='row align-items-center update'>
            <div className='col-8'>
            <input type="text" value={updateData.text} ref={edit} placeholder="Enter new task..." onChange = {e => setUpdateData({
              ...updateData,
              text: e.target.value
            })}/>
            </div>
            <div className='col-2'>
              <button type="submit" onClick={() => updateTask()}>Update</button>
            </div>
            <div className='col-2'>
              <button type="submit" onClick={cancelUpdate} style={{backgroundColor: '#ffd966'}}>Cancel</button>
            </div>
        </div>
      </div>

    {/* Input task  */}
      <div className={active ? 'text disable' : 'active'}>
        <div className='row align-items-center input'>
            <div className='col-10'>
              <input type="text" value={newTask} ref={cursor} placeholder="Enter new task..." onChange={e => setNewTask(e.target.value)}/>
            </div>
            <div className='col-2'>
              <button type="submit" onClick={addTask}>Add Task</button>
            </div>
        </div>
      </div>

    {/* Display ToDo  */}

    { toDo && toDo.length ? '' : 'No Tasks...'}

    { toDo && toDo
      .map((task, index) => {
        return (
          
          <div key={index.id}>
            
            <div className='col taskBg'>
              
              <div className={task.status ? 'done' : ''}>
                <span className='taskNumber'>{index + 1}</span>
                <span className='taskText'>{task.title}</span>
              </div>

              <div className={active ? 'disable' : ''}>
                
                <div className="iconWrap">
                  <span onClick={() => markDone(task.id)}>
                    <FontAwesomeIcon icon={faCircleCheck}  />
                  </span>

                  {task.status ? null : (
                  <span onClick={() => changeTask(task)}>
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                  )}
                  
                  <span onClick={() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashCan}  />
                  </span>
                </div>
              
              </div>
            
            </div>
          
          </div>
        )
      })
    }

   </div>
  )
}

export default App;
