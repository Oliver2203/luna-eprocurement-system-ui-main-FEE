import axios from '~/api/axios';

const USER_URL = '/api/account';

const handleUserInfo = async (token) => {
  try {
    const res = await axios.get(USER_URL, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err.res?.status);
  }
};

export default handleUserInfo;
