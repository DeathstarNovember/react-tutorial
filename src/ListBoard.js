import React from 'react';
import { Card } from 'react-bootstrap'
import TodoList from './TodoList';

export default function ListBoard({listBoards, setListBoards, id}) {
  console.log("listBoards: ", listBoards);
  console.log("listBoard id: ", id);
  return(
    <div className="todoList">
      <Card>
        <Card.Header>
          {listBoards[id].title}
          <span className="subtitle">{listBoards[id].description}</span>
        </Card.Header>
        
      </Card>
    </div>
  );
}
