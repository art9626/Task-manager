import { DispatchType } from '../redux/store';
import validationRules from './validation-rules';

export function validator (title: string, text: string, dispatch: DispatchType, actions: any) {
  let errors = 0;
  if (!validationRules.minLength(title, 1)) {
    dispatch(actions.setFormErrorTitle('Field is requered'));
    errors++;
  }
  if (!validationRules.minLength(text, 1)) {
    dispatch(actions.setFormErrorText('Field is requered'));
    errors++;
  }
  return errors;
};