import { useState, useEffect } from 'react';
import handleInput from '~/utils/validator';
import Input from '~/components/Input';
import PrimaryButton from '~/components/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import useToken from '~/utils/useToken';
import { useDispatch, useSelector } from 'react-redux';
import { createEntity } from '~/features/actions/userInfoAction';

function CreateEntity() {
  // Set page title
  useEffect(() => {
    document.title = 'Create Entity';
  }, []);

  const { token } = useToken();

  const navigate = useNavigate();
  const { userInfo, loading } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const [entityCode, setEntityCode] = useState('');
  const [bussinessNum, setBussinessNum] = useState('');

  const [error, setError] = useState({
    entity: '',
    bussinessNum: '',
  });

  useEffect(() => {
    if (userInfo?.legalEntityCode && !loading) {
      navigate('/');
    }
  }, [userInfo, loading, navigate]);

  useEffect(() => {
    setError({
      entity: '',
      bussinessNum: '',
    });
  }, [entityCode, bussinessNum]);

  const handleSubmit = async () => {
    const entityCodeError = handleInput(entityCode, 'required', 'entityCode');
    const bussinessNumError = handleInput(bussinessNum, 'required');

    setError({
      entity: entityCodeError,
      bussinessNum: bussinessNumError,
    });

    if (entityCodeError === undefined && bussinessNumError === undefined) {
      dispatch(createEntity({ token, code: entityCode, name: bussinessNum }));
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
        error={error.entity}
      />
      <Input
        label="Bussiness Registration number"
        onChange={(ev) => setBussinessNum(ev.target.value)}
        id="bussiness"
        type="text"
        value={bussinessNum}
        error={error.bussinessNum}
      />
      <PrimaryButton onClick={handleSubmit}>Create a Legal Entity</PrimaryButton>
    </div>
  );
}

export default CreateEntity;
