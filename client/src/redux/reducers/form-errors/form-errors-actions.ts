import { InferActionsType } from '../../store';


export type TFormErrorsActions = InferActionsType<typeof formErrorsActions>;

export const SET_FORM_ERROR_TITLE = 'todo/todos/SET_FORM_ERROR_TITLE';
export const SET_FORM_ERROR_TEXT = 'todo/todos/SET_FORM_ERROR_TEXT';


export const formErrorsActions = {
  setFormErrorTitle: (payload: string) => ({ type: SET_FORM_ERROR_TITLE, payload }) as const,
  setFormErrorText: (payload: string) => ({ type: SET_FORM_ERROR_TEXT, payload }) as const,
};