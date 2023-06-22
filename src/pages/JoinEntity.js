import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '~/components/Input';
import PrimaryButton from '~/components/PrimaryButton';
import useToken from '~/utils/useToken';
import handleInput from '~/utils/validator';
import { useDispatch, useSelector } from 'react-redux';
import { joinEntity } from '~/features/actions/userInfoAction';

function JoinEntity() {
  // Set document title
  useEffect(() => {
    document.title = 'Join Entity';
  }, []);

  const { token } = useToken();

  const navigate = useNavigate();
  const { userInfo, loading } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const [entityCode, setEntityCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (userInfo?.legalEntityCode && !loading) {
      navigate('/');
    }
  }, [userInfo, loading, navigate]);

  useEffect(() => {
    setError('');
  }, [entityCode]);

  const handleSubmit = async () => {
    const entityCodeError = handleInput(entityCode, 'required', 'entityCode');

    setError(entityCodeError);

    if (entityCodeError === undefined) {
      dispatch(joinEntity({ token, legalEntityCode: entityCode, setError }));
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
