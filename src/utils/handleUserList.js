import axios from '~/api/axios';

const handleUserList = async (entityCode, token) => {
  const USER_LIST_URL = `/api/entity/${entityCode}/account`;

  try {
    const res = await axios.get(USER_LIST_URL, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err.res?.status);
  }
};

export default handleUserList;
