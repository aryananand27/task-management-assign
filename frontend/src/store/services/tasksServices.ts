import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../apis/AxiosConfig';
import type{ TaskRequests, CreateTaskResponse, Task,UpdateTaskResponse, TaskUpdates } from '../../types/tasks';

export const createTask = createAsyncThunk<CreateTaskResponse, TaskRequests, { rejectValue: { message: string } }>(
  'tasks/createTask',
  async (taskData: TaskRequests, { rejectWithValue }) => {
    try {
      const response = await axios.post('/tasks', taskData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTasks = createAsyncThunk<Task[], { userId: number }, { rejectValue: { message: string } }>(
  'tasks/fetchTasks',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/tasks/${userId}`);
      return response.data.rows;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateTask = createAsyncThunk<UpdateTaskResponse, { id: number; updates: TaskUpdates }, { rejectValue: { message: string } }>(
  'tasks/updateTask',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/tasks/${id}`, updates);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteTask = createAsyncThunk<{ message: string }, { id: number }, { rejectValue: { message: string } }>(
  'tasks/deleteTask',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/tasks/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);