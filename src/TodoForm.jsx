import React, {useState, useRef} from "react";



const TodoForm= ({ onAddTodo }) => {
    const [workingTodo, setWorkingTodo]= useState("")
const todoTitleInput = useRef('');
const handleAddTodo = (event) => {

      event.preventDefault();
    //   const title = event.target.title.value;
    //   console.log("Adding todo:", title)
      onAddTodo(workingTodo);
      setWorkingTodo("")
      todoTitleInput.current.focus();
    }
    
    return (
        <form onSubmit= {handleAddTodo}>
            <input 
            type="text" 
            name="title" 
            placeholder="Enter todo" 
            ref={todoTitleInput} 
            value= {workingTodo} 
            onChange={(e) => setWorkingTodo(e.target.value)}/>
                <button 
            type="submit" disabled= {workingTodo.trim()===""}>
                Add Todo
                </button>
        </form>
    )
}

export default TodoForm;
