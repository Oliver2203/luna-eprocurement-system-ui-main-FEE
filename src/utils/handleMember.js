import axios from '~/api/axios';

const handleMember = async (type, value, email, token) => {
  const MEMBER_CHANGE_URL = `/api/${type}/set-${type}`;

  try {
    const res = await axios.post(MEMBER_CHANGE_URL, JSON.stringify({ code: value, email }), {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    if (res?.status === 200) {
      return true;
    }
  } catch (err) {
    console.log(!err?.res);
  }
};

export default handleMember;
