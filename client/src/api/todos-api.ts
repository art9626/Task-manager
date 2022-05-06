import { AxiosResponse } from 'axios';
import { $api } from '.';
import { ITodo } from './../redux/reducers/todos/todos-reducer';


type LoadTodosResponseType = [
  {
    _id: string;
    user: string;
    todos: ITodo[];
  }
]

type CreateTodoPayloadType = {
  title: string;
  text: string;
  complete: boolean;
}

export interface IStandartResponse {
  message: string;
}

type DeleteOrCompleteTodoPayloadType = {
  todoId: string;
}

type EditTodoPayloadType = {
  todoId: string;
  title: string;
  text: string;
}

type EndpointType = 'delete' | 'complete';




export class TodosApi {
  static async loadTodos(): Promise<AxiosResponse<LoadTodosResponseType>> {
    return await $api.get<LoadTodosResponseType>('/todos');
  }

  static async createTodo(title: string, text: string): Promise<AxiosResponse<ITodo>> {
    const todo: CreateTodoPayloadType = {title, text, complete: false};
    return await $api.post<ITodo>('/create', { todo });
  }

  static async deleteOrCompleteTodo(id: string, endpoint: EndpointType): Promise<AxiosResponse<IStandartResponse>> {
    const todoId: DeleteOrCompleteTodoPayloadType = { todoId: id };
    return await $api.post<IStandartResponse>(`/${endpoint}`, todoId);
  }

  static async editTodo(id: string, title: string, text: string): Promise<AxiosResponse<IStandartResponse>> {
    const editData: EditTodoPayloadType = { todoId: id, title, text };
    return await $api.post<IStandartResponse>('/edit', editData);
  }
}