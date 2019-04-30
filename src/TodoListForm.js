import React, { useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';

export default function TodoListForm( {todoLists, setTodoLists} ) {
    const [titleText, setTitleText] = useState("");
    const [descText, setDescText] = useState("");
    const handleSubmit = e => {
      e.preventDefault(); //prevent default submit behavior
      if (!titleText) return; //check for value
      addTodoList(titleText, descText); //creates a todo with the input value
      setTitleText("");//reset the vlaue of the form
    };
    const addTodoList = (titleText, descText) => {
        const newTodoLists = [...todoLists, { title: titleText, description: descText, todos: [] }];
        setTodoLists(newTodoLists);
    };
    
    return (
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Button variant="outline-success" type="submit">New Todo Board</Button>
          </InputGroup.Prepend>
          <FormControl 
            aria-describedby="basic-addon1" 
            type="text" value={titleText} 
            placeholder="New board title*"
            onChange={e => setTitleText(e.target.value)} 
          />
          <FormControl 
            aria-describedby="basic-addon1" 
            type="text" value={descText} 
            placeholder="Description"
            onChange={e => setDescText(e.target.value)} 
          />
        </InputGroup>
      </Form>
    );
  }