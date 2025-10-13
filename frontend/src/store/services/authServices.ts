import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../apis/AxiosConfig';
import type{ AuthRequest, RegisterResponse, LoginResponse, LogoutResponse } from '../../types/user';

export const registerUser = createAsyncThunk<RegisterResponse, AuthRequest, { rejectValue: { message: string } }>(
  'auth/register',
  async (credentials: AuthRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/register', credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk<LoginResponse, AuthRequest, { rejectValue: { message: string } }>(
  'auth/login',
  async (credentials: AuthRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk<LogoutResponse, number, { rejectValue: { message: string } }>(
  'auth/logout',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/auth/logout/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);