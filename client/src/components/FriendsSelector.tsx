import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFriends } from '../redux/reducers/friends/friends-actions';
import { getAddedFriends, getFriendsIsLoading } from '../redux/reducers/friends/friends-selectors';
import Selector from '../UI/Selector';


interface IFriendsSelector {
  onAddSubscriber: (number: number, name: string) => void;
  index: number;
  subscribers: string[];
}


const FriendsSelector: React.FC<IFriendsSelector> = React.memo(({ onAddSubscriber, index, subscribers }) => {
  const dispatch = useDispatch();
  const friends = useSelector(getAddedFriends);
  const isLoading = useSelector(getFriendsIsLoading);


  useEffect(() => {
    dispatch(loadFriends());
  }, [dispatch]);


  const onChange = (name: string) => {
    onAddSubscriber(index, name);
  };


  return (
    <Selector values={friends} isLoading={isLoading} value={subscribers[index]} onChange={onChange} />
  );
});

export default FriendsSelector;