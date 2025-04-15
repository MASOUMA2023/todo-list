import React from 'react';
import TodoListItem from "./TodoListItem";


function TodoList({ todoList }) {
  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {
todoList.map((todo) => (
          < TodoListItem key={todo.id} todo= {todo}/>
        ))}
      </ul>
    </div>
  );
}
export default TodoList;