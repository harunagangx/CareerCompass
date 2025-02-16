import { apiService } from '@/services/apiService';

export const userService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getAccountInfo: build.mutation({
      query: () => ({
        url: '/user/get-account-info',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAccountInfoMutation } = userService;
