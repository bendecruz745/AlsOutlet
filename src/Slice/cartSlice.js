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

      state.total = calcTotal(state);
    },
    removeItem: (state, item) => {
      const { [item.payload]: removedItem, ...updatedItems } = state.items;
      state.items = updatedItems;
      state.total = calcTotal(state);
    },
    modifyItemAmount: (state, modifyAmount) => {
      const item = modifyAmount.payload.item;
      console.log(parseInt(modifyAmount.payload.amount, 10));
      state.items = {
        ...state.items,
        [item]: {
          cost: state.items[item]["cost"],
          amount: parseInt(modifyAmount.payload.amount, 10),
        },
      };

      state.total = calcTotal(state);
    },
  },
});

// function removeItem(items, itemToRemove) {
//   const { [itemToRemove]: removedItem, ...rest } = items;
//   return rest;
// }

function calcTotal(state) {
  const keys = Object.keys(state.items);
  let total = 0;
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    total = total + state.items[key]["cost"] * state.items[key]["amount"];
  }
  total = Math.ceil(total * 100) / 100;

  if (total === 0) {
    return 0;
  } else {
    return total.toFixed(2);
  }
}

export const { addItem, deductItem, removeItem, modifyItemAmount } =
  cartSlice.actions;

export default cartSlice.reducer;
