import { AxiosResponse } from 'axios';
import { $api } from '.';
import { TFriends } from '../redux/reducers/friends/friends-reducer';

type TLoadFriendsResponse = {
  friends: TFriends;
};

type TEditFriendsRespomse = {
  message: string;
}

export class FriendsApi {
  static async loadFriends(): Promise<AxiosResponse<TLoadFriendsResponse>> {
    return await $api.get<TLoadFriendsResponse>('/friends');
  }

  static async editFriends(endpoint: string, candidateEmail: string): Promise<AxiosResponse<TEditFriendsRespomse>> {
    return await $api.post<TEditFriendsRespomse>(`/${endpoint}`, {candidateEmail});
  }
}