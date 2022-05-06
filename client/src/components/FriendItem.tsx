import React from 'react';
import { useSelector } from 'react-redux';
import { getEditingInProgress } from '../redux/reducers/friends/friends-selectors';
import { RootStateType } from '../redux/store';


type TFriendItem = {
  friend: string;
  onRemove: (candidateEmail: string) => void;
}

const FriendItem: React.FC<TFriendItem> = React.memo(({ friend, onRemove }) => {
  const editingInProgress = useSelector((state: RootStateType) => getEditingInProgress(state, friend));

  return (
    <>
      <li>
        <h4>
          {friend}
        </h4>
      </li>
      <button disabled={editingInProgress} onClick={() => onRemove(friend)}>
        Remove
      </button>
    </>
  );
});

export default FriendItem;