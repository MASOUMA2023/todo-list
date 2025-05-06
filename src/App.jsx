import { useEffect, useState } from 'react'
import './App.css'
import React from 'react';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");    
  const [isSaving, setIsSaving]= useState(false)

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const normalizeTodo = (record)=>({
    id: record.id,
    ...record.fields,
    isCompleted: typeof record.fields.isCompleted ==="boolean" ? record.fields.isCompleted :false,
  })

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);   
      setErrorMessage("");     
      try {
        const response = await fetch(url, {
          method:"GET",
          headers: {
            Authorization: token,
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText || "Failed to fetch todos");
        }
        const data = await response.json();
        const fetchedTodos = data.records.map(normalizeTodo)
        setTodoList(fetchedTodos);
      } catch (error) {
        setErrorMessage(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);   
      }
    };
    fetchTodos();
  }, []);

  const updateTodo = (editedTodo)=>{
    const updatedTodos = todoList.map((todo)=>
    todo.id === editedTodo.id ? {...todo, ...editedTodo}: todo)
    setTodoList(updatedTodos)
  }
  const completeTodo = async (id)=>{
    const originalTodos= [...todoList];
    const updatedTodos= todoList.map((todo)=>
    todo.id ===id?{...todo, isCompleted:!todo.isCompleted}:todo)
    setTodoList(updatedTodos)

 const todoToUpdate = updatedTodos.find((todo)=>todo.id ===id);
    const payload = {
      records: [
        {
          id:todoToUpdate.id,
          fields: {
            isCompleted: todoToUpdate.isCompleted,
          },
        },
      ],
    };
  
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
  
    try {
      const resp = await fetch(url, options);
  
      if (!resp.ok) {
        throw new Error('Failed to update todo completion');
      }
      // const { records } =await resp.json();

      // const savedTodo = normalizeTodo(records[0])
      // setTodoList([...todoList, savedTodo]);
    } catch (error) {
      console.error(error);
      setTodoList(originalTodos)
      setErrorMessage(error.message|| "couldn't complete todo");
    } 
  }
    const addTodo = async (newTodo) => {
      const payload = {
        records: [
          { fields: {
              title: newTodo.title,
              isCompleted: newTodo.isCompleted,
            },
          },
        ],
      };
    
      const options = {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };
    
      try {
        setIsSaving(true);
        const resp = await fetch(url, options);
    
        if (!resp.ok) {
          throw new Error('Failed to save todo');
        }
    
        const { records } = await resp.json();
        const savedTodo = normalizeTodo(records[0]);
    
        setTodoList([...todoList, savedTodo]);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message || 'Something went wrong while adding todo');
      } finally {
        setIsSaving(false);
      }
    };    

  return (
    <>
    <div className="App">
      {isLoading && <p>Loading Todos, please wait...</p>}
      {errorMessage && (
        <div>
          <hr /><p style= {{color:"red"}}>{errorMessage}</p>
      <button onClick={()=> setErrorMessage("")}>Dismiss</button>
      </div>
      )}
      <h1>My Todo App</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving}  />
      <TodoList todoList={todoList} onUpdateTodo={updateTodo} onCompleteTodo={completeTodo} isLoading={isLoading} />

    </div>
    </>
  )
}

export default App;
