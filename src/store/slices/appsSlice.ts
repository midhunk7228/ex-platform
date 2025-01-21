import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    setApps: (state, action: PayloadAction<App[]>) => {
      state.apps = action.payload;
    },
    setSelectedApp: (state, action: PayloadAction<App>) => {
      state.selectedApp = action.payload;
    },
    clearSelectedApp: (state) => {
      state.selectedApp = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setApps, setSelectedApp, clearSelectedApp, setLoading, setError } = appsSlice.actions;
export default appsSlice.reducer;