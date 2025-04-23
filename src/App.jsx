import { useState } from 'react'
import './App.css'
import React from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
 const addTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title: title,
      isCompleted : false
    };
    setTodoList([...todoList, newTodo]);
  }
    const completeTodo = (id) =>{
      const updatedTodos = todoList.map((todo)=>
        todo.id === id ? { ...todo, isCompleted: true} : todo);
        setTodoList (updatedTodos);
  };
  return (
    <>
    <div className="App">
      <h1>My Todo App</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
    </>
  )
}

export default App;
