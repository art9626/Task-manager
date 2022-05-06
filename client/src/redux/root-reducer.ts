import { combineReducers } from 'redux';
import { authReducer } from './reducers/auth/auth-reducer';
import { collectiveTodosReducer } from './reducers/collective-todos/collective-todos-reducer';
import { filterReducer } from './reducers/filter/filter-reducer';
import { formErrorsReducer } from './reducers/form-errors/form-errors-reducer';
import { friendsReducer } from './reducers/friends/friends-reducer';
import { todosReducer } from './reducers/todos/todos-reducer';
import { todosStatusListsReducer } from './reducers/todosStatusLists/todos-status-lists-reducer';
import { usersReducer } from './reducers/users/users-reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  todos: todosReducer,
  filter: filterReducer,
  friends: friendsReducer,
  collectiveTodos: collectiveTodosReducer,
  todosStatusLists: todosStatusListsReducer,
  formErrors: formErrorsReducer,
});