import React, {useState, useRef} from "react";
import InputWithLabel from "../shared/InputWithLabel";


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
            <InputWithLabel 
            elementId="todoTitle"
            label="Todo" 
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
