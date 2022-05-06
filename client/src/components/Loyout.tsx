import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { logout } from '../redux/reducers/auth/auth-actions';
import { getUserData } from '../redux/reducers/auth/auth-selector';
import { todosActions } from '../redux/reducers/todos/todos-actions';

type LoyoutPropsType = {
  isAuth: boolean;
}

const Loyout: React.FC<LoyoutPropsType> = React.memo(({ isAuth }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUserData);


  const onLogout = () => {
    dispatch(logout());
    dispatch(todosActions.clean());
  };


  return (
    <>
      <header>
        <div>{user?.email}</div>
        {
          isAuth ?
            <>
              <nav>
                <ul>
                  <li>
                    Todos
                    <ul>
                      <li>
                        <Link to='/todos'>Standart todos</Link>
                      </li>
                      <li>
                        <Link to='/collective-todos'>Collective todos</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to='/friends'>Friends</Link>
                  </li>
                </ul>
              </nav>
              <button onClick={onLogout}>Logout</button>
            </>
            :
            <>
              <Link to='/entry/registration'>Registration</Link>
              <Link to='/entry/login'>Login</Link>
            </>
        }
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
});

export default Loyout;