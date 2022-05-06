import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editFriends } from '../redux/reducers/friends/friends-actions';
import { loadUsers, usersActions } from '../redux/reducers/users/users-actions';
import {  getUsers, getUsersIsLoading } from '../redux/reducers/users/users-selectors';
import List from '../UI/List';
import UserItem from './UserItem';


const Users: React.FC = () => {
  const dispatch = useDispatch();
  const usersIsLoading = useSelector(getUsersIsLoading);
  const users = useSelector(getUsers());

  useEffect(() => {
    dispatch(loadUsers());

    return () => {
      dispatch(usersActions.clear());
    };
  }, [dispatch]);



  const onAdd = useCallback((candidateEmail: string) => {
    dispatch(editFriends('add', candidateEmail));
  }, [dispatch]);



  return (
    <>
      {
        usersIsLoading ?
          <div>Loading...</div>
          :
          <List header='Users'>
            {
              users.map((item) => {
                return (
                  <UserItem key={item._id} user={item} onAdd={onAdd} />
                );
              })
            }
          </List>
      }
    </>
  );
};

export default Users;