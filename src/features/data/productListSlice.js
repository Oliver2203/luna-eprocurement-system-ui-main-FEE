import { createSlice } from '@reduxjs/toolkit';
import { fetchProductList } from '../actions/productListAction';

const initialState = {
  loading: false,
  productList: null,
  error: null,
  success: false,
};

const productListSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;

      state.productList = [...state.productList, product];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload;
        state.success = true;
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addProduct } = productListSlice.actions;
export default productListSlice.reducer;
