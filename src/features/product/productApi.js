import { apiSlice } from "../api/apiSlice";


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
                // dispatch(
                //   apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
                //     draft?.data.push(data);
                //   })
                // );
              } catch (err) {}
            },
          }),
        deleteProduct: builder.mutation({
            query: (id) => ({
              url: `/admin/product/delete-product/${id}`,
              method: "DELETE",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
              try {
                const { data } = await queryFulfilled;
                // dispatch(
                //   apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
                //     draft?.data = draft?.data.filter((product) => product._id !== id);
                //   })
                // );
              } catch (err) {}
            },
        }),
    }),
});

export const {  useGetProductsQuery, useAddProductMutation, useDeleteProductMutation } = productApi;