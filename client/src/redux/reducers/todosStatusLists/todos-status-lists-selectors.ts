import { RootStateType } from '../../store';


export const getTodoEditMode = (state: RootStateType, id: string) => state.todosStatusLists.editModeList.some((item) => item === id);
export const getTodoIsLoading = (state: RootStateType, id: string) => state.todosStatusLists.isLoadingList.some((item) => item === id);
export const getCreateTodoIsLoading = (state: RootStateType) => state.todosStatusLists.createTodoIsLoading;