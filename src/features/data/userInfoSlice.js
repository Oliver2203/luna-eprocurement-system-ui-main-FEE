import { createSlice } from '@reduxjs/toolkit';
import { createEntity, fetchUserInfo, joinEntity } from '../actions/userInfoAction';

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Case fetch user info
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Case create entity code
      .addCase(createEntity.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userInfo.legalEntityCode = action.payload;
        state.userInfo.role = 'MANAGER';
      })
      .addCase(createEntity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // case join entity code
      .addCase(joinEntity.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(joinEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userInfo.legalEntityCode = action.payload;
        state.userInfo.role = 'MEMBER';
      })
      .addCase(joinEntity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
