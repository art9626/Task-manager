import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCollectiveTodo } from '../redux/reducers/collective-todos/collective-todos-actions';
import { formErrorsActions } from '../redux/reducers/form-errors/form-errors-actions';
import { createTodo } from '../redux/reducers/todos/todos-actions';
import { getCreateTodoIsLoading } from '../redux/reducers/todosStatusLists/todos-status-lists-selectors';
import TodoForm from './TodoForm';


interface IAddTodoProps {
  isCollective: boolean;
}


const AddTodo: React.FC<IAddTodoProps> = React.memo(({ isCollective }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getCreateTodoIsLoading);


  const submitHandler = (title: string, text: string, subscribers?: string[]) => {
    if (isCollective) {
      dispatch(createCollectiveTodo(title, text, subscribers as string[]));
    } else {
      dispatch(createTodo(title, text));
    }
  };

  const resetTitleError = () => {
    dispatch(formErrorsActions.setFormErrorTitle(''));
  };

  const resetTextError = () => {
    dispatch(formErrorsActions.setFormErrorText(''));
  };

  const buttonsGroup = useMemo(
    () => <button disabled={isLoading}>Add todo</button>, 
    [isLoading]
  );


  return (
    <TodoForm
      resetTitleError={resetTitleError}
      resetTextError={resetTextError}
      submitHandler={submitHandler}
      buttonsGroup={buttonsGroup}
      initialTitle=''
      initialText=''
      isCollective={isCollective}
    />
  );
});



export default AddTodo;