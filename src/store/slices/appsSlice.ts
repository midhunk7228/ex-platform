import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { App } from '../../types';
import { api } from '../../services/api';

interface AppsState {
  apps: App[];
  selectedApp: App | null;
  loading: boolean;
  error: string | null;
}

const initialState: AppsState = {
  apps: [],
  selectedApp: null,
  loading: false,
  error: null,
};

export const fetchApps = createAsyncThunk(
  'apps/fetchApps',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/apps');
      if (!response.ok) throw new Error('Failed to fetch apps');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch apps');
    }
  }
);

const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    setSelectedApp: (state, action) => {
      state.selectedApp = action.payload;
    },
    clearSelectedApp: (state) => {
      state.selectedApp = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApps.fulfilled, (state, action) => {
        state.loading = false;
        state.apps = action.payload;
      })
      .addCase(fetchApps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedApp, clearSelectedApp } = appsSlice.actions;
export default appsSlice.reducer;