import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "Cart",
  initialState: { items: {} },
  reducers: {
    addItem: (state, item) => {
      if (state.items.hasOwnProperty(item.payload.name)) {
        console.log("yo theres already " + item.payload.name + " in here");

        state.items = {
          ...state.items,
          [item.payload.name]: {
            cost: item.payload.cost.$numberDecimal,
            amount: state.items["Chicken Pastigiana"].amount + 1,
          },
        };
      } else {
        state.items = {
          ...state.items,
          [item.payload.name]: {
            cost: item.payload.cost.$numberDecimal,
            amount: 1,
          },
        };
      }
      console.log(state.items);
    },
    deductItem: (state, item) => {},
    removeItem: (state, item) => {},
  },
});

export const { addItem, deductItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
