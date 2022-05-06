import { UserType } from '../auth/auth-reducer';
import { CLEAR, SET_IS_LOADING, SET_USERS, UsersActionsType } from './users-actions';

const initialState = {
  isLoading: false,
  users: [] as UserType[],
};

export const usersReducer = (state = initialState, action: UsersActionsType) => {
  switch (action.type) {
  case SET_USERS:
    return {
      ...state,
      users: action.payload,
    };

  case SET_IS_LOADING:
    return {
      ...state,
      isLoading: action.payload,
    };

  case CLEAR:
    return initialState;

  default:
    return state;
  }
};