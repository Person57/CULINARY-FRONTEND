import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl = process.env.REACT_APP_BASE_URL;
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}`,
  prepareHeaders: (headers) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    } catch (error) {
      console.error("Error parsing token from localStorage:", error);
    }
    return headers;
  },
});
const CustomFetchBase = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  // if (result.error?.status === 401) {
  //   toast.warning("UnAuthorized", {
  //     position: toast.POSITION.BOTTOM_LEFT,
  //   });
  //   <ToastContainer />;
  //   localStorage.clear();
  //   window.location.href = "/";
  // }
  return result;
};
export default CustomFetchBase;
