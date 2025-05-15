import { useEffect, useState } from 'react'
import './App.css'
import React from 'react';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import TodosViewForm from './features/TodosViewForm'



const encodeUrl = ({baseUrl, sortField, sortDirection, queryString})=>{
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`
  let searchQuery ="";
  if(queryString){
    searchQuery= `&filterByFormula=SEARCH("${queryString}",title)`
  }
  return encodeURI(`${baseUrl}?${sortQuery}${searchQuery}`)
}

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");    
  const [isSaving, setIsSaving]= useState(false)
  const [sortField, setSortField]= useState("createdTime")
  const [sortDirection, setSortDirection]= useState("desc")
  const [queryString, setQueryString] = useState("")


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
        
        const response = await fetch(encodeUrl({baseUrl:url, sortField, sortDirection, queryString}), {
          method:"GET",
          headers: {
            Authorization: token,
          },
        });
        if (!response.ok) {
          const errorDetails = await response.text();
  console.log('Error Response:', errorDetails);
          throw new Error(response.statusText || "Failed to fetch todos");
        }
        const data = await response.json();
        const fetchedTodos = data.records.map(normalizeTodo)
        setTodoList(fetchedTodos);
      } catch (error) {
        console.log("Fetch error:", error)
        setErrorMessage(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);   
      }
    };
    fetchTodos();
  }, [sortField, sortDirection, queryString]);

  const updateTodo = async (editedTodo)=>{
   const originalTodo= todoList.find((todo)=>todo.id === editedTodo.id)
    const updatedTodos = todoList.map((todo)=>
    todo.id === editedTodo.id ? {...todo, ...editedTodo}: todo)
    setTodoList(updatedTodos)
    setIsSaving(true)

    const payload = {
    records:[
      {id: editedTodo.id,
        fields:{
          title:editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }
      }
    ]
    }
    const options = {
      method:"PATCH",
      headers:{
        Authorization: `Bearer ${import.meta.env.VITE_PAT}`,
      "Content-Type": "application/json",
      },
      body:JSON.stringify(payload),
    }
    void (async()=>{
    try{
      const resp =await fetch(url, options)
      if(!resp.ok){
        throw new Error("Failed to update todo")
      }
    }catch(error){
      console. error(error)
      setErrorMessage(`${error.message}.Reverting todo...`)

      const revertedTodos =todoList.map((todo)=>
      todo.id === originalTodo.id ? originalTodo:todo)
      setTodoList(revertedTodos)
    }finally{
      setIsSaving(false)
    }
  })()
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
      setIsSaving(true);

      try {
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
      <hr />
      <TodosViewForm sortField={sortField} setSortField={setSortField} sortDirection={sortDirection} 
      setSortDirection={setSortDirection} queryString={queryString} setQueryString={setQueryString}  />
    </div>
    </>
  )
}

export default App;
