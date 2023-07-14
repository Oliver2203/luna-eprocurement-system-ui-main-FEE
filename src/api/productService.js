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

export const getProductPrices = async (token, legalEntityCode, productCode) => {
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
