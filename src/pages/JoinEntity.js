import { useEffect, useState } from 'react';
import Input from '~/components/Input';
import PrimaryButton from '~/components/PrimaryButton';

function JoinEntity({ setToken, setEntity }) {
  // Set document title
  document.title = 'Join Entity';

  const [entityCode, setEntityCode] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [entityCode]);

  const handleSubmit = () => {
    console.log('Hello');
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
      <PrimaryButton onClick={handleSubmit}>Create a Legal Entity</PrimaryButton>
    </div>
  );
}

export default JoinEntity;
