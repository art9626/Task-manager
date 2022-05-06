import { SET_FORM_ERROR_TEXT, SET_FORM_ERROR_TITLE, TFormErrorsActions } from './form-errors-actions';


const initialState = {
  formErrorTitle: '',
  formErrorText: '',
};


export const formErrorsReducer = (state = initialState, action: TFormErrorsActions) => {
  switch (action.type) {

  case SET_FORM_ERROR_TITLE:
    return {
      ...state,
      formErrorTitle: action.payload,
    };

  case SET_FORM_ERROR_TEXT:
    return {
      ...state,
      formErrorText: action.payload,
    };

  default:
    return state;
  }
};