import { AxiosResponse } from 'axios';
import { $api } from '.';
import { ILoadCollectiveTodos } from '../redux/reducers/collective-todos/collective-todos-actions';
import { ICollectiveTodo } from '../redux/reducers/collective-todos/collective-todos-reducer';
import { IStandartResponse } from './todos-api';




interface ICreateCollectiveTodoData {
  title: string;
  text: string;
  subscribers: string[];
}




export class CollectiveTodosApi {
  static async loadCollectiveTodos(): Promise<AxiosResponse<ILoadCollectiveTodos>> {
    return await $api.get<ILoadCollectiveTodos>('/collective-todos');
  }

  static async createCollectiveTodo(data: ICreateCollectiveTodoData): Promise<AxiosResponse<ICollectiveTodo>> {
    return await $api.post<ICollectiveTodo>('/create-collective', data);
  }

  static async completeCollectiveTodo(todoId: string): Promise<AxiosResponse<ICollectiveTodo>> {
    return await $api.post<ICollectiveTodo>('/complete-collective', {todoId});
  }

  static async editCollectiveTodo(todoId: string, title: string, text: string, subscribers: string[]): Promise<AxiosResponse<ICollectiveTodo>> {
    return await $api.post<ICollectiveTodo>('/edit-collective', {todoId, title, text, subscribers});
  }

  static async deleteCollectiveTodo(todoId: string): Promise<AxiosResponse<IStandartResponse>> {
    return await $api.post<IStandartResponse>('/delete-collective', {todoId});
  }
}