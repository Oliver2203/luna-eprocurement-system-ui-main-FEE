import React, { useState } from 'react';
import Input from './Input';
import useToken from '~/utils/useToken';
import { useDispatch } from 'react-redux';
import { createTeam } from '~/api/teamService';
import { addTeam } from '~/features/data/entitySlice';

const ModalAddTeam = React.memo(({ handleClose, departmentCode }) => {
  const { token } = useToken();

  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const dispatch = useDispatch();

  const handleAdd = async () => {
    const res = await createTeam(token, name, code, departmentCode);

    console.log(departmentCode);

    if (res) {
      dispatch(addTeam({ name, code, departmentCode }));
      handleClose();
    }
  };

  return (
    <div className="p-9 bg-white rounded-[20px]" onClick={(ev) => ev.stopPropagation()}>
      <h3 className="font-bold font-inter text-2xl leading-[30px] text-black">Add Team</h3>
      <div className="h-[3px] w-[500px] mt-3 bg-primary"></div>
      <div className="flex mt-4 gap-4 flex-col">
        <Input onChange={(ev) => setName(ev.target.value)} value={name} id={'name'} type="text" label="Team Name" />
        <Input onChange={(ev) => setCode(ev.target.value)} value={code} id={'code'} type="text" label="Team Code" />
      </div>
      <div className="flex mt-6 gap-6">
        <button
          className="flex-1 py-3 border border-solid border-gray-250 rounded-lg text-black font-inter leading-6 font-medium"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          className="flex-1 py-3 font-inter leading-6 font-medium bg-primary text-white rounded-lg"
          onClick={handleAdd}
        >
          Accept
        </button>
      </div>
    </div>
  );
});

export default ModalAddTeam;
