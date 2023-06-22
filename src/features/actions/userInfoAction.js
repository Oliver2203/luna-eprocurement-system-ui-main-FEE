import axios from '~/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const USER_INFO_URL = '/api/account';

export const fetchUserInfo = createAsyncThunk('userInfo/fetchUserInfo', async ({ token }, { rejectWithValue }) => {
  try {
    const res = await axios.get(USER_INFO_URL, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    if (err.response) {
      return rejectWithValue(err.response.data);
    }
    return rejectWithValue(err.message);
  }
});

const CREATE_ENTITY_URL = '/api/entity/create-entity';

export const createEntity = createAsyncThunk(
  'userInfo/createEntity',
  async ({ token, name, code, setError }, { rejectWithValue }) => {
    try {
      await axios.post(CREATE_ENTITY_URL, JSON.stringify({ name, code }), {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return code;
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      }
      return rejectWithValue(err.message);
    }
  },
);

const JOIN_ENTITY_URL = '/api/entity/join-entity';

export const joinEntity = createAsyncThunk(
  'userInfo/joinEntity',
  async ({ token, legalEntityCode, setError }, { rejectWithValue }) => {
    try {
      await axios.post(JOIN_ENTITY_URL, JSON.stringify({ legalEntityCode }), {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return legalEntityCode;
    } catch (err) {
      if (err?.response) {
        setError(err.response.data.message);
      } else {
        setError('No server response');
      }
      if (err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
    }
  },
);
