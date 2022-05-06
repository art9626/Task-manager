import { TRegistrationData } from './../redux/reducers/auth/auth-actions';
import { AxiosResponse } from 'axios';
import { $api } from '.';
import { TLoginData } from '../redux/reducers/auth/auth-actions';
import { UserType } from '../redux/reducers/auth/auth-reducer';


export type TAuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: UserType;
}

export class AuthApi {
  static async registration(data: TRegistrationData): Promise<AxiosResponse<TAuthResponse>> {
    const response = await $api.post<TAuthResponse>('/registration', data);
    return response;
  }

  static async refresh(): Promise<AxiosResponse<TAuthResponse>> {
    const response = await $api.get<TAuthResponse>('/refresh', { withCredentials: true });
    return response;
  }

  static async login(data: TLoginData): Promise<AxiosResponse<TAuthResponse>> {
    const response = await $api.post<TAuthResponse>('/login', data);
    return response;
  }

  static async logout(): Promise<void> {
    await $api.post('/logout');
  }
}