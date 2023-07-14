import axios from '~/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEntityInfo = createAsyncThunk(
  'entity/fetchEntityInfo',
  async ({ token, legalEntityCode }, { rejectWithValue }) => {
    const ENTITY_URL = `/api/entity/${legalEntityCode}/info`;

    try {
      const res = await axios.get(ENTITY_URL, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      // return res.data.data[0];
      return res.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
