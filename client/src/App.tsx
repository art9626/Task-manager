import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import Loyout from './components/Loyout';
import Privat from './components/Private';
import EntryPage from './pages/EntryPage';
import FriendsPage from './pages/FriendsPage';
import TodosPage from './pages/TodosPage';
import { checkAuth } from './redux/reducers/auth/auth-actions';
import { getIsAuthorization, getIsLoading } from './redux/reducers/auth/auth-selector';
import { filterActions } from './redux/reducers/filter/filter-actions';
import { FilterType } from './redux/reducers/filter/filter-reducer';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuthorization);
  const isLoading = useSelector(getIsLoading);
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const filterParam = searchParams.get('filter');


  useEffect(() => {
    if (pathname === '/todos' || pathname === '/collective-todos') {
      if (!filterParam) {
        dispatch(filterActions.addFilter(''));
      }
      if (filterParam === 'in-progress' || filterParam === 'completed') {
        dispatch(filterActions.addFilter(filterParam as FilterType));
      }
    }
  }, [dispatch, filterParam, pathname]);


  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [dispatch]);



  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <Routes>
      <Route path='/' element={<Loyout isAuth={isAuth} />} >
        <Route
          index
          element={
            localStorage.getItem('token') ?
              <Navigate to='/todos' />
              :
              <h1>Start page</h1>
          }
        />
        <Route
          path='todos'
          element={
            <Privat isAuth={isAuth}>
              <TodosPage />
            </Privat>
          }
        />
        <Route
          path='collective-todos'
          element={
            <Privat isAuth={isAuth}>
              <TodosPage />
            </Privat>
          }
        />
        <Route
          path='friends'
          element={
            <Privat isAuth={isAuth}>
              <FriendsPage />
            </Privat>
          }
        />
        <Route
          path='entry/:type'
          element={
            <EntryPage isAuth={isAuth} />
          }
        />
        <Route
          path='*'
          element={<div>Page not found</div>}
        />
      </Route>
    </Routes>
  );
};

export default App;
