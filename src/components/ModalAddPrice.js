import Input from './Input';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addVendor } from '~/api/productService';
import useToken from '~/utils/useToken';

const ModalAddPrice = React.memo(({ handleClose, toggleAddState }) => {
  const { token } = useToken();

  const [vendorCode, setVendorCode] = useState('');
  const [price, setPrice] = useState('');
  const { productCode } = useParams();

  const handleAdd = async () => {
    const res = await addVendor(token, productCode, vendorCode, price);

    if (res) {
      toggleAddState();
      handleClose();
    }
  };

  return (
    <div className="p-9 bg-white rounded-[20px]" onClick={(ev) => ev.stopPropagation()}>
      <h3 className="font-bold font-inter text-2xl leading-[30px] text-black">Add new vendor</h3>
      <div className="h-[3px] w-[500px] mt-3 bg-primary"></div>
      <div className="flex mt-4 gap-4 flex-col">
        <Input
          onChange={(ev) => setVendorCode(ev.target.value)}
          value={vendorCode}
          id={'vendor-code'}
          type="text"
          label="Vendor Code"
        />
        <Input onChange={(ev) => setPrice(ev.target.value)} value={price} id={'price'} type="text" label="Price" />
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

export default ModalAddPrice;
