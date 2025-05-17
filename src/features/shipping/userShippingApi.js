import { apiSlice } from "../api/apiSlice";
import { useSelector } from "react-redux";


export const userShippingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShippingAddress: builder.query({
      query: () => ({
        url: "/user/shipping/get-shipping-address",
        method: "GET",
      }),
    }),
    saveShippingAddress: builder.mutation({
      query: (data) => ({
        url: "/user/shipping/add-shipping-address",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {  useGetShippingAddressQuery, useSaveShippingAddressMutation } = userShippingApi;
