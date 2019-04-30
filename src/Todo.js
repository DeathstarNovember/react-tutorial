import React from 'react';
import { 
    Button, 
    ButtonGroup, 
    Card } from 'react-bootstrap';

export default function Todo({todo, todoId, listBoardIndex, listBoards, setListBoards}) {  
    console.log("from Todos, listBoards: ", listBoards);
    const completeTodo = todoId => {
        console.log("completeTodo");
        const newTodo = {
            ...listBoards[listBoardIndex].todoList[todoId], 
            completed: true}
        ;
        const newListBoard =  {
            ...listBoards[listBoardIndex], 
            todoList: listBoards[listBoardIndex].todoList.splice(todoId, 1).push(newTodo)
        };
        const newListBoards = listBoards.splice(listBoardIndex, 1).push(newListBoard);
        setListBoards(newListBoards);
    };
    const deleteTodo = todoId => {
        console.log("deleteTodo");
        const newListBoard =  {
            ...listBoards[listBoardIndex], 
            todoList: {
                ...listBoards[listBoardIndex].todoList.splice(todoId, 1)
            }
        };
        const newListBoards = listBoards.splice(listBoardIndex, 1).push(newListBoard);
        setListBoards(newListBoards);
    };

    return(
      <Card>
        <Card.Body>
          <span className={ todo.completed ? "completedTodo" : "" }>{todo.text}</span>
          <ButtonGroup aria-label="todo actions" >
            <Button 
              variant={todo.completed ? "outline-secondary" : "outline-primary"} 
              onClick={() => completeTodo(todoId)}>
                {todo.completed ? "Un-Complete" : "Complete"}
            </Button>
            <Button 
              variant="outline-danger" 
              onClick={() => deleteTodo(todoId)}>
                x
            </Button>
          </ButtonGroup> 
        </Card.Body>
      </Card>
    );
  }