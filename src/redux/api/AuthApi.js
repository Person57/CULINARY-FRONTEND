import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/userSlice";
import customFetchBase from "./CustomFetchBase";

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
        // headers: {
        //   "Content-Type": "application/json; charset=UTF-8",
        // },
      }),
    }),
    forgetUser: builder.mutation({
      query: (email) => ({
        url: "/userlogin/forget-email",
        method: "POST",
        body: email,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
    }),
    otpVerify: builder.mutation({
      query: (otp) => ({
        url: "/userlogin/verifyOTP",
        method: "POST",
        body: otp,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ Email, data }) => ({
        url: `userlogin/reset-password/${Email}`,
        method: "PATCH",
        body: data,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
    }),
    
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgetUserMutation,
  useOtpVerifyMutation,
  useResetPasswordMutation
} = AuthApi;