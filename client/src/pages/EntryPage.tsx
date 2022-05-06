import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import EntryForm from '../components/EntryForm';
import { getFilter } from '../redux/reducers/filter/filter-selectors';

type EntryPagePropsType = {
  isAuth: boolean;
}

const EntryPage: React.FC<EntryPagePropsType> = React.memo(({ isAuth }) => {
  const filter = useSelector(getFilter);
  const state = useLocation().state as { from: string };
  // Добавляем к адресу строки возврата search параметр на случай, если пользователь сразу загружал страницу с ним
  let searchParams = '';
  if (filter) searchParams = `?filter=${filter}`;
  const fromPage = state?.from ? (state?.from + searchParams) : '/';

  const { type } = useParams();
  let header;
  if (type) {
    header = type.substring(0, 1).toUpperCase() + type.substring(1);
  }

  if (isAuth) return <Navigate to={fromPage} />;

  return (
    <>
      <h1>{header}</h1>
      <EntryForm type={type as string} />
    </>
  );
});

export default EntryPage;