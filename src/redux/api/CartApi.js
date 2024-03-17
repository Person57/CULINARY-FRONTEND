import { createApi } from "@reduxjs/toolkit/query/react";
import CustomFetchBase from "./CustomFetchBase";

export const CartApi = createApi({
  reducerPath: "CartApi",
  baseQuery: CustomFetchBase,
  tagTypes: ["CART"],
  endpoints: (build) => ({
    getCart: build.query({
      query: (id) => ({
        url: `/api/getcart?user_id=65ec07e3d00ba8fde2944927`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["CART"],
    }),
   

    placeOrder: build.mutation({
        query: (userId) => ({
          url: `/api/addcart`,
          method: "POST",
          body:{
            
                "user_id": userId,
                "placeOrder": "Yes"
            
          },
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["CART"],
      }),
  }),
});

export const { useGetCartQuery,usePlaceOrderMutation } = CartApi;
