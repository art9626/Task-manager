import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { completeCollectiveTodo, deleteCollectiveTodo, editCollectiveTodo } from '../redux/reducers/collective-todos/collective-todos-actions';
import { ICollectiveTodo } from '../redux/reducers/collective-todos/collective-todos-reducer';
import { formErrorsActions } from '../redux/reducers/form-errors/form-errors-actions';
import { completeTodo, deleteTodo, editTodo } from '../redux/reducers/todos/todos-actions';
import { todosStatusListsActions } from '../redux/reducers/todosStatusLists/todos-status-lists-actions';
import { getTodoEditMode, getTodoIsLoading } from '../redux/reducers/todosStatusLists/todos-status-lists-selectors';
import { RootStateType } from '../redux/store';
import TodoCard from './TodoCard';
import TodoForm from './TodoForm';


type TTodoItemProps = {
  todo: ICollectiveTodo;
  isCollective?: boolean;
  editing?: boolean;
}


const TodoItem: React.FC<TTodoItemProps> = React.memo(({ todo, isCollective = false, editing = true }) => {
  const dispatch = useDispatch();
  const editMode = useSelector((state: RootStateType) => getTodoEditMode(state, todo._id));
  const isLoading = useSelector((state: RootStateType) => getTodoIsLoading(state, todo._id));


  const submitHandler = (title: string, text: string, subscribers?: string[]) => {
    if (!isCollective) dispatch(editTodo(todo._id, title, text));
    if (isCollective) dispatch(editCollectiveTodo(todo._id, title, text, subscribers as string[]));
  };

  const resetTitleError = () => {
    dispatch(formErrorsActions.setFormErrorTitle(''));
  };

  const resetTextError = () => {
    dispatch(formErrorsActions.setFormErrorText(''));
  };

  const onDelete = (id: string) => {
    if (!isCollective) dispatch(deleteTodo(id));
    if (isCollective) dispatch(deleteCollectiveTodo(id));
  };

  const onComplete = (id: string) => {
    if (!isCollective) dispatch(completeTodo(id));
    if (isCollective) dispatch(completeCollectiveTodo(id));
  };

  const onOpenEdit = (id: string) => {
    dispatch(todosStatusListsActions.addTodoToEditList(id));
  };




  const buttonsGroup = useMemo(
    () => {
      const onCloseEdit = (id: string) => {
        dispatch(todosStatusListsActions.removeTodoFromEditList(id));
      };

      return (
        <div>
          <button disabled={isLoading} type='submit'>Save</button>
          <button onClick={() => onCloseEdit(todo._id)} type='button'>Close</button>
        </div>
      );
    },
    [isLoading, dispatch, todo._id]
  );


  return (
    <li
      style={{
        marginBottom: '20px',
        padding: '10px',
        border: '1px solid #666666',
        borderRadius: '10px',
        backgroundColor: todo.complete ? '#a2f5b9' : '#f7b0c0',
        cursor: 'pointer',
      }}
    >
      {
        editMode ?
          null
          :
          editing ?
            <button onClick={() => onOpenEdit(todo._id)}>Edit</button>
            :
            null
      }
      {
        editMode ?
          <TodoForm
            resetTitleError={resetTitleError}
            resetTextError={resetTextError}
            submitHandler={submitHandler}
            buttonsGroup={buttonsGroup}
            initialTitle={todo.title}
            initialText={todo.text}
            isCollective={isCollective}
            addedSubscribers={todo.subscribers.map((item) => item.email)}
          />
          :
          <TodoCard
            todo={todo}
            onComplete={onComplete}
            onDelete={onDelete}
            isCollective={isCollective}
            editing={editing}
          />
      }
    </li>
  );
});


export default TodoItem;