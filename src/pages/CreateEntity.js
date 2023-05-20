import { useState, useEffect } from 'react';
import handleInput from '~/utils/validator';
import Input from '~/components/Input';
import PrimaryButton from '~/components/PrimaryButton';
import handleCreateEntity from '~/utils/handleCreateEntity';
import { useNavigate } from 'react-router-dom';

function CreateEntity({ setToken, entity }) {
  // Set page title
  useEffect(() => {
    document.title = 'Create Entity';
  }, []);

  const navigate = useNavigate();

  const [entityCode, setEntityCode] = useState('');
  const [bussinessNum, setBussinessNum] = useState('');

  const [error, setError] = useState({
    entity: '',
    bussinessNum: '',
  });

  useEffect(() => {
    setError({
      entity: '',
      bussinessNum: '',
    });
  }, [entityCode, bussinessNum]);

  const handleSubmit = () => {
    const entityCodeError = handleInput(entityCode, 'required', 'entityCode');
    const bussinessNumError = handleInput(bussinessNum, 'required');

    setError({
      entity: entityCodeError,
      bussinessNum: bussinessNumError,
    });

    if (entityCode === undefined && bussinessNumError === undefined) {
      const res = handleCreateEntity(bussinessNum, entityCode, setError);

      if (res) {
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
