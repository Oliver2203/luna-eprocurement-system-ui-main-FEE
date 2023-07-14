import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userInfoReducer from '~/features/data/userInfoSlice';
import memberListReducer from './features/data/memberListSlice';
import entityReducer from './features/data/entitySlice';
import productListReducer from './features/data/productListSlice';
import vendorReducer from './features/data/vendorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: userInfoReducer,
    memberList: memberListReducer,
    entity: entityReducer,
    productList: productListReducer,
    vendor: vendorReducer,
  },
});
