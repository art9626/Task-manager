import { ADD_FILTER, CLEAR, FilterActionsType } from './filter-actions';

export type FilterType = 'in-progress' | 'completed' | 'collective';

const initialState = '' as '' | FilterType;

export const filterReducer = (state = initialState, action: FilterActionsType) => {
  switch (action.type) {
  case ADD_FILTER:
    return action.payload;

  case CLEAR: 
    return initialState;
  
  default:
    return state;
  }
};