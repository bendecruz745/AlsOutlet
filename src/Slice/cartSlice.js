import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "Cart",
  initialState: { items: {}, total: 0 },
  reducers: {
    addItem: (state, item) => {
      if (state.items.hasOwnProperty(item.payload.name)) {
        state.items = {
          ...state.items,
          [item.payload.name]: {
            cost: item.payload.cost.$numberDecimal,
            amount: state.items[item.payload.name].amount + 1,
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

      const newTotal = calcTotal(state);
      state.total = newTotal;
      console.log(state.total);
    },
    deductItem: (state, item) => {},
    removeItem: (state, item) => {},
  },
});

function calcTotal(state) {
  const keys = Object.keys(state.items);
  let total = 0;
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    total = total + state.items[key]["cost"] * state.items[key]["amount"];
  }
  total = Math.ceil(total * 100) / 100;
  return total.toFixed(2);
}

export const { addItem, deductItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
