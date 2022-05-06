import { UserType } from './../redux/reducers/auth/auth-reducer';
import { AxiosResponse } from 'axios';
import { $api } from '.';

type UsersResponseType = UserType[];

export class UsersApi {
  static async loadUsers(): Promise<AxiosResponse<UsersResponseType>> {
    return await $api.get<UsersResponseType>('/users');
  }
}