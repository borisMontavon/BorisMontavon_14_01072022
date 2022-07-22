import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import newEmployeeReducer from '../features/newEmployee/newEmployeeSlice';

export const store = configureStore({
  reducer: {
    newEmployee: newEmployeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["newEmployee.setBirthDate", "newEmployee.setStartDate"],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        // ignoredPaths: ['items.dates', "newEmployee.setBirthDate"],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
