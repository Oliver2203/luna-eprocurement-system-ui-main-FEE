import axios from './axios';

export const createVendor = async (token, vendor) => {
  const VENDOR_URL = `/api/vendor`;

  try {
    await axios.post(VENDOR_URL, JSON.stringify(vendor), {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return true;
  } catch (err) {
    console.log(!err?.res);
    return undefined;
  }
};
