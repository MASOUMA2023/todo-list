import React, {useState} from "react";
import InputWithLabel from "../../shared/InputWithLabel";



function TodoListItem({todo, onCompleteTodo, onUpdateTodo}){
    const [isEditing, setIsEditing] = useState(false)
    const [workingTitle, setWorkingTitle]= useState(todo.title)

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
    
    return <li>
        <form onSubmit={handleUpdate}>
            {isEditing ?(
                <>
            < InputWithLabel
            elementId ={ `editTodo-${todo.id}`}
            label = "Edit Todo"
            value ={ workingTitle}
            onChange={handleEdit}

            />
            <button type= "submit" >Save</button>
            <button type= "button" onClick={handleCancel}>Cancel</button>
            </>
              ):(
                <>
                <label htmlFor={`checkbox-${todo.id}`}>
            <input
            type= "checkbox" id={`checkbox${todo.id}`} checked={todo.isCompleted} onChange={()=> onCompleteTodo(todo.id)}
            />
            </label>
            <span onClick={()=> setIsEditing(true)} style = {{cursor:"pointer"}}>{todo.title}</span>
            </>
            )}
            </form>
            </li>;
            
        }

export default TodoListItem;