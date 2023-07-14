import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '~/api/productService';
import { addProduct } from '~/features/data/productListSlice';
import useToken from '~/utils/useToken';

const ModalAddProduct = React.memo(({ handleClose }) => {
  const { token } = useToken();

  const { userInfo } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [SKU, setSKU] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [length, setLength] = useState('');
  const [weight, setWeight] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleAddImageClick = () => {
    fileInputRef.current.click();
  };

  const handleAddImage = (ev) => {
    const selectedFile = ev.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    const product = {
      name,
      description,
      SKU,
      brand,
      code,
      category,
      weight,
      dimension: {
        width,
        height,
        length,
      },
      color,
      material,
      mediaFile: {
        productImage: 'Test',
        videoLink: 'test',
      },
      legalEntityCode: userInfo.legalEntityCode,
    };

    const res = await createProduct(token, product);

    if (res) {
      dispatch(addProduct(product));
      handleClose();
    }
  };

  return (
    <div
      className="w-[939px] max-h-[80vh] bg-white rounded-lg py-12 pl-14 pr-11 overflow-y-scroll"
      onClick={(ev) => ev.stopPropagation()}
    >
      <div className="flex justify-between w-full">
        <h1 className="font-inter font-semibold text-2xl text-black">Create a new product</h1>
        <img src="/images/icons/close.svg" alt="" onClick={handleClose} className="cursor-pointer p-2 hover:" />
      </div>
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleAddImage} />
      {selectedImage ? (
        <div className="flex flex-col items-center gap-2 mt-4">
          <img src={selectedImage} alt="" className="w-60" />
          <p className="text-xs font-inter">
            Don't want this?{' '}
            <span className="text-primary cursor-pointer hover:underline font-inter" onClick={handleAddImageClick}>
              Change the picture!
            </span>
          </p>
        </div>
      ) : (
        <div className="flex justify-center mt-9">
          <div className="flex flex-col items-center justify-center h-[180px] w-[389px] bg-[#F4F7FF] border border-dashed border-spacing-4 border-primary rounded-md">
            <img src="/images/upload.png" className="h-10 cursor-pointer" alt="" onClick={handleAddImageClick} />
            <p className="mt-[14px] text-xs font-inter">
              <span className="text-primary cursor-pointer font-inter hover:underline" onClick={handleAddImageClick}>
                Click to upload
              </span>
            </p>
            <p className="mt-1 text-center text-xs font-inter">
              SVG, PNG, JPG or GIF
              <br />
              (max, 800 X 800px)
            </p>
          </div>
        </div>
      )}
      <div className="mt-7 flex flex-col gap-5">
        <input
          type="text"
          placeholder="Name"
          className="w-full font-inter p-4 outline-none border border-solid border-[#F0F0F0] rounded-[5px] placeholder:text-[#637381]"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full font-inter p-4 outline-none border border-solid border-[#F0F0F0] rounded-[5px] placeholder:text-[#637381]"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <div className="flex gap-14">
          <input
            type="text"
            placeholder="SKU"
            className="w-full font-inter p-4 outline-none border border-solid border-[#F0F0F0] rounded-[5px] placeholder:text-[#637381]"
            value={SKU}
            onChange={(ev) => setSKU(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Product Code"
            className="w-full font-inter p-4 outline-none border border-solid border-[#F0F0F0] rounded-[5px] placeholder:text-[#637381]"
            value={code}
            onChange={(ev) => setCode(ev.target.value)}
          />
        </div>
        <div className="flex gap-14">
          <input
            type="text"
            placeholder="Category"
            className="w-full font-inter p-4 outline-none border border-solid border-[#F0F0F0] rounded-[5px] placeholder:text-[#637381]"
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Brand"
            className="w-full font-inter p-4 outline-none border border-solid border-[#F0F0F0] rounded-[5px] placeholder:text-[#637381]"
            value={brand}
            onChange={(ev) => setBrand(ev.target.value)}
          />
        </div>
        <div className="flex gap-14">
          <input
            type="text"
            placeholder="Width"
            className="w-full font-inter p-4 outline-none border border-solid border-[#F0F0F0] rounded-[5px] placeholder:text-[#637381]"
            value={width}
            onChange={(ev) => setWidth(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Height"
            className="w-full font-inter p-4 outline-none border border-solid border-[#F0F0F0] rounded-[5px] placeholder:text-[#637381]"
            value={height}
            onChange={(ev) => setHeight(ev.target.value)}
          />
        </div>
        <div className="flex gap-14">
          <input
            type="text"
            placeholder="Length"
            className="w-full font-inter p-4 outline-none border border-solid border-[#F0F0F0] rounded-[5px] placeholder:text-[#637381]"
            value={length}
            onChange={(ev) => setLength(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Weight"
            className="w-full font-inter p-4 outline-none border border-solid border-[#F0F0F0] rounded-[5px] placeholder:text-[#637381]"
            value={weight}
            onChange={(ev) => setWeight(ev.target.value)}
          />
        </div>
        <div className="flex gap-14">
          <input
            type="text"
            placeholder="Material"
            className="w-full font-inter p-4 outline-none border border-solid border-[#F0F0F0] rounded-[5px] placeholder:text-[#637381]"
            value={material}
            onChange={(ev) => setMaterial(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Color"
            className="w-full font-inter p-4 outline-none border border-solid border-[#F0F0F0] rounded-[5px] placeholder:text-[#637381]"
            value={color}
            onChange={(ev) => setColor(ev.target.value)}
          />
        </div>
      </div>
      <button
        className="flex justify-center items-center h-14 w-full mt-10 rounded-[5px] placeholder:text-[#637381] text-white font-roboto leading-5 bg-primary"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
});

export default ModalAddProduct;
