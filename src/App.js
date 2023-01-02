import './App.css';
import { Fragment, useEffect, useState } from 'react';
import AddTask from './Users/AddTask';
import UserList from './Users/UserList';
import ListDone from './Users/ListDone'
// import Button from './UI/Button';
import Button from 'react-bootstrap/Button';

// import classes from './UI/Button.module.css'
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>
function App() {
  const [editedList,setEditedList] = useState('')
  const [taskList,setTaskList] = useState([]);
  const [taskListDone,setTaskListDone] = useState([]);
  const [searchTerm,setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // const [order,setOrder] = useState('ASC');
  const addTaskHandler =(mtask) => {
    setTaskList((prevTask) => {
      return [
        ...prevTask,
        {task:mtask,id:Math.random().toString()}
      ]
    })
    // const newTodos = [...taskList, { task:mtask,id:Math.random().toString() }];
    // setTaskList(newTodos);
  };

  useEffect(() => {
    const getTodo = JSON.parse(localStorage.getItem('todo'))

    if(getTodo) {
      setTaskList(getTodo)
    }
  },[])

  
  useEffect(() => {
    const getDone = JSON.parse(localStorage.getItem('donetask'))
    // console.log(getDone)
    if(getDone) {
      setTaskListDone(getDone)
    }
  },[])

  useEffect(() => {
    localStorage.setItem('donetask',JSON.stringify(taskListDone))
  },[taskListDone])


  useEffect(() => {
    console.log(taskList)
    localStorage.setItem('todo',JSON.stringify(taskList))
  },[taskList])
  // useEffect (() => {
  //   sorting();
  // },[order])  
  const deleteLocal = () => {
    window.localStorage.removeItem('donetask'); 
    setTaskListDone([]);
  }

  const deleteTaskHandler = (index) => {
    const newToDo = [...taskList];
    // console.log(newToDo)
    const deletedTodo = newToDo[index] 
    const newDoneTaskArray = [...taskListDone,deletedTodo]
    setTaskListDone(newDoneTaskArray)
    newToDo.splice(index,1);
    setTaskList(newToDo);
    return newToDo;
  }
  const editTaskHandler = (index) => {
    let newEditItem = taskList.find((ele,index1) => {
      return index1 === index
    });
    // console.log(newEditItem);
    setEditedList(newEditItem);
  };
  const sorting = (order) => {
    if(order === 'ASC') { 
      const sort = [...taskList].sort((a, b)=> a['task'].toLowerCase() > b['task'].toLowerCase() ? 1 : -1);
      setTaskList(sort);
      console.log(sort)
    }else{
      const sort = [...taskList].sort((a, b)=> a['task'].toLowerCase() > b['task'].toLowerCase() ? -1 : 1);
      setTaskList(sort);
      console.log(sort)
    }

    
  };
  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
      setIsEditing(false);
  };
  return (
    
    
    <Fragment>
      <section className='container'>
        <div className="heading">
          <img className="heading__img" src="https://freesvg.org/img/publicdomainq-business-man-working.png" alt='hello'></img>
          
          <h1 className="heading__title">To-Do List</h1>
        </div>
        
        <div>
          <AddTask isEditing={isEditing} startEditingHandler={startEditingHandler} stopEditingHandler={stopEditingHandler} onAddTask={addTaskHandler} edited={editedList} edited1={setEditedList}  setTaskList={setTaskList} taskList={taskList}></AddTask>
          <label id = 'text'className="form__label" htmlFor="todo" >~ Today I need to ~</label>
          {/* <Button onClick={() => sorting()}>Sorting</Button> */}


            <div >
              {/* <b class='text'>Search   </b> */}
              <input id ='search1'type='text' placeholder='search' onChange={event => {setSearchTerm(event.target.value);
              }}></input>   
            </div>

         




          {/* <b>Search</b>
          <input id ='search'type='text' placeholder='search' onChange={event => {setSearchTerm(event.target.value);
          }}></input> */}
          {/* <div> <Button onClick={() => sorting()} className={classes.button} >Sorting(ASC)</Button> </div> */}


            <select onChange={(e) => {const selectSort = e.target.value; sorting(selectSort)} }>
              <option value = 'ASC'>Sorting(ASC)</option>
              <option value= 'DSC'>Sorting(DSC)</option>
            </select>
            <div id='wrap'>
              <div id='first' >
                <b id='test1'>Todo List</b>

                <UserList  users={taskList.filter((val) =>{
                  
                  if(searchTerm === ''){
                    return true
                  }else if(val.task.includes(searchTerm.toLowerCase())){
                    return true
                    
                  }else{
                    return false
                  }
                
                })} isEditing={isEditing} startEditingHandler={startEditingHandler} stopEditingHandler={stopEditingHandler}  onDeleteTask ={deleteTaskHandler}  onUpdateTask = {editTaskHandler} onSorting = {sorting} ></UserList>
                
              </div>
              <div id='first'> 
                <b id='test1'>Task Done</b>
                <ListDone id = 'narrow' users={taskListDone} ></ListDone>
                <Button onClick={deleteLocal}>Clear task</Button>
              </div>
            </div>
            
            
        </div>
          
        
      </section>    
    </Fragment>
  );
}

export default App;
