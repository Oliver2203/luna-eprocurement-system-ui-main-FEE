import axios from './axios';

const fetchUserInfo = async (token) => {
  const USER_API = '/api/account';

  try {
    const res = await axios.get(USER_API, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export default fetchUserInfo;
