import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userInfoReducer from '~/features/data/userInfoSlice';
import memberListReducer from './features/data/memberListSlice';
import entityReducer from './features/data/entitySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: userInfoReducer,
    memberList: memberListReducer,
    entity: entityReducer,
  },
});
