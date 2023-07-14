import axios from '~/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMemberList = createAsyncThunk(
  'memberList/fetchMemberList',
  async ({ token, legalEntityCode }, { rejectWithValue }) => {
    const USER_LIST_URL = `/api/entity/${legalEntityCode}/account`;

    try {
      const res = await axios.get(USER_LIST_URL, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      // return res.data.data;
      return res.data;
    } catch (err) {
      if (err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.messages);
    }
  },
);
