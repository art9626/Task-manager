import React from 'react';
import { useSelector } from 'react-redux';
import { getEditingInProgress } from '../redux/reducers/friends/friends-selectors';
import { RootStateType } from '../redux/store';


type TRequestFromItem = {
  name: string;
  onAccept: (candidateEmail: string) => void;
  onDeny: (candidateEmail: string) => void;
}

const RequestFromItem: React.FC<TRequestFromItem> = React.memo(({ name, onAccept, onDeny }) => {
  const editingInProgress = useSelector((state: RootStateType) => getEditingInProgress(state, name));

  return (
    <>
      <li>
        <h4>
          {name}
        </h4>
      </li>
      <button disabled={editingInProgress} onClick={() => onAccept(name)}>Accept</button>
      <button disabled={editingInProgress} onClick={() => onDeny(name)}>Deny</button>
    </>
  );
});

export default RequestFromItem;