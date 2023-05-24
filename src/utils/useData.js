import { useState } from 'react';
import handleUserInfo from './handleUserInfo';
const useData = () => {
  const getData = () => {
    const dataString = sessionStorage.getItem('data');
    const userData = JSON.parse(dataString);
    return userData;
  };

  const [data, setData] = useState(getData());

  const saveData = (userData) => {
    sessionStorage.setItem('data', JSON.stringify(userData));
    setData(userData);
  };
  const fetchUserInfo = async (token) => {
    const res = await handleUserInfo(token);

    if (res) {
      
      saveData(res);
    }
  };
  const deleteData = () => {
    sessionStorage.removeItem('data');
  
  }
  return {
    data,
    setData: saveData,
    fetchUserInfo, 
    deleteData
  };
};

export default useData;
