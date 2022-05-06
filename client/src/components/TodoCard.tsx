import React from 'react';
import { useSelector } from 'react-redux';
import { ICollectiveTodo } from '../redux/reducers/collective-todos/collective-todos-reducer';
import { getTodoIsLoading } from '../redux/reducers/todosStatusLists/todos-status-lists-selectors';
import { RootStateType } from '../redux/store';

interface ITodoCardPRops {
  todo: ICollectiveTodo;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  isCollective?: boolean;
  editing?: boolean;
}

const TodoCard: React.FC<ITodoCardPRops> = React.memo(({ todo, onDelete, onComplete, isCollective = false, editing = true }) => {
  const isLoading = useSelector((state: RootStateType) => getTodoIsLoading(state, todo._id));


  return (
    <>
      <h3>
        {todo.title}
      </h3>
      <p>
        {todo.text}
      </p>
      {
        isCollective ?
          <div>
            <ul>
              {
                todo.subscribers.map((item) => {
                  return (
                    <li key={item.email}>
                      {item.email}

                      <input type='checkbox' disabled checked={item.complete} />
                    </li>
                  );
                })
              }
            </ul>
            <div>Author: {todo.author}</div>
          </div>
          :
          null
      }

      <button disabled={isLoading} onClick={() => onComplete(todo._id)}>{todo.complete ? 'Completed' : 'Complete'}</button>
      {
        editing ?
          <button disabled={isLoading} onClick={() => onDelete(todo._id)}>Delete</button>
          :
          null
      }
    </>
  );
});

export default TodoCard;