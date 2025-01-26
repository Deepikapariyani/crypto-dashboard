// src/store/slices/cryptoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "INR",
  symbol: "₹",
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
      state.symbol = action.payload === "INR" ? "₹" : "$";
    },
  },
});

export const { setCurrency } = cryptoSlice.actions;
export default cryptoSlice.reducer;
