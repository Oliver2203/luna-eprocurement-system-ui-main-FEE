import axios from './axios';

export const deleteUserFromEntity = async (token, email, legalEntityCode) => {
  const USER_URL = `/api/${legalEntityCode}/${email}`;

  try {
    await axios.delete(USER_URL, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return true;
  } catch (err) {
    console.log(!err?.res);
    return undefined;
  }
};
