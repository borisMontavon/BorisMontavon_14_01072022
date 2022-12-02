import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import newEmployeeReducer from '../features/newEmployee/newEmployeeSlice';
import employeesReducer from '../features/employees/employeesSlice';

export const store = configureStore({
  reducer: {
    newEmployee: newEmployeeReducer,
    employees: employeesReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
