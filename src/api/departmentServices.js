import axios from '~/api/axios';

export const createDepartment = async (token, name, code, legalEntityCode) => {
  const DEPARTMENT_URL = `/api/department`;

  try {
    await axios.post(DEPARTMENT_URL, JSON.stringify({ departmentCode: code, departmentName: name, legalEntityCode }), {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return true;
  } catch (err) {
    console.log(!err?.res);
    return undefined;
  }
};

export const setUserDepartment = async (token, code, userEmail) => {
  const DEPARTMENT_URL = `/api/department/set-department`;

  try {
    await axios.post(DEPARTMENT_URL, JSON.stringify({ departmentCode: code, userEmail }), {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return true;
  } catch (err) {
    console.log(!err?.res);
    return undefined;
  }
};
