import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserAttributes } from '../../types/user';

interface AuthState {
  user: UserAttributes | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const loadStateFromStorage = (): Partial<AuthState> => {
  const storedUser = localStorage.getItem('user');
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    accessToken,
    refreshToken,
    isAuthenticated: !!accessToken && !!storedUser, 
  };
};

const initialState: AuthState = {
  ...loadStateFromStorage(),
  user: loadStateFromStorage().user || null,
  accessToken: loadStateFromStorage().accessToken || null,
  refreshToken: loadStateFromStorage().refreshToken || null,
  isAuthenticated: loadStateFromStorage().isAuthenticated || false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: UserAttributes; accessToken: string; refreshToken: string }>
    ) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(user)); 
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;