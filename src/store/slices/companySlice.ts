import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Company } from '../../types';

interface CompanyState {
  company: Company | null;
  loading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  company: null,
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },
    clearCompany: (state) => {
      state.company = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCompany, clearCompany, setLoading, setError } = companySlice.actions;
export default companySlice.reducer;