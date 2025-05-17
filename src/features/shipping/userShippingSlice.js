import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
    shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || [],
};


const userShippingSlice = createSlice({        
    name: "shippingInfo",
    initialState,
    reducers:{
        saveShippingAddress: (state, action) => {
           
            console.log("action", action.payload);
             
            state.shippingInfo = [{ ...action.payload }];  
            localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));

        },
    }

});

export default userShippingSlice.reducer;
export const { saveShippingAddress } = userShippingSlice.actions;