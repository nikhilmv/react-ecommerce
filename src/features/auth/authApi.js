import { apiSlice } from "../api/apiSlice";
import { adminLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled; 
          
          localStorage.setItem(
            "adminAuth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              admin: result.data.user,
            })
          );
          dispatch(
            adminLoggedIn({
              accessToken: result.data.accessToken,
              admin: result.data.user,
            })
          );
        } catch (err) {
          console.log("dddd");
          
        }
      },
    }),
  }),
});

export const { useAdminLoginMutation } = authApi;
