import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};


const addToCartSlice = createSlice({        
    name: "cartItems",
    initialState,
    reducers:{
        addToCart: (state, action) => {
            console.log("action", action.payload);
            
            const { item, type } = action.payload;
            const existingItem = state.cartItems.find((i) => i._id === item._id);
            if (existingItem) {
                if (type === "increase") {
                    existingItem.quantity += 1;
                } else if (type === "decrease") {
                    if (existingItem.quantity > 1) {
                        existingItem.quantity -= 1;
                    }
                }
            } else {
                state.cartItems.push({ ...item, quantity: 1 });  

            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        },
        removeCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
              (item) => item._id !== action.payload
            );
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        },

    }

});

export default addToCartSlice.reducer;
export const { addToCart , removeCart} = addToCartSlice.actions;