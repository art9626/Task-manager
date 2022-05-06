import { ADD_TODO_TO_EDIT_LIST, ADD_TODO_TO_IS_LOADING_LIST, REMOVE_TODO_FROM_EDIT_LIST, REMOVE_TODO_FROM_IS_LOADING_LIST, SET_CREATE_TODO_IS_LOADING, TTodosStatusListsActions } from './todos-status-lists-actions';

const initialState = {
  editModeList: [] as string[],
  isLoadingList: [] as string[],
  createTodoIsLoading: false,
};


export const todosStatusListsReducer = (state = initialState, action: TTodosStatusListsActions) => {
  switch (action.type) {

  case ADD_TODO_TO_EDIT_LIST:
    return {
      ...state,
      editModeList: [
        ...state.editModeList,
        action.payload,
      ],
    };

  case REMOVE_TODO_FROM_EDIT_LIST:
    return {
      ...state,
      editModeList: state.editModeList.filter((item) => item !== action.payload),
    };

  case ADD_TODO_TO_IS_LOADING_LIST:
    return {
      ...state,
      isLoadingList: [...state.isLoadingList, action.payload]
    };

  case REMOVE_TODO_FROM_IS_LOADING_LIST:
    return {
      ...state,
      isLoadingList: state.isLoadingList.filter((item) => item !== action.payload),
    };

  case SET_CREATE_TODO_IS_LOADING:
    return {
      ...state,
      createTodoIsLoading: action.payload,
    };

  default:
    return state;
  }
};