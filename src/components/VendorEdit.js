import React, { useEffect, useState } from 'react';
import ActionButton from './ActionButton';
import handleInput from '~/utils/validator';
import { useDispatch } from 'react-redux';
import { setVendor } from '~/features/data/vendorSlice';

const VendorEdit = React.memo(({ name, price, id }) => {
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [error, setError] = useState({
    name: '',
    price: '',
  });

  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setError({
      name: '',
      price: '',
    });
  }, [editName, editPrice]);

  const handleSubmit = () => {
    const nameError = handleInput(editName, 'required');
    const priceError = handleInput(editPrice, 'required');

    setError({ name: nameError, price: priceError });

    if (nameError === undefined && priceError === undefined) {
      dispatch(setVendor({ name: editName, price: editPrice, id }));
      setEditName('');
      setEditPrice('');
      setEdit(false);
    }
  };

  const handleCancel = () => {
    setEditName('');
    setEditPrice('');
    setError({
      name: '',
      price: '',
    });
    setEdit(false);
  };
  return (
    <div className="w-full grid grid-cols-3 py-[18px]">
      {!edit ? (
        <>
          <h3 className="font-inter font-semibold leading-6 text-black flex justify-center py-[50px]">{name}</h3>
          <h3 className="font-inter font-semibold leading-6 text-black flex justify-center items-center">{price}</h3>
          <div className="flex justify-center items-center">
            <ActionButton type="edit" onClick={() => setEdit(true)} />
          </div>
        </>
      ) : (
        <>
          <div className="py-8 flex flex-col items-center">
            <input
              type="text"
              value={editName}
              onChange={(ev) => setEditName(ev.target.value)}
              className="w-[152px] p-4 font-inter font-semibold leading-6 text-black outline-none border-solid border-[2px] border-primary rounded-lg"
              placeholder={name}
            />
            <p className="text-sm text-red font-light">{error.name}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              value={editPrice}
              onChange={(ev) => setEditPrice(ev.target.value)}
              className="w-[152px] p-4 font-inter font-semibold leading-6 text-black outline-none border-solid border-[2px] border-primary rounded-lg"
              placeholder={price}
            />
            <p className="text-sm text-red font-light">{error.price}</p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <ActionButton type="done" onClick={handleSubmit} />
            <ActionButton type="cancel" onClick={handleCancel} />
          </div>
        </>
      )}
    </div>
  );
});

export default VendorEdit;
