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

export const getVendors = async (token, page) => {
  const SIZE = 3;
  const VENDOR_URL = `/api/vendor?page=${page}&size=${SIZE}`;

  try {
    const res = await axios.get(VENDOR_URL, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(!err?.res);
    return undefined;
  }
};

export const searchVendor = async (token, search) => {
  const VENDOR_URL = `/api/vendor?search=${search}&page=1&size=3`;

  try {
    const res = await axios.get(VENDOR_URL, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return res.data.data;
  } catch (err) {
    console.log(!err?.res);
    return undefined;
  }
};

export const getVendorInfo = async (token, vendorCode) => {
  const VENDOR_URL = `/api/vendor/${vendorCode}`;

  try {
    const res = await axios.get(VENDOR_URL, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return res.data.data;
  } catch (err) {
    console.log(!err?.res);
    return undefined;
  }
};

export const addContact = async (token, vendorCode, contact) => {
  const VENDOR_URL = `/api/vendor/${vendorCode}/addContact`;

  try {
    await axios.post(VENDOR_URL, JSON.stringify(contact), {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return true;
  } catch (err) {
    console.log(!err?.res);
    return undefined;
  }
};
