import React, { useState } from 'react'
import Card from '../UI/Card';
import classes from './AddTask.module.css'
import Button from '../UI/Button';
import { BsSave,BsFillFilePlusFill,BsXLg } from "react-icons/bs";

const AddTask = (props) => {
    const [enterTask,setTask] = useState('');
    const addTaskHandler = (event) => {
        event.preventDefault();
        console.log(enterTask);
        props.onAddTask(enterTask);
        setTask('');
    };
    
    const taskChangeHandler = (event) => {
        setTask(event.target.value);
    };
    const editChangeHandler = (event) => {
        props.edited1({task:event.target.value, id:props.edited.id});
        
    };

    const saveTask = (editTask,id) => {
        console.log(editTask,id)
    
        let editedTaskList = props.taskList.map((element,index) => {
          if (id === element.id) {
            element.task = editTask;
          }
          return element
    
        })
        console.log(editedTaskList)
        props.setTaskList(editedTaskList);
        props.edited1({task:""})
    }

    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
        ...enteredExpenseData,
        id: Math.random().toString(),
        };
        props.onAddExpense(expenseData);
        
    };

    
    
    return(
        
        <div>
            
            <Card >
                <form onSubmit={addTaskHandler} >
                    <label htmlFor="task"  >Input Task</label>
                    
                    <input id='task' placeholder="What do you need to do?"  type ='text' value ={enterTask} onChange={taskChangeHandler} className={classes.form__input} required></input>
                    <Button type='submit' className={classes.button} ><BsFillFilePlusFill></BsFillFilePlusFill></Button>
                    
                </form>

                {/* <div>
                    <label htmlFor="task" >Edit Task</label>

                    <input id='taskEdit' placeholder="Edit task?"  type ='text' value ={props.edited.task} onChange={editChangeHandler} className={classes.form__input} ></input>

                    <Button className={classes.button} onClick={()=> {
                        saveTask(props.edited.task,props.edited.id) }}><BsSave></BsSave></Button>

                </div> */}

                

{/* 
                <div>
                    {!isEditing && (
                        <button onClick={startEditingHandler}></button>
                    )}
                    {isEditing && (
                        <div onCancel={stopEditingHandler}> 
                            <input id='taskEdit' placeholder="Edit task?"  type ='text' value ={props.edited.task} 
                            onChange={editChangeHandler} className={classes.form__input} onClick={startEditingHandler}></input>
                            <Button className={classes.button} onClick={()=> {
                            saveTask(props.edited.task,props.edited.id) 
                            }}>Save Task</Button>
                            
                        </div>
                    )}
                </div>
                 */}
               
            
            <div>
                <div className='new-expense'>
                    {props.isEditing && (
                        <div onSaveExpenseData={saveExpenseDataHandler}
                             >
                            <label htmlFor="task" >Edit Task</label>

                            <input id='taskEdit' placeholder="Edit task?"  type ='text' value ={props.edited.task} onChange={editChangeHandler} className={classes.form__input} ></input>

                            <Button className={classes.button} onClick={()=> {
                                saveTask(props.edited.task,props.edited.id) }}><BsSave></BsSave></Button>
                            <Button type="button" onClick={props.stopEditingHandler}><BsXLg></BsXLg></Button>
                            
                        </div>
                        

                    )}
                </div>

                   

            </div>

            </Card>
        </div>

    );
}
export default AddTask;