import { createSelector } from 'reselect';
import { getFilter } from '../filter/filter-selectors';
import { RootStateType } from './../../store';

export const getTodos = (state: RootStateType) => state.todos.todos;
export const getIsLoading = (state: RootStateType) => state.todos.isLoading;

export const getActualTodos = createSelector(
  getTodos,
  getFilter,
  (todos, filter) => {
    return todos.filter((item) => {
      if (filter === 'in-progress') return !item.complete;
      if (filter === 'completed') return item.complete;
      return true;
    });
  }
);