import axios from '~/api/axios';

const JOIN_ENTITY_URL = '/api/entity/join-entity';

const handleJoinEntity = async (legalEntityCode, token, setError) => {
  try {
    const res = await axios.post(JOIN_ENTITY_URL, JSON.stringify({ legalEntityCode }), {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    if (res?.status === 200) {
      return true;
    }
  } catch (err) {
    if (err.response) {
      setError(err.response.data.message)
      
    } else {
      setError('No server response');
    }
  }
};
export default handleJoinEntity;
