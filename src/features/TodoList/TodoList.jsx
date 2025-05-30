import React from 'react';
import TodoListItem from "./TodoListItem";
import styles from './TodoList.module.css';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  if (isLoading ){
    return <p>Todo list loading...</p>
  }
  if(todoList.length === 0){
    return <p>No todos yet.Add one above!</p>
  }
  const filteredTodoList = todoList.filter(todo => !todo.isCompleted);
  return (
    <div >
      <h2>Todo List</h2>
      { filteredTodoList.length === 0? (
        <p>All todos completed! Add more above if needed</p>
      ) : (
      <ul className={styles.todoList}>
        {filteredTodoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} onCompleteTodo= {onCompleteTodo} onUpdateTodo={onUpdateTodo} />
        ))}
      </ul>
      )}
    </div>
  );
}
export default TodoList;