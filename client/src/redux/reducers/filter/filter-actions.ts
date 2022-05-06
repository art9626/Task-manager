import { InferActionsType } from '../../store';
import { FilterType } from './filter-reducer';


export type FilterActionsType = InferActionsType<typeof filterActions>;

export const ADD_FILTER = 'todo/filter/ADD_FILTER';
export const CLEAR = 'todo/filter/CLEAR';

export const filterActions = {
  addFilter: (payload: FilterType | '') => ({ type: ADD_FILTER, payload }) as const,
  clear: () => ({ type: CLEAR }) as const,
};