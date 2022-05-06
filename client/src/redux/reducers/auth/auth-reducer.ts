import { AuthActionsType, SET_IS_AUTH, SET_IS_LOADING, SET_USER } from './auth-actions';

export type UserType = {
  email: string;
  _id: string;
  isActivated: boolean;
}

const initialState = {
  error: null,
  isAuthorization: false,
  user: null as null | UserType,
  isLoading: false,
};

export const authReducer = (state = initialState, action: AuthActionsType) => {
  switch (action.type) {
  case SET_IS_AUTH:
    return {
      ...state,
      isAuthorization: action.payload,
    };

  case SET_IS_LOADING:
    return {
      ...state,
      isLoading: action.payload,
    };

  case SET_USER:
    return {
      ...state,
      user: action.payload,
    };

  default:
    return state;
  }
};

