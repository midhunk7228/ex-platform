import { Middleware } from '@reduxjs/toolkit';
import { setError, setLoading } from '../slices/authSlice';

export const apiMiddleware: Middleware = ({ dispatch }) => (next) => async (action) => {
  if (!action.meta?.api) {
    return next(action);
  }

  const { url, method, data, onSuccess, onError } = action.meta.api;

  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const result = await response.json();

    if (onSuccess) {
      dispatch(onSuccess(result));
    }

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    dispatch(setError(errorMessage));

    if (onError) {
      dispatch(onError(errorMessage));
    }

    return null;
  } finally {
    dispatch(setLoading(false));
  }
};