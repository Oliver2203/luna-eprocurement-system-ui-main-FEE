import axios from '~/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProductList = createAsyncThunk(
  'departmentList/getDepartmentList',
  async ({ token, legalEntityCode }, { rejectWithValue }) => {
    const PRODUCT_URL = `/api/product/${legalEntityCode}`;
    try {
      const res = await axios.get(PRODUCT_URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
