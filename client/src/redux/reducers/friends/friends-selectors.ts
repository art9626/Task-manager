import { RootStateType } from '../../store';

// export const getFriends = (state: RootStateType) => state.friends.friends.addedFriends;
export const getFriends = (state: RootStateType) => state.friends.friends;
export const getAddedFriends = (state: RootStateType) => state.friends.friends.addedFriends;
export const getRequestsFrom = (state: RootStateType) => state.friends.friends.requestsFrom;
export const getRequestsTo = (state: RootStateType) => state.friends.friends.requestsTo;
export const getFriendsIsLoading = (state: RootStateType) => state.friends.isLoading;
export const getEditingInProgress = (state: RootStateType, candidateEmail: string) => state.friends.editingInProgress.some((item) => item === candidateEmail); 