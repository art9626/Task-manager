import { RootStateType } from '../../store';
import { createSelector } from 'reselect';
import { getUserData } from '../auth/auth-selector';
import { getFriends } from '../friends/friends-selectors';

export const getAllUsersData = (state: RootStateType) => state.users.users;
export const getUsersIsLoading = (state: RootStateType) => state.users.isLoading;

export const getUsers = () => createSelector(
  getAllUsersData, 
  getUserData,
  getFriends,
  (users, user, friends) => {
    const allFriendsAndRequests = [...friends.addedFriends, ...friends.requestsFrom, ...friends.requestsTo];
    const result = users.filter((item) => item.email !== user?.email);
    return result.filter((item) => !allFriendsAndRequests.some((friend) => friend === item.email));
  }
);

// export const getUsers = (state: RootStateType) => {

//   console.log('selector');

//   const allFriendsAndRequests = [...state.friends.friends.addedFriends, ...state.friends.friends.requestsFrom, ...state.friends.friends.requestsTo];

//   const result = state.users.users.filter((item) => item.email !== state.auth.user?.email);
//   return result.filter((item) => !allFriendsAndRequests.some((friend) => friend === item.email));
// };