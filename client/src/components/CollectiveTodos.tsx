import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collectiveTodosActions, loadCollectiveTodos } from '../redux/reducers/collective-todos/collective-todos-actions';
import { getCreatedCollectiveTodos, getIsLoading, getSubscribedCollectiveTodos } from '../redux/reducers/collective-todos/collective-todos-selectors';
import List from '../UI/List';
import TodoItem from './TodoItem';

const CollectiveTodos: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const createdTodos = useSelector(getCreatedCollectiveTodos);
  const subscribedTodos = useSelector(getSubscribedCollectiveTodos);


  useEffect(() => {
    dispatch(loadCollectiveTodos());

    return () => {
      dispatch(collectiveTodosActions.clear());
    };
  }, [dispatch]);



  return (
    <div>
      {
        isLoading ?
          <div>Loading...</div>
          :
          <>
            <List header='Created Todos'>
              {
                createdTodos.map((item) => {
                  return (
                    <TodoItem
                      key={item._id}
                      todo={item}
                      isCollective
                    />
                  );
                })
              }
            </List>
            <List header='Subscribed Todos'>
              {
                subscribedTodos.map((item) => {
                  return (
                    <TodoItem
                      key={item._id}
                      todo={item}
                      isCollective
                      editing={false}
                    />
                  );
                })
              }
            </List>
          </>
      }
    </div>
  );
};

export default CollectiveTodos;