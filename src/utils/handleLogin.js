import axios from '~/api/axios';

const LOGIN_URL = '/auth/login';

const handleLogin = async (email, password, setError) => {
  try {
    // Go to axios.js in src/api to change rest api link
    const res = await axios.post(LOGIN_URL, JSON.stringify({ email, password }), {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    if (res?.status === 200) {
      return res.data;
    }
  } catch (err) {
    if (!err?.res) {
      setError({
        email: 'No server response',
        password: 'No server response',
      });
    } else if (err.res?.status === 403) {
      setError({
        email: 'Invalid username or password',
        password: 'Invalid username or password',
      });
    } else {
      setError({
        email: 'Login failed',
        password: 'Login failed',
      });
    }
  }
};

export default handleLogin;
