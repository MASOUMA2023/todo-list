import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';


function App() {
  const [count, setCount] = useState(0)
const todos= [
  {id:1, task: 'Learn React'},
  {id:2, task: 'Build a Todo App'},
  {id:3, task: 'Write Documentation'},
];
  return (
    <>
    <div className="App">
      <h1>My Todo App</h1>
      <TodoForm/>
      <TodoList todos={todos} />
    </div>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
