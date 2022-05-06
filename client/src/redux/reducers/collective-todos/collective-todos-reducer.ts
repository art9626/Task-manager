import { ADD_COLLECTIVE_TODO, CLEAR, CollectiveTodosActionsType, SET_COLLECTIVE_TODOS, SET_IS_LOADING, SET_COMPLETE_COLLECTIVE_TODO, EDIT_COLLECTIVE_TODO, DELETE_COLLECTIVE_TODO } from './collective-todos-actions';


export interface ISubscriberType {
  email: string;
  complete: boolean;
}

export interface ICollectiveTodo {
  _id: string;
  author: string;
  complete: boolean;
  title: string;
  text: string;
  subscribers: ISubscriberType[];
}

const initialState = {
  collectiveTodos: {
    created: [] as ICollectiveTodo[],
    subscribed: [] as ICollectiveTodo[],
  },
  isLoading: false,
};


export const collectiveTodosReducer = (state = initialState, action: CollectiveTodosActionsType) => {
  switch (action.type) {

  case ADD_COLLECTIVE_TODO:
    return {
      ...state,
      collectiveTodos: {
        ...state.collectiveTodos,
        created: [
          ...state.collectiveTodos.created,
          action.payload,
        ],
      }
    };


  case SET_COLLECTIVE_TODOS:
    return {
      ...state,
      collectiveTodos : action.payload,
    };

  case SET_COMPLETE_COLLECTIVE_TODO:
    if (state.collectiveTodos.created.find((item) => item._id === action.payload._id)) {
      return {
        ...state,
        collectiveTodos: {
          ...state.collectiveTodos,
          created: state.collectiveTodos.created.map((item) => {
            if (item._id === action.payload._id) {
              return action.payload;
            }
            return item;
          })
        }
      };
    } else {
      return {
        ...state,
        collectiveTodos: {
          ...state.collectiveTodos,
          subscribed: state.collectiveTodos.subscribed.map((item) => {
            if (item._id === action.payload._id) {
              return action.payload;
            }
            return item;
          })
        }
      };
    }

  case EDIT_COLLECTIVE_TODO:
    return {
      ...state,
      collectiveTodos: {
        ...state.collectiveTodos,
        created: state.collectiveTodos.created.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        })
      }
    };

  case DELETE_COLLECTIVE_TODO:
    return {
      ...state,
      collectiveTodos: {
        ...state.collectiveTodos,
        created: state.collectiveTodos.created.filter((item) => item._id !== action.payload)
      }
    };
  
  case SET_IS_LOADING:
    return {
      ...state,
      isLoading: action.payload,
    };

  case CLEAR:
    return initialState;  

  default:
    return state;
  };
};