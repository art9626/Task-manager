import { ThunkAction } from 'redux-thunk';
import { AuthApi } from '../../../api/auth-api';
import { DispatchType, InferActionsType, RootStateType } from '../../store';
import { UserType } from './auth-reducer';

export type TRegistrationData = {
  email: string;
  name: string;
  password: string;
}

export type TLoginData = Omit<TRegistrationData, 'name'>;


export type AuthActionsType = InferActionsType<typeof authActions>;
type ThunkActionType = ThunkAction<void, RootStateType, unknown, AuthActionsType>;



export const SET_IS_AUTH = 'todo/auth/SET_IS_AUTH';
export const SET_IS_LOADING = 'todo/auth/SET_IS_LOADING';
export const SET_USER = 'todo/auth/SET_USER';



export const authActions = {
  setAuth: (payload: boolean) => ({ type: SET_IS_AUTH, payload }) as const,
  setIsLoading: (payload: boolean) => ({ type: SET_IS_LOADING, payload }) as const,
  setUser: (payload: UserType | null) => ({ type: SET_USER, payload }) as const,
};



export const login = (data: TLoginData): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    dispatch(authActions.setIsLoading(true));
    const response = await AuthApi.login(data);
    localStorage.setItem('token', response.data.accessToken);
    dispatch(authActions.setUser(response.data.user));
    dispatch(authActions.setAuth(true));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
};

export const registration = (data: TRegistrationData): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    dispatch(authActions.setIsLoading(true));
    const response = await AuthApi.registration(data);
    localStorage.setItem('token', response.data.accessToken);
    dispatch(authActions.setUser(response.data.user));
    dispatch(authActions.setAuth(true));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
};

export const logout = (): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    await AuthApi.logout();
    localStorage.removeItem('token');
    dispatch(authActions.setAuth(false));
    dispatch(authActions.setUser(null));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  }
};


export const checkAuth = (): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    dispatch(authActions.setIsLoading(true));
    const response = await AuthApi.refresh();
    localStorage.setItem('token', response.data.accessToken);
    dispatch(authActions.setUser(response.data.user));
    dispatch(authActions.setAuth(true));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
};
