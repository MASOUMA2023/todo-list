
import { useEffect, useReducer, useCallback, useState} from 'react'
import styles from './App.module.css'
// import './App.css'
import React from 'react';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import TodosViewForm from './features/TodosViewForm'
import { todosReducer, initialState as initialTodosState, actions as todoActions}  from './reducers/todos.reducer';


function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
const {sortField,sortDirection, queryString}= todoState;

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const encodeUrl = useCallback(()=>{
    let sortQuery = `sort[0][field]=${todoState.sortField}&sort[0][direction]=${todoState.sortDirection}`
    let searchQuery ="";
    if(queryString){
      searchQuery= `&filterByFormula=SEARCH("${todoState.queryString}",title)`
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`)
  }, [url, todoState.sortField, todoState.sortDirection, todoState.queryString])

  const normalizeTodo = (record)=>({
    id: record.id,
    ...record.fields,
    isCompleted: typeof record.fields.isCompleted ==="boolean" ? record.fields.isCompleted :false,
  })

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch ({type: todoActions.fetchTodos})     
      try {
        
        const response = await fetch(encodeUrl(), {
          method:"GET",
          headers: {
            Authorization: token,
          },
        });
        if (!response.ok) {
          // const errorDetails = await response.text();
  // console.log('Error Response:', errorDetails);
          throw new Error(response.statusText || "Failed to fetch todos");
        }
        const data = await response.json();
        const fetchedTodos = data.records.map(normalizeTodo)
      dispatch ({ type: todoActions.loadTodos, payload: fetchedTodos})
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, payload: error.message || "Something went wrong"});
      } 
      }
    fetchTodos();
  }, [encodeUrl]);

  const updateTodo = async (editedTodo)=>{
   const originalTodo = todoState.todoList.find(
     (todo) => todo.id === editedTodo.id
   );
    // const updatedTodos = state.todoList.map((todo)=>
    // todo.id === editedTodo.id ? {...todo, ...editedTodo}: todo)
    dispatch({type:todoActions.updateTodo, payload: editedTodo})
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
    // void (async()=>{
    try{
      const resp =await fetch(url, options)
      if(!resp.ok){
        throw new Error("Failed to update todo")
      }
    }catch(error){
      dispatch({
        type: todoActions.setLoadError,
        payload:`${error.message}.Reverting todo...`,})
        dispatch({
          type: todoActions.revertTodo,
          payload: originalTodo,
        });
  }
}
  const completeTodo = async (id)=>{
    const originalTodo=todoState.todoList.find((todo) => todo.id === id);
    const updatedTodos= { ...originalTodo, isCompleted: !originalTodo.isCompleted }

    dispatch({ type: todoActions.completeTodo, payload: updatedTodos })
    const payload = {
      records: [
        {
          id:updatedTodos.id,
          fields: {
            isCompleted: updatedTodos.isCompleted,
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
      dispatch({
        type: todoActions.setLoadError,
        payload: error.message || "Couldn't complete todo",
      });
      dispatch({
        type: todoActions.revertTodo,
        payload: originalTodo,
      })
    } 
  }
    const addTodo = async (newTodo) => {
      dispatch ({ type:todoActions.startRequest})
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
      // setIsSaving(true);

      try {
        const resp = await fetch(url, options);
    
        if (!resp.ok) {
          throw new Error('Failed to save todo');
        }
    
        const { records } = await resp.json();
        const savedTodo = normalizeTodo(records[0]);
    
        dispatch ({type: todoActions.addTodo, payload: savedTodo})
      } catch (error) {
       dispatch({type: todoActions.setLoadError, payload: error.message || 'Something went wrong while adding todo'});
      } finally {
        dispatch({type: todoActions.endRequest})
      }
    };    

  return (
    <>
    <div className={styles.appContainer}>
      {todoState.isLoading && <p>Loading Todos, please wait...</p>}
      {todoState.errorMessage && (
        <div>
          <hr /><p className={styles.errorMessage}>{todoState.errorMessage}</p>
      <button onClick={()=> dispatch({type: todoActions.clearError})}>Dismiss</button>
      </div>
      )}
      <h1>My Todo App</h1>
      <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving}  />
      <TodoList todoList={todoState.todoList} onUpdateTodo={updateTodo} onCompleteTodo={completeTodo} isLoading={todoState.isLoading} />
      <hr />
      <TodosViewForm sortField={sortField}
  setSortField={(value) => dispatch({ type: todoActions.setSortField, payload: value })}
  sortDirection={sortDirection}
  setSortDirection={(value) => dispatch({ type: todoActions.setSortDirection, payload: value })}
  queryString={queryString}
  setQueryString={(value) => dispatch({ type: todoActions.setQueryString, payload: value })} />
    </div>
    </>
  )
}


export default App;

