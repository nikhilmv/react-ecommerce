import { apiSlice } from "../api/apiSlice";
import { useSelector } from "react-redux";
 
export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
              url: "/admin/product/get-admin-products",
              method: "GET",
            }),
        }),
        addProduct: builder.mutation({
            query: (data) => ({
              url: "/admin/product/add-product",
              method: "POST",
              body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
 
                    if (data?.success && data?.product) {
                      dispatch(
                        apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {

                        // Add to the products array in the cached data
                        draft.products.unshift(data.product); // or push()

                        })
                      );
                    }
                  } catch (err) {
                    console.error("Error updating cache:", err);
                  }
            },
          }),
        deleteProduct: builder.mutation({
            query: (id) => ({
              url: `/admin/product/delete-product/${id}`,
              method: "DELETE",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
              try {
                await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
                        draft.products = draft.products.filter(product => product._id !== arg);
                    })
                );
            } catch (err) {
                console.error("Error updating cache:", err);
            }
            },
        }),
        GetProductsFront: builder.query({ 
          query: ({ keyword = "", category = "", price = [0, 200000], ratings = 0, currentPage = 1 ,refetchKey = 0 }) => ({ 
              url: "/user/product/get-products",
              method: "GET",
              params: {
                keyword,
                category,
                minPrice: price[0],
                maxPrice: price[1],
                ratings,
                page: currentPage,
                refetchKey,
              },
            }),

        }),
        getProductDetails: builder.query({
          query: (id) => ({
            url: `/user/product/get-product-detail/${id}`,
            method: "GET",
          }),
        }),


    }),
});

export const {  useGetProductsQuery, useAddProductMutation, useDeleteProductMutation, useGetProductsFrontQuery,useGetProductDetailsQuery } = productApi;