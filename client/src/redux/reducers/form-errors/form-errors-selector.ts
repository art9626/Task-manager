import { RootStateType } from '../../store';


export const getFormErrorTitle = (state: RootStateType) => state.formErrors.formErrorTitle;
export const getFormErrorText = (state: RootStateType) => state.formErrors.formErrorText;