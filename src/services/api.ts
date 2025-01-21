import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { App, User } from '../types';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getApps: builder.query<App[], void>({
      query: () => 'apps',
    }),
    getUser: builder.query<User, string>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetAppsQuery, useGetUserQuery } = api;