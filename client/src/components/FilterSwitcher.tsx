import React, { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getFilter } from '../redux/reducers/filter/filter-selectors';


const FilterSwitcher: React.FC = React.memo(() => {
  const filter = useSelector(getFilter);
  const [searchParams, setSearchParams] = useSearchParams();



  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.textContent === 'All') {
      if (searchParams.get('filter')) setSearchParams({});
    }
    if (e.currentTarget.textContent === 'In progress') {
      if (searchParams.get('filter') !== 'in-progress') setSearchParams({ filter: 'in-progress' });
    }
    if (e.currentTarget.textContent === 'Completed') {
      if (searchParams.get('filter') !== 'completed') setSearchParams({ filter: 'completed' });
    }
  };


  return (
    <ul>
      <li>
        <button style={{ color: filter ? 'black' : 'blue' }} onClick={onClick}>All</button>
      </li>
      <li>
        <button style={{ color: filter === 'in-progress' ? 'blue' : 'black' }} onClick={onClick}>In progress</button>
      </li>
      <li>
        <button style={{ color: filter === 'completed' ? 'blue' : 'black' }} onClick={onClick}>Completed</button>
      </li>
    </ul>
  );
});

export default FilterSwitcher;