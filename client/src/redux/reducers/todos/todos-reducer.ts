import { ADD_TODO, SET_COMPLETE_TODO, DELETE_TODO, SET_TODOS, TodosActionsType, CLEAN, EDIT_TODO_TEXT, SET_IS_LOADING } from './todos-actions';

export interface ITodo {
  _id: string;
  title: string;
  text: string;
  complete: boolean;
}


const initialState = {
  isLoading: false,
  error: null as null | string,
  todos: [] as ITodo[],
};


export const todosReducer = (state = initialState, action: TodosActionsType) => {
  switch (action.type) {
  case SET_TODOS:
    return {
      ...state,
      todos: action.payload,
    };

  case SET_IS_LOADING:
    return {
      ...state,
      isLoading: action.payload,
    };

  case ADD_TODO:
    return {
      ...state,
      todos: [
        action.payload,
        ...state.todos,
      ],
    };

  case DELETE_TODO:
    return {
      ...state,
      todos: state.todos.filter((item) => item._id !== action.payload),
    };

  case EDIT_TODO_TEXT:
    return {
      ...state,
      todos: state.todos.map((item) => {
        if (item._id === action.payload.id) {
          return {
            ...item,
            title: action.payload.title,
            text: action.payload.text,
          };
        }
        return item;
      }),
    };

  case SET_COMPLETE_TODO:
    return {
      ...state,
      todos: state.todos.map((item) => {
        if (action.payload === item._id) {
          return {
            ...item,
            complete: !item.complete,
          };
        }
        return item;
      }),
    };

  case CLEAN:
    return initialState;

  default:
    return state;
  }
};