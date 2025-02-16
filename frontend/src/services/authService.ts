import { apiService } from '@/services/apiService';

export const authService = apiService.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: ({ email, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
    userRegister: build.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    verifyEmail: build.mutation({
      query: ({ email, otp }) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: { email, otp },
      }),
    }),
    resendOTP: build.mutation({
      query: ({ email }) => ({
        url: '/auth/resend-otp',
        method: 'POST',
        body: { email },
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useVerifyEmailMutation,
  useLogoutMutation,
} = authService;
