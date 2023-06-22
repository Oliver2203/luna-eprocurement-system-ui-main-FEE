import axios from '~/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const LOGIN_URL = '/auth/login';

export const loginUser = createAsyncThunk('auth/login', async ({ email, password, setError }, { rejectWithValue }) => {
  try {
    const res = await axios.post(LOGIN_URL, JSON.stringify({ email, password }), {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    if (res.status === 200) {
      return res.data.accessToken;
    }
  } catch (err) {
    if (err?.response) {
      setError({
        email: err.response.data.message,
        password: err.response.data.message,
      });
    } else {
      setError({
        email: 'No server response',
        password: 'No server response',
      });
    }
    return rejectWithValue(err.response.data);
  }
});

const REGISTER_URL = '/auth/register';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, username, password, setError }, { rejectWithValue }) => {
    try {
      await axios.post(REGISTER_URL, JSON.stringify({ email, username, password }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
    } catch (err) {
      if (err?.response) {
        setError({
          email: err.response.data.message,
          password: err.response.data.message,
        });
      } else {
        setError({
          email: 'No server response',
          password: 'No server response',
        });
      }
      return rejectWithValue(err.response.data);
    }
  },
);
