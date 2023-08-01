import axios from './axios';

export const createProduct = async (token, product) => {
  const PRODUCT_URL = `/api/product`;

  try {
    await axios.post(PRODUCT_URL, JSON.stringify(product), {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return true;
  } catch (err) {
    console.log(!err?.res);
    return undefined;
  }
};

export const getProducts = async (token, legalEntityCode, page) => {
  const SIZE = 3;
  const PRODUCT_URL = `/api/product/${legalEntityCode}?page=${page}&size=${SIZE}`;

  try {
    const res = await axios.get(PRODUCT_URL, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(!err?.res);
    return undefined;
  }
};

export const getProductInfo = async (token, legalEntityCode, productCode) => {
  const PRODUCT_URL = `/api/product/${legalEntityCode}/${productCode}`;

  try {
    const res = await axios.get(PRODUCT_URL, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return res.data.data;
  } catch (err) {
    console.log(!err?.res);
    return undefined;
  }
};

export const searchProduct = async (token, legalEntityCode, search) => {
  const PRODUCT_URL = `api/product/${legalEntityCode}?search=${search}`;

  try {
    const res = await axios.get(PRODUCT_URL, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return res.data.data;
  } catch (err) {
    console.log(!err?.res);
    return undefined;
  }
};

export const addVendor = async (token, productCode, vendorCode, price) => {
  const VENDOR_URL = `/api/product/assignToVendor`;

  try {
    await axios.post(VENDOR_URL, JSON.stringify({ productCode, vendorCode, price }), {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return true;
  } catch (err) {
    console.log(!err?.res);
    return undefined;
  }
};

export const patchVendorPrice = async (token, legalEntityCode, productCode, vendorCode, price) => {
  const VENDOR_URL = `/api/product/${legalEntityCode}/${productCode}/${vendorCode}/${price}`;

  try {
    await axios.patch(
      VENDOR_URL,
      {},
      {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        withCredentials: true,
      },
    );
    return true;
  } catch (err) {
    console.log(!err?.res);
    return undefined;
  }
};

export const deleteProduct = async (token, productCode) => {
  const PRODUCT_URL = `/api/product/${productCode}`;

  try {
    await axios.delete(PRODUCT_URL, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return true;
  } catch (err) {
    console.log(!err?.res);
    return undefined;
  }
};
