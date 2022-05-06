import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, registration } from '../redux/reducers/auth/auth-actions';


type TEntryForm = {
  type: string;
}


const EntryForm: React.FC<TEntryForm> = React.memo(({ type }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    type === 'login' ?
      dispatch(login({ email, password }))
      :
      dispatch(registration({ email, password, name }));
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };


  return (
    <form
      onSubmit={onSubmit}
    >
      <label>
        Email:
        <input
          onChange={onChangeEmail}
          value={email}
          type='text'
        />
      </label>
      {
        type === 'registration' &&
        <label>
          Name:
          <input
            onChange={onChangeName}
            value={name}
            type='text'
          />
        </label>
      }
      <label>
        Password:
        <input
          onChange={onChangePassword}
          value={password}
          type='password'
        />
      </label>
      <button> {type === 'login' ? 'Login' : 'Registartion'}</button>
    </form>
  );
});

export default EntryForm;