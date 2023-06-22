import axios from '~/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const DEPARTMENT_URL = '/api/department';

export const createDepartment = createAsyncThunk(
  'departmentList/createDepartment',
  async (token, code, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        DEPARTMENT_URL,
        { code },
        {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          withCredentials: true,
        },
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
