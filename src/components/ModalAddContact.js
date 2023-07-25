import Input from './Input';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addContact } from '~/api/vendorService';
import useToken from '~/utils/useToken';

const ModalAddContact = React.memo(({ handleClose, toggleAddState }) => {
  const { token } = useToken();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const { vendorCode } = useParams();

  const handleAdd = async () => {
    const res = await addContact(token, vendorCode, [
      {
        name,
        phone,
        position,
      },
    ]);

    if (res) {
      handleClose();
      toggleAddState();
    }
  };

  return (
    <div className="p-9 bg-white rounded-[20px]" onClick={(ev) => ev.stopPropagation()}>
      <h3 className="font-bold font-inter text-2xl leading-[30px] text-black">Add new contact</h3>
      <div className="h-[3px] w-[500px] mt-3 bg-primary"></div>
      <div className="flex mt-4 gap-4 flex-col">
        <Input onChange={(ev) => setName(ev.target.value)} value={name} id={'name'} type="text" label="Full Name" />
        <Input
          onChange={(ev) => setPhone(ev.target.value)}
          value={phone}
          id={'phone'}
          type="text"
          label="Phone Number"
        />
        <Input
          onChange={(ev) => setPosition(ev.target.value)}
          value={position}
          id={'position'}
          type="text"
          label="Position"
        />
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

export default ModalAddContact;
