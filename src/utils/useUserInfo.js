import { useState } from 'react';
import handleUserInfo from './handleUserInfo';

const useUserInfo = () => {
  const getUserInfo = () => {
    const userInfoString = sessionStorage.getItem('_user-info');
    const userInfo = JSON.parse(userInfoString);
    return userInfo;
  };

  const [userInfo, setUserInfo] = useState(getUserInfo());

  const saveUserInfo = (userData) => {
    sessionStorage.setItem('_user-info', JSON.stringify(userData));
    setUserInfo(userData);
  };

  const fetchUserInfo = async (token) => {
    const res = await handleUserInfo(token);

    if (res) {
      saveUserInfo(res);
    }
  };

  const deleteUserInfo = () => {
    sessionStorage.removeItem('_user-info');
  };

  return {
    userInfo,
    setUserInfo: saveUserInfo,
    fetchUserInfo,
    deleteUserInfo,
  };
};

export default useUserInfo;
