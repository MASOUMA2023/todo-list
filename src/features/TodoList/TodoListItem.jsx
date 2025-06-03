import React, {useState, useEffect} from "react";
import InputWithLabel from "../../shared/InputWithLabel";
import styles from './TodoListItem.module.css'


function TodoListItem({todo, onCompleteTodo, onUpdateTodo}){
    const [isEditing, setIsEditing] = useState(false)
    const [workingTitle, setWorkingTitle]= useState(todo.title)

    useEffect(() => {
        setWorkingTitle(todo.title);
      }, [todo]);

    const handleEdit=(e)=>{
setWorkingTitle(e.target.value)
    }
const handleCancel =()=>{
    setWorkingTitle(todo.title)
    setIsEditing(false)
}
    const handleUpdate = (e)=>{
     e.preventDefault();
     if (!isEditing || workingTitle.trim() ==="" || workingTitle ===todo.title ) return;
     onUpdateTodo({...todo, title:workingTitle})
     setIsEditing(false)
    }
    
    return(
        <li className={styles.todoListItem}>
          {isEditing ? (
            <form onSubmit={handleUpdate}>
            < InputWithLabel
            elementId ={ `editTodo-${todo.id}`}
            label = "Edit Todo"
            value ={ workingTitle}
            onChange={handleEdit}

            />
            <button type= "submit" >Save</button>
            <button type= "button" onClick={handleCancel}>Cancel</button>
            </form>
              ):(
                <>
                <label htmlFor={`checkbox-${todo.id}`}>
            <input
            type= "checkbox" id={`checkbox-${todo.id}`} checked={todo.isCompleted} onChange={()=> onCompleteTodo(todo.id)}
            />
            </label>
            <span onClick={()=> setIsEditing(true)} style = {{cursor:"pointer"}}>{todo.title || "Untitled Todo"}</span>
            </>
            )}
            </li>
       )}
            
        

export default TodoListItem;