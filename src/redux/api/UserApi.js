import { createApi } from "@reduxjs/toolkit/query/react";
import CustomFetchBase from "./CustomFetchBase";

export const UserApi = createApi({
  reducerPath: "AllUserApi",
  baseQuery: CustomFetchBase,
  tagTypes: ["ALLUSERS"],
  endpoints: (build) => ({
    getAllUserById: build.query({
        query: (id) => ({
          url: `api/getUsersdetails?user_id=${id}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["ALLUSERS"],
      }),
    // getAllUserById: build.query({
    //   query: (id) => ({
    //     url: `api/getposts?user_id=${id}`,
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   }),
    //   providesTags: ["ALLEMPLOYEE"],
    // }),
    // getAllemployeeBySearchData: build.query({
    //   query: (search) => ({
    //     url: `/allemployee/${search}`,
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   }),
    //   providesTags: ["ALLEMPLOYEE"],
    // }),

    // addAllemployee: build.mutation({
    //     query: (data) => ({
    //       url: `/allemployee/registration`,
    //       method: "POST",
    //       body: data,
    //       headers: {
    //         "Content-Type": "application/json; charset=UTF-8",
    //       },
    //     }),
    //     invalidatesTags: ["ALLEMPLOYEE"],
    //   }),
     

    // editAllemployee: build.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/allemployee/update/${id}`,
    //     method: "PATCH",
    //     body: data,
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   }),
    //   invalidatesTags: ["ALLEMPLOYEE"],
    // }),
    // deleteAllemployee: build.mutation({
    //   query: (id) => ({
    //     url: `/allemployee/delete/${id}`,
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   }),
    //   invalidatesTags: ["ALLEMPLOYEE"],
    // }),
  }),
});

export const { 
    useGetAllUserByIdQuery
} = UserApi;