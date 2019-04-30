import React from 'react';
import { Card } from 'react-bootstrap'
import Todo from './Todo';
import TodoForm from './TodoForm';
import TodoBatchTools from "./TodoBatchTools";

export default function TodoList({todoLists, setTodoLists, listIndex}) {
  return(
    <div className="todoList">
      <Card>
        <Card.Header>
          {todoLists[listIndex].title}
          <span className="subtitle">{todoLists[listIndex].description}</span>
        </Card.Header>
        <TodoForm 
          todoLists={todoLists} 
          listIndex={listIndex} 
          setTodoLists={setTodoLists} 
        />
        <TodoBatchTools 
          todoLists={todoLists} 
          listIndex={listIndex} 
          setTodoLists={setTodoLists} 
        />
        {todoLists[listIndex].todos.map((todo, index) => (
          <Todo 
            key={index} 
            todo={todo}
            todoId={index} 
            listIndex={listIndex} 
            todoLists={todoLists} 
            setTodoLists={setTodoLists} 
          />
        ))}
      </Card>
    </div>
  );
}