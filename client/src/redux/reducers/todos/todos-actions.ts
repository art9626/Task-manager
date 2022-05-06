import { ThunkAction } from 'redux-thunk';
import { TodosApi } from '../../../api/todos-api';
import { validator } from '../../../helpers/validator';
import { DispatchType, InferActionsType, RootStateType } from '../../store';
import { formErrorsActions } from '../form-errors/form-errors-actions';
import { todosStatusListsActions, TTodosStatusListsActions } from '../todosStatusLists/todos-status-lists-actions';
import { ITodo } from './todos-reducer';



export type TodosActionsType = InferActionsType<typeof todosActions>;
type ThunkActionType = ThunkAction<void, RootStateType, unknown, TodosActionsType & TTodosStatusListsActions>;

export const SET_TODOS = 'todo/todos/SET_TODOS';
export const SET_IS_LOADING = 'todo/todos/SET_IS_LOADING';
export const ADD_TODO = 'todo/todos/ADD_TODO';
export const DELETE_TODO = 'todo/todos/DELETE_TODO';
export const EDIT_TODO_TEXT = 'todo/todos/EDIT_TODO_TEXT';
export const SET_COMPLETE_TODO = 'todo/todos/SET_COMPLETE_TODO';
export const CLEAN = 'todo/todos/CLEAN';


export const todosActions = {
  setTodos: (payload: ITodo[]) => ({ type: SET_TODOS, payload }) as const,
  setIsLoading: (payload: boolean) => ({ type: SET_IS_LOADING, payload }) as const,
  addTodo: (payload: ITodo) => ({ type: ADD_TODO, payload }) as const,
  deleteTodo: (payload: string) => ({ type: DELETE_TODO, payload }) as const,
  editTodoText: (payload: { id: string, title: string, text: string }) => ({ type: EDIT_TODO_TEXT, payload }) as const,
  setCompleteTodo: (payload: string) => ({ type: SET_COMPLETE_TODO, payload }) as const,
  clean: () => ({ type: CLEAN }) as const,
};

export const loadTodos = (): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    dispatch(todosActions.setIsLoading(true));
    const response = await TodosApi.loadTodos();
    dispatch(todosActions.setTodos(response.data[0].todos));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(todosActions.setIsLoading(false));
  }
};

export const createTodo = (title: string, text: string): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    if (validator(title, text, dispatch, formErrorsActions) > 0) return;

    dispatch(todosStatusListsActions.setCreateTodoIsLoading(true));
    const response = await TodosApi.createTodo(title, text);
    dispatch(todosActions.addTodo(response.data));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(todosStatusListsActions.setCreateTodoIsLoading(false));
  }
};

export const editTodo = (id: string, title: string, text: string): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    if (validator(title, text, dispatch, formErrorsActions) > 0) return;

    dispatch(todosStatusListsActions.addTodoToIsLoadingList(id));
    await TodosApi.editTodo(id, title, text);
    dispatch(todosActions.editTodoText({ id, title, text }));
    dispatch(todosStatusListsActions.removeTodoFromEditList(id));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(todosStatusListsActions.removeTodoFromIsLoadingList(id));
  }
};

export const deleteTodo = (id: string): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    dispatch(todosStatusListsActions.addTodoToIsLoadingList(id));
    await TodosApi.deleteOrCompleteTodo(id, 'delete');
    dispatch(todosActions.deleteTodo(id));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(todosStatusListsActions.removeTodoFromIsLoadingList(id));
  }
};

export const completeTodo = (id: string): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    dispatch(todosStatusListsActions.addTodoToIsLoadingList(id));
    await TodosApi.deleteOrCompleteTodo(id, 'complete');
    dispatch(todosActions.setCompleteTodo(id));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(todosStatusListsActions.removeTodoFromIsLoadingList(id));
  }
};


