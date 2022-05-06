import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICollectiveTodo } from '../redux/reducers/collective-todos/collective-todos-reducer';
import { loadTodos, todosActions } from '../redux/reducers/todos/todos-actions';
import { getActualTodos, getIsLoading } from '../redux/reducers/todos/todos-selectors';
import TodoItem from './TodoItem';



const TodosList: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const todos = useSelector(getActualTodos);
  const isLoading = useSelector(getIsLoading);


  useEffect(() => {
    dispatch(loadTodos());

    return () => {
      dispatch(todosActions.clean());
    };
  }, [dispatch]);



  return (
    <ul>
      {
        isLoading ?
          <div>Loading...</div>
          :
          <>
            {
              todos.map((item) => {
                return (
                  <TodoItem
                    key={item._id}
                    todo={item as ICollectiveTodo}
                  />
                );
              })
            }
          </>
      }
    </ul >
  );
});


export default TodosList;