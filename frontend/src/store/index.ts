import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices';
import taskReducer from './slices/taskSlices'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks:taskReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setCredentials'],
        ignoredPaths: ['auth.credentials'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;