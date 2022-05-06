import React from 'react';
import { useSelector } from 'react-redux';
import { getEditingInProgress } from '../redux/reducers/friends/friends-selectors';
import { RootStateType } from '../redux/store';


type TRequestToItem = {
  name: string;
  onCancel: (candidateEmail: string) => void;
}

const RequestToItem: React.FC<TRequestToItem> = React.memo(({ name, onCancel }) => {
  const editingInProgress = useSelector((state: RootStateType) => getEditingInProgress(state, name));

  return (
    <>
      <li>
        <h4>
          {name}
        </h4>
      </li>
      <button disabled={editingInProgress} onClick={() => onCancel(name)}>Cancel</button>
    </>
  );
});

export default RequestToItem;