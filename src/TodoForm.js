import React, { useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';

export default function TodoForm({todoLists, setTodoLists, listIndex}) {
    const [inputText, setInputText] = useState("");
    const todoList = todoLists[listIndex];
    const handleSubmit = e => {
      e.preventDefault(); //prevent default submit behavior
      if (!inputText) return; //check for value
      addTodo(inputText); //creates a todo with the input value
      setInputText("");//reset the vlaue of the form
    };
    const addTodo = text => {
        const newTodoList = {...todoList, todos: todoList.todos.push({text, completed: false})};
        const newTodoLists = todoLists.map((todoList, index) => (
            index == listIndex ? newTodoList : todoList
        ));
        setTodoLists(newTodoLists);
    };
    
    return (
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Button variant="outline-success" type="submit">New Todo</Button>
          </InputGroup.Prepend>
          <FormControl 
            aria-describedby="basic-addon1" 
            type="text" value={inputText} 
            onChange={e => setInputText(e.target.value)} 
          />
        </InputGroup>
      </Form>
    );
  }