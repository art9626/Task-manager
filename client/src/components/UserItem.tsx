import React from 'react';
import { useSelector } from 'react-redux';
import { UserType } from '../redux/reducers/auth/auth-reducer';
import { getEditingInProgress } from '../redux/reducers/friends/friends-selectors';
import { RootStateType } from '../redux/store';

type TUserItem = {
  user: UserType;
  onAdd: (candidateEmail: string) => void;
}

const UserItem: React.FC<TUserItem> = React.memo(({ user, onAdd }) => {
  const editingInProgress = useSelector((state: RootStateType) => getEditingInProgress(state, user.email));

  return (
    <li key={user._id}>
      <h4>
        {user.email}
      </h4>
      <button disabled={editingInProgress} onClick={() => onAdd(user.email)}>Add</button>
    </li>
  );
});

export default UserItem;