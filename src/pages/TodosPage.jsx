import React, {useEffect} from 'react';
import TodoList from '../features/TodoList/TodoList';
import TodoForm from '../features/TodoForm';
import TodosViewForm from '../features/TodosViewForm';
import {actions as todoActions} from '../reducers/todos.reducer'
import { useSearchParams, useNavigate } from 'react-router-dom';


export default function TodosPage({
    todoState, onAddTodo, onUpdateTodo,onCompleteTodo, dispatch,
}){
    const {todoList, isSaving, isLoading, sortField, sortDirection, queryString}= todoState
const [searchParams, setSearchParams]=useSearchParams();
const navigate = useNavigate();
const itemsPerPage=8;
const currentPage = parseInt(searchParams.get('page')||'1', 10);
const indexOfFirstTodo=(currentPage - 1)* itemsPerPage;
const filteredTodoList = todoList.filter(todo => !todo.isCompleted);
const totalPages=Math.ceil(filteredTodoList.length/ itemsPerPage)
const currentTodos = filteredTodoList.slice(indexOfFirstTodo, indexOfFirstTodo+ itemsPerPage)

const handlerPerviouspage=()=>{
    if (currentPage>1){
        setSearchParams({page:String(currentPage- 1)})
    }
}
const handleNextpage =()=>{
    if (currentPage < totalPages){
        setSearchParams({page:String(currentPage+ 1)})
    }
}
useEffect(()=>{
    if (totalPages>0) {
        if (isNaN(currentPage)|| currentPage > totalPages){
            navigate('/')
        }
    }
}, [currentPage, totalPages,navigate])

    return(
        <div>
        <TodoForm onAddTodo={onAddTodo} isSaving={isSaving} />
        <TodoList
          todoList={currentTodos}
          onUpdateTodo={onUpdateTodo}
          onCompleteTodo={onCompleteTodo}
          isLoading={isLoading}
        />

        <hr />
        <TodosViewForm
          sortField={sortField}
          setSortField={(value) =>
            dispatch({ type: todoActions.setSortField, payload: value })
          }
          sortDirection={sortDirection}
          setSortDirection={(value) =>
            dispatch({ type: todoActions.setSortDirection, payload: value })
          }
          queryString={queryString}
          setQueryString={(value) =>
            dispatch({ type: todoActions.setQueryString, payload: value })
          }
        />
        <div className="paginationControls" style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
  <button onClick={handlerPerviouspage} disabled={currentPage<=1}>Previous</button>
  <span>Page {currentPage} of {totalPages || 1}</span>
  <button onClick={handleNextpage} disabled={currentPage >= totalPages}>Next</button>
</div>
      </div>
    )
}