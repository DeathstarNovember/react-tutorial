import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export default function TodoBatchTools({todoLists, listIndex, setTodoLists}) {
  const todoList = todoLists[listIndex];
  const deleteAllTodos = () => {
    console.log("deleteAllTodos");
    const newTodoLists = todoLists.splice(listIndex, 1).push({...todoList, todos: []});
    setTodoLists(newTodoLists); 
  }
  const completeAllTodos = () => {
    console.log("completeAllTodos");
    const newList = todoList.todos.map(todo => ({...todo, completed: true}));
    const newLists = todoLists.splice(listIndex, 1).push({...todoList, todos: newList});
    setTodoLists(newLists);
  };
  const uncompleteAllTodos = () => {
    console.log("uncompleteAllTodos");
    const newList = todoList.todos.map(todo => ({...todo, completed: false}));
    const newLists = todoLists.splice(listIndex, 1).push({...todoList, todos: newList});
    setTodoLists(newLists);
  };
  return (
    <ButtonGroup>
      <Button 
        variant="outline-primary"
        onClick={() => completeAllTodos()}>
          Mark All Complete
      </Button>
      <Button 
        variant="outline-warning"
        onClick={() => uncompleteAllTodos()}>
          Mark All Incomplete
      </Button>
      <Button 
        variant="outline-danger"
        onClick={() => deleteAllTodos()}>
          Delete All Todos
      </Button>
    </ButtonGroup>
  );
}