import { InferActionsType } from '../../store';



export type TTodosStatusListsActions = InferActionsType<typeof todosStatusListsActions>;

export const ADD_TODO_TO_EDIT_LIST = 'todo/statusList/ADD_TODO_TO_EDIT_LIST';
export const REMOVE_TODO_FROM_EDIT_LIST = 'todo/statusList/REMOVE_TODO_FROM_EDIT_LIST';
export const ADD_TODO_TO_IS_LOADING_LIST = 'todo/statusList/ADD_TODO_TO_IS_LOADING_LIST';
export const REMOVE_TODO_FROM_IS_LOADING_LIST = 'todo/statusList/REMOVE_TODO_FROM_IS_LOADING_LIST';
export const SET_CREATE_TODO_IS_LOADING = 'todo/statusList/SET_CREATE_TODO_IS_LOADING';


export const todosStatusListsActions = {
  addTodoToEditList: (payload: string) => ({ type: ADD_TODO_TO_EDIT_LIST, payload }) as const,
  removeTodoFromEditList: (payload: string) => ({ type: REMOVE_TODO_FROM_EDIT_LIST, payload }) as const,
  addTodoToIsLoadingList: (payload: string) => ({ type: ADD_TODO_TO_IS_LOADING_LIST, payload }) as const,
  removeTodoFromIsLoadingList: (payload: string) => ({ type: REMOVE_TODO_FROM_IS_LOADING_LIST, payload }) as const,
  setCreateTodoIsLoading: (payload: boolean) => ({ type: SET_CREATE_TODO_IS_LOADING, payload }) as const,
};