import React, { useState } from 'react';
import { Form, InputGroup, Button, FormControl, Card, ButtonGroup } from 'react-bootstrap'
import './App.css';



export default function App() {
  const [todoLists, setTodoLists] = useState([
    {
      title: "Home Todos",
      description: "Things I need to get done around the house",
      todos: [
        {
          text: "Do the Laundry",
          completed: false
        },
        {
          text: "Meet friend for lunch",
          completed: false
        },
        {
          text: "Fix the lawn mower",
          completed: false
        }
      ]
    },
    {
      title: "Work Todos",
      description: "Things I need to get done at the office",
      todos: [
        {
          text: "Learn about React",
          completed: false
        },
        {
          text: "Build really cool todo app",
          completed: false
        }
      ]
    }
  ]);
  const [titleText, setTitleText] = useState("");
  const [descText, setDescText] = useState("");
  const [inputTodoText, setInputTodoText] = useState("");
  const handleListSubmit = e => {
    e.preventDefault(); //prevent default submit behavior
    if (!titleText) return; //check for value
    addTodoList(titleText, descText); //creates a todo with the input value
    setTitleText("");//reset the vlaue of the form
  };
  const handleTodoSubmit = (e, listId) => {
    e.preventDefault(); //prevent default submit behavior
    const addTodo = text => {
        const todoList = {...todoLists[listId]}
        const newTodoList = {...todoList, todos: todoList.todos.push({text, completed: false})};
        const newTodoLists = todoLists.map((todoList, index) => (
            index === listId ? newTodoList : todoList
        ));
        setTodoLists(newTodoLists);
    };
    if (!inputTodoText) return; //check for value
    addTodo(inputTodoText); //creates a todo with the input value
    setInputTodoText("");//reset the vlaue of the form
  };

  const addTodoList = (titleText, descText) => {
      const newTodoLists = [...todoLists, { title: titleText, description: descText, todos: [] }];
      setTodoLists(newTodoLists);
  };
  const completeTodo = (listId, todoId, todo) => {
    console.log("completeTodo");
    const completedTodo = {...todo, completed: true};
    const newTodos = todoLists[listId].todos.splice(todoId, 1).push(completedTodo);
    const newTodoList = {...todoLists[listId], todos: newTodos};
    const newTodoLists = todoLists.splice(listId, newTodoList);
    setTodoLists(newTodoLists);
  };
  const deleteTodo = (listId, todoId) => {
    console.log("deleteTodo");
    const newTodos = todoLists[listId].todos.splice(todoId, 1);
    const newTodoList = {...todoLists[listId], todos: newTodos};
    const newTodoLists = todoLists.splice(listId, 1).push(newTodoList);
    setTodoLists(newTodoLists);
  };
  const deleteAllTodosInList = listId => {
    console.log("deleteAllTodosInList");
    const todoList = {...todoLists[listId]}
    const newTodoLists = todoLists.splice(listId, 1).push({...todoList, todos: []});
    setTodoLists(newTodoLists); 
  }
  const completeAllTodosInList = listId => {
    console.log("completeAllTodosInList");
    const todoList = {...todoLists[listId]}
    const newList = todoList.todos.map(todo => ({...todo, completed: true}));
    const newLists = todoLists.splice(listId, 1).push({...todoList, todos: newList});
    setTodoLists(newLists);
  };
  const uncompleteAllTodosInList = listId => {
    console.log("uncompleteAllTodosInList");
    const todoList = {...todoLists[listId]}
    const newList = todoList.todos.map(todo => ({...todo, completed: false}));
    const newLists = todoLists.splice(listId, 1).push({...todoList, todos: newList});
    setTodoLists(newLists);
  };
  return (
    <div className="app">
      <div className="appHeader">
        <h1>Todos</h1>
      </div>
      <Form onSubmit={handleListSubmit}>
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
      {todoLists.map((todoList, listId) => (
        <Card key={listId} className="todoList">
          <Card.Header>
            {todoList.title}
            <span className="subtitle">{todoList.description}</span>
          </Card.Header>
          <Form onSubmit={e => handleTodoSubmit(listId)}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <Button variant="outline-success" type="submit">New Todo</Button>
              </InputGroup.Prepend>
              <FormControl 
                aria-describedby="basic-addon1" 
                type="text" value={inputTodoText} 
                onChange={e => setInputTodoText(e.target.value)} 
              />
            </InputGroup>
          </Form>
          <ButtonGroup>
            <Button 
              variant="outline-primary"
              onClick={() => completeAllTodosInList(listId)}>
                Mark All Complete
            </Button>
            <Button 
              variant="outline-warning"
              onClick={() => uncompleteAllTodosInList(listId)}>
                Mark All Incomplete
            </Button>
            <Button 
              variant="outline-danger"
              onClick={() => deleteAllTodosInList(listId)}>
                Delete All Todos
            </Button>
          </ButtonGroup>
          {todoList.map((todo, todoId) => (
            <Card>
              <Card.Body>
                <span className={ todo.completed ? "completedTodo" : "" }>{todo.text}</span>
                <ButtonGroup aria-label="todo actions" >
                  <Button 
                    variant={todo.completed ? "outline-secondary" : "outline-primary"} 
                    onClick={() => completeTodo(listId, todoId, todo)}>
                      {todo.completed ? "Un-Complete" : "Complete"}
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    onClick={() => deleteTodo(listId, todoId)}>
                      x
                  </Button>
                </ButtonGroup> 
              </Card.Body>
            </Card>
          ))}
        </Card>
      ))}
    </div>
  );
}