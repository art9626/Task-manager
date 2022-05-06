import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type PrivatPropsType = {
  children: ReactNode;
  isAuth: boolean;
}

const Privat: React.FC<PrivatPropsType> = ({ children, isAuth }) => {
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to='/entry/login' state={{ from: location.pathname }} />;
  };

  return (
    <>
      {children}
    </>
  );
};

export default Privat;


