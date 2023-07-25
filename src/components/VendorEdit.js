import React, { useEffect, useState } from 'react';
import ActionButton from './ActionButton';
import handleInput from '~/utils/validator';
import { useParams } from 'react-router-dom';
import { patchVendorPrice } from '~/api/productService';
import useToken from '~/utils/useToken';

const VendorEdit = React.memo(({ name, price, vendorCode, legalEntityCode, toggleAddState }) => {
  const { token } = useToken();
  const [editPrice, setEditPrice] = useState('');
  const [error, setError] = useState('');

  const [edit, setEdit] = useState(false);

  const { productCode } = useParams();

  useEffect(() => {
    setError('');
  }, [editPrice]);

  const handleSubmit = async () => {
    const priceError = handleInput(editPrice, 'required');

    setError(priceError);

    if (priceError === undefined) {
      console.log(token)
      const res = await patchVendorPrice(token, legalEntityCode, productCode, vendorCode, editPrice);

      if (res) {
        setEditPrice('');
        setEdit(false);
        toggleAddState();
      }
    }
  };

  const handleCancel = () => {
    setEditPrice('');
    setError('');
    setEdit(false);
  };
  return (
    <div className="w-full grid grid-cols-3 py-[18px]">
      {!edit ? (
        <>
          <h3 className="font-inter font-semibold leading-6 text-black flex justify-center py-[50px]">{name}</h3>
          <h3 className="font-inter font-semibold leading-6 text-black flex justify-center items-center">
            {Number(price).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
            })}
          </h3>
          <div className="flex justify-center items-center">
            <ActionButton type="edit" onClick={() => setEdit(true)} />
          </div>
        </>
      ) : (
        <>
          <h3 className="font-inter font-semibold leading-6 text-black flex justify-center py-[50px]">{name}</h3>
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              value={editPrice}
              onChange={(ev) => setEditPrice(ev.target.value)}
              className="w-[152px] p-4 font-inter font-semibold leading-6 text-black outline-none border-solid border-[2px] border-primary rounded-lg"
              placeholder={price}
            />
            <p className="text-sm text-red font-light">{error}</p>
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
