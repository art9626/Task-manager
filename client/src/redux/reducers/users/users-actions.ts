import { InferActionsType, RootStateType, DispatchType } from './../../store';
import { UserType } from '../auth/auth-reducer';
import { ThunkAction } from 'redux-thunk';
import { UsersApi } from '../../../api/users-api';


export type UsersActionsType = InferActionsType<typeof usersActions>;
type ThunkActionType = ThunkAction<void, RootStateType, unknown, UsersActionsType>;


export const SET_USERS = 'todo/users/SET_USERS';
export const SET_IS_LOADING = 'todo/users/SET_IS_LOADING';
export const CLEAR = 'todo/users/CLEAR';

export const usersActions = {
  setUsers: (payload: UserType[]) => ({ type: SET_USERS, payload }) as const,
  setIsLoading: (payload: boolean) => ({ type: SET_IS_LOADING, payload }) as const,
  clear: () => ({ type: CLEAR }) as const,
};


export const loadUsers = (): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    dispatch(usersActions.setIsLoading(true));
    const response = await UsersApi.loadUsers();
    dispatch(usersActions.setUsers(response.data));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(usersActions.setIsLoading(false));
  }

}; 