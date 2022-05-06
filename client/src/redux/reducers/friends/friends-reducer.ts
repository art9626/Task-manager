import { ADD_FRIEND, ADD_TO_EDITING_IN_PROGRESS, CANCEL_REQUEST, CLEAR, CONFIRM_REQUEST, DENY_REQUEST, FriendsActionsType, REMOVE_FRIEND, REMOVE_FROM_EDITING_IN_PROGRESS, SET_ALL, SET_IS_LOADING, SET_REQUESTS_TO } from './friends-actions';

export type TFriends = {
  addedFriends: string[];
  requestsTo: string[];
  requestsFrom: string[];
}

const initialState = {
  friends: {
    addedFriends: [],
    requestsTo: [],
    requestsFrom: [],
  } as TFriends,
  isLoading: false,
  editingInProgress: [] as string[],
};

export const friendsReducer = (state = initialState, action: FriendsActionsType) => {
  switch (action.type) {
  case SET_ALL:
    return {
      ...state,
      friends: action.payload,
    };

  case SET_REQUESTS_TO:
    return {
      ...state,
      requestsTo: action.payload,
    };

  case REMOVE_FRIEND:
    return {
      ...state,
      friends: {
        ...state.friends,
        addedFriends: state.friends.addedFriends.filter((item) => item !== action.payload),
      }
    };

  case ADD_FRIEND:
    return {
      ...state,
      friends: {
        ...state.friends,
        requestsTo: [
          ...state.friends.requestsTo,
          action.payload
        ],
      }
    };

  case CONFIRM_REQUEST:
    return {
      ...state,
      friends: {
        ...state.friends,
        addedFriends: [
          ...state.friends.addedFriends,
          action.payload
        ],
        requestsFrom: state.friends.requestsFrom.filter((item) => item !== action.payload)
      }
    };

  case DENY_REQUEST:
    return {
      ...state,
      friends: {
        ...state.friends,
        requestsFrom: state.friends.requestsFrom.filter((item) => item !== action.payload)
      }
    };

  case CANCEL_REQUEST:
    return {
      ...state,
      friends: {
        ...state.friends,
        requestsTo: state.friends.requestsTo.filter((item) => item !== action.payload)
      }
    };

  case ADD_TO_EDITING_IN_PROGRESS:
    return {
      ...state,
      editingInProgress: [...state.editingInProgress, action.payload],
    };

  case REMOVE_FROM_EDITING_IN_PROGRESS:
    return {
      ...state,
      editingInProgress: state.editingInProgress.filter((item) => item !== action.payload),
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
  }
};