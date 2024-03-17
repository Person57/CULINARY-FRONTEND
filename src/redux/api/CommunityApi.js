import { createApi } from "@reduxjs/toolkit/query/react";
import CustomFetchBase from "./CustomFetchBase";



export const CommunityApi = createApi({
  reducerPath: "CommunityApi",
  baseQuery: CustomFetchBase,
  tagTypes: ["COMMUNITY"],
  endpoints: (build) => ({
    getCommunity: build.query({
      query: (id) => ({
        url: `api/getcommunityposts?user_id=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["COMMUNITY"],
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
     
    createCommunity: build.mutation({
      query: ({id,communityName}) => ({
        url: `/api/updateUsers`,
        method: "PUT",
        body:{
            "user_id":id,
            "communityName":communityName
        },
        headers: {
                "Content-Type": "application/json; charset=UTF-8",
              },
       
      }),
      invalidatesTags: ["COMMUNITY"],
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
    useCreateCommunityMutation,
    useGetCommunityQuery
} = CommunityApi;