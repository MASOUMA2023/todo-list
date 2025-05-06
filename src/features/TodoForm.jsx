import React, {useState, useRef} from "react";
import InputWithLabel from "../shared/InputWithLabel";


const TodoForm= ({ onAddTodo }) => {
    const [workingTodo, setWorkingTodo]= useState("")
const inputRef = useRef(null);

const handleAddTodo = (event) => {
event.preventDefault();
    //   const title = event.target.title.value;
    //   console.log("Adding todo:", title)
      onAddTodo({title:workingTodo, isCompleted:false});
      setWorkingTodo("")
      inputRef.current.focus();
    }
    
    return (
        <form onSubmit= {handleAddTodo}>
            <InputWithLabel 
            elementId="todoTitle"
            label="Todo" 
            ref={inputRef} 
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
