import React, {useRef} from "react";

const TodoForm= ({ onAddTodo }) => {
const todoTitleInput = useRef('');

    const handleAddTodo = (event) => {
      event.preventDefault();
      
      const title = event.target.title.value;
      console.log("Adding todo:", title)
      onAddTodo(title);
      event.target.title.value = "";
      todoTitleInput.current.focus();
    }
    
    return (
        <form onSubmit= {handleAddTodo}>
            <input type="text" name="title" placeholder="Enter todo" ref={todoTitleInput} />
            <button type="submit">Add Todo</button>
        </form>
    )
}

export default TodoForm;
