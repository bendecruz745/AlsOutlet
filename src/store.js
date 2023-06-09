import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slice/cartSlice";

export default configureStore({
  reducer: { cart: cartReducer },
});
