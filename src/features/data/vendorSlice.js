import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vendors: [
    {
      id: 1,
      name: 'Adidas',
      price: '$23.00',
    },
    {
      id: 2,
      name: 'Mango',
      price: '$24.00',
    },
    {
      id: 3,
      name: 'Holister',
      price: '$25.00',
    },
  ],
};

export const vendorSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    setVendor: (state, action) => {
      const { name, price, id } = action.payload;

      state.vendors = state.vendors.map((vendor) => {
        if (vendor.id === id) {
          return {
            id: id,
            name: name,
            price: price,
          };
        }
        return vendor;
      });
    },
  },
});

export const { setVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
