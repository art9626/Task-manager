import { ThunkAction } from 'redux-thunk';
import { CollectiveTodosApi } from '../../../api/collective-todos-api';
import { validator } from '../../../helpers/validator';
import { DispatchType, InferActionsType, RootStateType } from '../../store';
import { formErrorsActions } from '../form-errors/form-errors-actions';
import { todosStatusListsActions, TTodosStatusListsActions } from '../todosStatusLists/todos-status-lists-actions';
import { ICollectiveTodo } from './collective-todos-reducer';


export interface ILoadCollectiveTodos {
  created: ICollectiveTodo[];
  subscribed: ICollectiveTodo[];
}

export type CollectiveTodosActionsType = InferActionsType<typeof collectiveTodosActions>;
type ThunkActionType = ThunkAction<void, RootStateType, unknown, CollectiveTodosActionsType & TTodosStatusListsActions>;

export const SET_COLLECTIVE_TODOS = 'todo/collectiveTodos/SET_COLLECTIVE_TODOS';
export const ADD_COLLECTIVE_TODO = 'todo/collectiveTodos/ADD_COLLECTIVE_TODO';
export const SET_COMPLETE_COLLECTIVE_TODO = 'todo/collectiveTodos/SET_COMPLETE_COLLECTIVE_TODO';
export const EDIT_COLLECTIVE_TODO = 'todo/collectiveTodos/EDIT_COLLECTIVE_TODO';
export const DELETE_COLLECTIVE_TODO = 'todo/collectiveTodos/DELETE_COLLECTIVE_TODO';
export const SET_IS_LOADING = 'todo/collectiveTodos/IS_LOADING';
export const CLEAR = 'todo/collectiveTodos/CLEAR';

export const collectiveTodosActions = {
  setCollectiveTodos: (payload: ILoadCollectiveTodos) => ({ type: SET_COLLECTIVE_TODOS, payload }) as const,
  addCollectiveTodo: (payload: ICollectiveTodo) => ({ type: ADD_COLLECTIVE_TODO, payload }) as const,
  setCompleteCollectiveTodo: (payload: ICollectiveTodo) => ({ type: SET_COMPLETE_COLLECTIVE_TODO, payload }) as const,
  editCollectiveTodo: (payload: ICollectiveTodo) => ({ type: EDIT_COLLECTIVE_TODO, payload }) as const,
  deleteCollectiveTodo: (payload: string) => ({ type: DELETE_COLLECTIVE_TODO, payload }) as const,
  setIsLoading: (payload: boolean) => ({ type: SET_IS_LOADING, payload }) as const,
  clear: () => ({ type: CLEAR }) as const,
};


export const loadCollectiveTodos = (): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    dispatch(collectiveTodosActions.setIsLoading(true));
    const response = await CollectiveTodosApi.loadCollectiveTodos();
    dispatch(collectiveTodosActions.setCollectiveTodos(response.data));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(collectiveTodosActions.setIsLoading(false));
  }
};

export const createCollectiveTodo = (title: string, text: string, subscribers: string[]): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    if (validator(title, text, dispatch, formErrorsActions) > 0) return;

    dispatch(todosStatusListsActions.setCreateTodoIsLoading(true));
    const response = await CollectiveTodosApi.createCollectiveTodo({ title, text, subscribers });
    dispatch(collectiveTodosActions.addCollectiveTodo(response.data));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(todosStatusListsActions.setCreateTodoIsLoading(false));
  }
};

export const completeCollectiveTodo = (id: string): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    dispatch(todosStatusListsActions.addTodoToIsLoadingList(id));
    const response = await CollectiveTodosApi.completeCollectiveTodo(id);
    dispatch(collectiveTodosActions.setCompleteCollectiveTodo(response.data));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(todosStatusListsActions.removeTodoFromIsLoadingList(id));
  }
};

export const editCollectiveTodo = (id: string, title: string, text: string, subscribers: string[]): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    if (validator(title, text, dispatch, formErrorsActions) > 0) return;

    dispatch(todosStatusListsActions.addTodoToIsLoadingList(id));
    const response = await CollectiveTodosApi.editCollectiveTodo(id, title, text, subscribers);
    dispatch(collectiveTodosActions.editCollectiveTodo(response.data));
    dispatch(todosStatusListsActions.removeTodoFromEditList(id));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(todosStatusListsActions.removeTodoFromIsLoadingList(id));
  }
};

export const deleteCollectiveTodo = (id: string): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    dispatch(todosStatusListsActions.addTodoToIsLoadingList(id));
    await CollectiveTodosApi.deleteCollectiveTodo(id);
    dispatch(collectiveTodosActions.deleteCollectiveTodo(id));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(todosStatusListsActions.removeTodoFromIsLoadingList(id));
  }
};