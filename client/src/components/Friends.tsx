import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editFriends, friendsActions, loadFriends } from '../redux/reducers/friends/friends-actions';
import { getFriends, getFriendsIsLoading } from '../redux/reducers/friends/friends-selectors';
import List from '../UI/List';
import FriendItem from './FriendItem';
import RequestFromItem from './RequestFromItem';
import RequestToItem from './RequestToItem';


const Friends: React.FC = () => {
  const dispatch = useDispatch();
  const friendsIsLoading = useSelector(getFriendsIsLoading);
  const friends = useSelector(getFriends);

  useEffect(() => {
    dispatch(loadFriends());

    return () => {
      dispatch(friendsActions.clear());
    };
  }, [dispatch]);


  const onRemove = useCallback((candidateEmail: string) => {
    dispatch(editFriends('remove', candidateEmail));
  }, [dispatch]);

  const onDeny = useCallback((candidateEmail: string) => {
    dispatch(editFriends('deny', candidateEmail));
  }, [dispatch]);

  const onAccept = useCallback((candidateEmail: string) => {
    dispatch(editFriends('confirm', candidateEmail));
  }, [dispatch]);

  const onCancel = useCallback((candidateEmail: string) => {
    dispatch(editFriends('cancel', candidateEmail));
  }, [dispatch]);


  
  return (
    <>
      {
        friendsIsLoading ?
          <div>Loading...</div>
          :
          <>
            <List header='Friends'>
              {
                friends.addedFriends.map((item) => {
                  return (
                    <FriendItem key={item} friend={item} onRemove={onRemove} />
                  );
                })
              }
            </List>
            <List header='Request from'>
              {
                friends.requestsFrom.map((item) => {
                  return (
                    <RequestFromItem key={item} name={item} onDeny={onDeny} onAccept={onAccept} />
                  );
                })
              }
            </List>
            <List header='Request to'>
              {
                friends.requestsTo.map((item) => {
                  return (
                    <RequestToItem key={item} name={item} onCancel={onCancel} />
                  );
                })
              }
            </List>
          </>
      }
    </>
  );
};

export default Friends;