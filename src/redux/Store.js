import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './features/userSlice'
import { AuthApi } from "./api/AuthApi";
import { HomeApi } from "./api/HomeApi";
import { UserApi } from "./api/UserApi";
import { CommunityApi } from "./api/CommunityApi";
import { CartApi } from "./api/CartApi";

export const store = configureStore({
  reducer: {
    User: UserReducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [HomeApi.reducerPath]:HomeApi.reducer,
    [UserApi.reducerPath]:UserApi.reducer,
    [CommunityApi.reducerPath]:CommunityApi.reducer,
    [CartApi.reducerPath]:CartApi.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      AuthApi.middleware,
      HomeApi.middleware,
      UserApi.middleware,
      CommunityApi.middleware,
      CartApi.middleware,
    ]),
});