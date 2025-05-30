import React, {useState, useRef} from "react";
import InputWithLabel from "../shared/InputWithLabel";
import styled from 'styled-components';


const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    `
    const StyledButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    `
    const StyledInput = styled.input`
    padding: 0.5rem;
    font-size: 1rem;
    `

const TodoForm= ({ onAddTodo }) => {
    const [workingTodo, setWorkingTodo]= useState("")
const inputRef = useRef(null);

const handleAddTodo = (event) => {
event.preventDefault();
   
      onAddTodo({title:workingTodo, isCompleted:false});
      setWorkingTodo("")
      inputRef.current.focus();
    }


    
    return (
        <StyledForm onSubmit= {handleAddTodo}>
            <InputWithLabel
            elementId="todoTitle"
            label="Todo" 
            ref={inputRef} 
            value= {workingTodo} 
            onChange={(e) => setWorkingTodo(e.target.value)}/>
                <StyledButton 
            type="submit" disabled= {workingTodo.trim()===""}>
                Add Todo
                </StyledButton>
        </StyledForm>
    )
}

export default TodoForm;
