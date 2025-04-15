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
      title: title
    };
    setTodoList([...todoList, newTodo]);
  };
  return (
    <>
    <div className="App">
      <h1>My Todo App</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
    </>
  )
}

export default App
