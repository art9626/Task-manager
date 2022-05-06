import { createSelector } from 'reselect';
import { RootStateType } from '../../store';
import { getFilter } from '../filter/filter-selectors';

export const getCollectiveTodos = (state: RootStateType) => state.collectiveTodos.collectiveTodos;
export const getIsLoading = (state: RootStateType) => state.collectiveTodos.isLoading;

export const getCreatedCollectiveTodos = createSelector(
  getCollectiveTodos,
  getFilter,
  (collectiveTodos, filter) => {
    return collectiveTodos.created.filter((item) => {
      if (filter === 'in-progress') return !item.complete;
      if (filter === 'completed') return item.complete;
      return true;
    });
  },
);

export const getSubscribedCollectiveTodos = createSelector(
  getCollectiveTodos,
  getFilter,
  (collectiveTodos, filter) => {
    return collectiveTodos.subscribed.filter((item) => {
      if (filter === 'in-progress') return !item.complete;
      if (filter === 'completed') return item.complete;
      return true;
    });
  },
);