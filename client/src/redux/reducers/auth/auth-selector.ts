import { RootStateType } from '../../store';

export const getIsAuthorization = (state: RootStateType) => state.auth.isAuthorization;
export const getIsLoading = (state: RootStateType) => state.auth.isLoading;
export const getUserData = (state: RootStateType) => state.auth.user;