import { createApi } from "@reduxjs/toolkit/query/react";
import CustomFetchBase from "./CustomFetchBase";

export const HomeApi = createApi({
  reducerPath: "AllPostApi",
  baseQuery: CustomFetchBase,
  tagTypes: ["ALLPOSTS"],
  endpoints: (build) => ({
    getAllPosts: build.query({
      query: (id) => ({
        url: `/api/getposts?user_id=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["ALLPOSTS"],
    }),
    filterSearch: build.query({
      query: ({userName,location,foodType}) => ({
        url: `api/getusersmaxlikedposts?name=${userName}&location=${location}&foodType=${foodType}&preferences=`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["ALLPOSTS"],
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
     

    editLike: build.mutation({
      query: ({data }) => ({
        url: `/api/like`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["ALLPOSTS"],
    }),
    unLike: build.mutation({
      query: ({data }) => ({
        url: `/api/unlike`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["ALLPOSTS"],
    }),
    getConnection: build.mutation({
      query: ({myId,userId,userName }) => ({
        url: `api/userconnections?sentBy=${myId}&sentTo=${userId}&type=Sent&name=${userName}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["ALLPOSTS"],
    }),
   
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
    useGetAllPostsQuery,
    useEditLikeMutation,
    useUnLikeMutation,
    useGetConnectionMutation,
    useFilterSearchQuery
} = HomeApi;