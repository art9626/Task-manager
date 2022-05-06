import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFormErrorText, getFormErrorTitle } from '../redux/reducers/form-errors/form-errors-selector';
import FriendsSelector from './FriendsSelector';


interface ITodoFormProps {
  resetTitleError: () => void;
  resetTextError: () => void;
  submitHandler: (title: string, text: string, subscribers?: string[]) => void;
  buttonsGroup: React.ReactNode;
  initialTitle: string;
  initialText: string;
  isCollective?: boolean;
  addedSubscribers?: string[];
}



const TodoForm: React.FC<ITodoFormProps> = React.memo(({
  submitHandler,
  resetTitleError,
  resetTextError,
  buttonsGroup,
  initialTitle,
  initialText,
  isCollective,
  addedSubscribers = [''],
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [text, setText] = useState(initialText);
  const [subscribers, setSubscribers] = useState<string[]>(addedSubscribers);
  const titleError = useSelector(getFormErrorTitle);
  const textError = useSelector(getFormErrorText);



  const onAddSubscriber = (index: number, name: string) => {
    const actualSubscribers = [...subscribers];
    if (actualSubscribers.find((item) => item === name)) return;
    actualSubscribers[index] = name;
    setSubscribers(actualSubscribers);
  };


  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isCollective ?
      submitHandler(title, text, subscribers.filter((item) => item !== ''))
      :
      submitHandler(title, text);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (titleError) {
      resetTitleError();
    }
    setTitle(e.currentTarget.value);
  };

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (textError) {
      resetTextError();
    }
    setText(e.currentTarget.value);
  };


  return (
    <form onSubmit={onSubmit}>
      <label>
        Title:
        <input
          type='title'
          value={title}
          onChange={onChangeTitle}
        />
        {
          titleError && <span style={{ color: 'red' }}>{titleError}</span>
        }
      </label>
      <label>
        Text:
        <textarea
          value={text}
          onChange={onChangeText}
        />
        {
          textError && <span style={{ color: 'red' }}>{textError}</span>
        }
      </label>
      {
        isCollective &&
        <>
          {
            subscribers.map((item, index) => {
              return (
                <FriendsSelector subscribers={subscribers} key={index} index={index} onAddSubscriber={onAddSubscriber} />
              );
            })
          }
          <button type='button' onClick={() => setSubscribers([...subscribers, ''])}>Add</button>
        </>

      }
      {
        buttonsGroup
      }
    </form>
  );
});

export default TodoForm;