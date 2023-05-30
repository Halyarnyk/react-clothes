import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProductForPage: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    addProduct: (state, action) => {
      state.quantity += 1;
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
    removeProduct: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (existingProduct) {
        if (existingProduct.quantity > 0) {
          state.quantity -= 1;
          existingProduct.quantity -= 1;
          state.total -= action.payload.price;
        }
        if (existingProduct.quantity === 0) {
          state.products = state.products.filter(
            (product) => product._id !== action.payload._id
          );
        }
      }
    },
    deleteProduct: (state, action) => {
      const deletedProduct = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (deletedProduct) {
        state.quantity -= deletedProduct.quantity;
        state.total -= deletedProduct.price * deletedProduct.quantity;
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      }
    },
    updateProductQuantity: (state, action) => {
      const updatedProducts = action.payload;
      let newTotal = 0;
      let newQuantity = 0;

      updatedProducts.forEach((product) => {
        newTotal += product.price * product.quantity;
        newQuantity += product.quantity;
      });

      state.products = updatedProducts;
      state.total = newTotal;
      state.quantity = newQuantity;

      // Update total to 0 if quantity is 0
      if (newQuantity === 0) {
        state.total = 0;
      }
    },
  },
});

export const {
  addProductForPage,
  addProduct,
  removeProduct,
  deleteProduct,
  updateProductQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
