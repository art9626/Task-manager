import { FriendsApi } from '../../../api/friends-api';
import { DispatchType, InferActionsType } from '../../store';
import { TFriends } from './friends-reducer';



export type FriendsActionsType = InferActionsType<typeof friendsActions>;


export const SET_ALL = 'todo/friends/SET_ALL';
export const SET_REQUESTS_TO = 'todo/friends/SET_REQUESTS_TO';
export const REMOVE_FRIEND = 'todo/friends/REMOVE_FRIEND';
export const ADD_FRIEND = 'todo/friends/ADD_FRIEND';
export const CONFIRM_REQUEST = 'todo/friends/CONFIRM_REQUEST';
export const DENY_REQUEST = 'todo/friends/DENY_REQUEST';
export const CANCEL_REQUEST = 'todo/friends/CANCEL_REQUEST';
export const SET_IS_LOADING = 'todo/friends/SET_IS_LOADING';
export const ADD_TO_EDITING_IN_PROGRESS = 'todo/friends/ADD_TO_EDITING_IN_PROGRESS';
export const REMOVE_FROM_EDITING_IN_PROGRESS = 'todo/friends/REMOVE_FROM_EDITING_IN_PROGRESS';
export const CLEAR = 'todo/friends/CLEAR';


export const friendsActions = {
  setAll: (payload: TFriends) => ({ type: SET_ALL, payload }) as const,
  setRequestsTo: (payload: string[]) => ({ type: SET_REQUESTS_TO, payload }) as const,
  removeFriend: (payload: string) => ({ type: REMOVE_FRIEND, payload }) as const,
  addFriend: (payload: string) => ({ type: ADD_FRIEND, payload }) as const,
  confirmRequest: (payload: string) => ({ type: CONFIRM_REQUEST, payload }) as const,
  denyRequest: (payload: string) => ({ type: DENY_REQUEST, payload }) as const,
  cancelRequest: (payload: string) => ({ type: CANCEL_REQUEST, payload }) as const,
  setIsLoading: (payload: boolean) => ({ type: SET_IS_LOADING, payload }) as const,
  addToEditingInProgress: (payload: string) => ({ type: ADD_TO_EDITING_IN_PROGRESS, payload }) as const,
  removeFromEditingInProgress: (payload: string) => ({ type: REMOVE_FROM_EDITING_IN_PROGRESS, payload }) as const,
  clear: () => ({ type: CLEAR }) as const,
};


export const loadFriends = () => async (dispatch: DispatchType) => {
  try {
    dispatch(friendsActions.setIsLoading(true));
    const response = await FriendsApi.loadFriends();
    dispatch(friendsActions.setAll(response.data.friends));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(friendsActions.setIsLoading(false));
  }
};


export const editFriends = (endpoint: string, candidateEmail: string) => async (dispatch: DispatchType) => {
  try {
    dispatch(friendsActions.addToEditingInProgress(candidateEmail));
    await FriendsApi.editFriends(endpoint, candidateEmail);
    if (endpoint === 'remove') {
      dispatch(friendsActions.removeFriend(candidateEmail));
    }
    if (endpoint === 'add') {
      dispatch(friendsActions.addFriend(candidateEmail));
    }
    if (endpoint === 'confirm') {
      dispatch(friendsActions.confirmRequest(candidateEmail));
    }
    if (endpoint === 'deny') {
      dispatch(friendsActions.denyRequest(candidateEmail));
    }
    if (endpoint === 'cancel') {
      dispatch(friendsActions.cancelRequest(candidateEmail));
    }
  } catch (e: any) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(friendsActions.removeFromEditingInProgress(candidateEmail));
  }
};