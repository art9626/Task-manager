import React from 'react';
import { useLocation } from 'react-router-dom';
import AddTodo from '../components/AddTodo';
import CollectiveTodos from '../components/CollectiveTodos';
import FilterSwitcher from '../components/FilterSwitcher';
import TodosList from '../components/TodosList';

const TodosPage: React.FC = React.memo(() => {
  const location = useLocation();
  const isStandart = location.pathname === '/todos';
  const isCollective = location.pathname === '/collective-todos';


  return (
    <section>
      {
        isCollective && <h1>Collective todos</h1>
      }
      {
        isStandart && <h1>Standart todos</h1>
      }
      <AddTodo isCollective={isCollective} />
      <FilterSwitcher />
      {
        isStandart ? <TodosList /> : null
      }
      {
        isCollective ? <CollectiveTodos /> : null
      }
    </section>
  );
});

export default TodosPage;