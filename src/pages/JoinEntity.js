import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '~/components/Input';
import PrimaryButton from '~/components/PrimaryButton';
import handleJoinEntity from '~/utils/handleJoinEntity';
import useToken from '~/utils/useToken';
import handleInput from '~/utils/validator';
import useUserInfo from '~/utils/useUserInfo';

function JoinEntity() {
  // Set document title
  useEffect(() => {
    document.title = 'Join Entity';
  }, []);

  const { token } = useToken();
  const { fetchUserInfo } = useUserInfo();

  const navigate = useNavigate();

  const [entityCode, setEntityCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [entityCode]);

  const handleSubmit = async () => {
    const entityCodeError = handleInput(entityCode, 'required', 'entityCode');

    setError(entityCodeError);

    if (entityCodeError === undefined) {
      const res = await handleJoinEntity(entityCode, token);

      if (res) {
        await fetchUserInfo(token);
        navigate('/');
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 py-9">
      <Input
        label="Legal Entity Code"
        onChange={(ev) => setEntityCode(ev.target.value)}
        id="entity"
        type="text"
        value={entityCode}
        error={error}
      />
      <PrimaryButton onClick={handleSubmit}>Join a Legal Entity</PrimaryButton>
    </div>
  );
}

export default JoinEntity;
