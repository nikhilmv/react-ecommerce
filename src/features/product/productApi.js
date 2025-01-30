import { apiSlice } from "../api/apiSlice";


export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (data) => ({
              url: "/product/add-product",
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
    }),
});

export const { useAddProductMutation } = productApi;