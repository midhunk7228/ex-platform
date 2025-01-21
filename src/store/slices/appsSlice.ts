import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../services/supabase';
import type { App } from '../../types';

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
      const { data, error } = await supabase
        .from('apps')
        .select(`
          *,
          features (*)
        `);

      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch apps');
    }
  }
);

export const createApp = createAsyncThunk(
  'apps/createApp',
  async (app: Partial<App>, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('apps')
        .insert([app])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create app');
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
      })
      .addCase(createApp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createApp.fulfilled, (state, action) => {
        state.loading = false;
        state.apps.push(action.payload);
      })
      .addCase(createApp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedApp, clearSelectedApp } = appsSlice.actions;
export default appsSlice.reducer;