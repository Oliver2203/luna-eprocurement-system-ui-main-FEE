import axios from './axios';

export const createTeam = async (token, name, code, departmentCode) => {
  const TEAM_URL = `/api/team`;

  try {
    await axios.post(TEAM_URL, JSON.stringify({ teamCode: code, teamName: name, departmentCode }), {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return true;
  } catch (err) {
    console.log(!err?.res);
    return undefined;
  }
};

export const setUserTeam = async (token, code, userEmail) => {
  const TEAM_URL = `/api/team/set-team`;

  try {
    await axios.post(TEAM_URL, JSON.stringify({ teamCode: code, userEmail }), {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return true;
  } catch (err) {
    console.log(!err?.res);
    return undefined;
  }
};
