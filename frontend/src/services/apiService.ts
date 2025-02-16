import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_APP_API_URL}`,

  prepareHeaders: (headers) => {
    const token = Cookies.get('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiService = createApi({
  baseQuery,
  endpoints: () => ({}),
});
