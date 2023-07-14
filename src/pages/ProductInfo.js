import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductPrices } from '~/api/productService';
import VendorEdit from '~/components/VendorEdit';
import { fetchProductList } from '~/features/actions/productListAction';
import useToken from '~/utils/useToken';

const ProductInfo = React.memo(() => {
  const { token } = useToken();

  const { productCode } = useParams();

  const { vendors } = useSelector((state) => state.vendor);
  const { productList } = useSelector((state) => state.productList);
  const { userInfo } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    const legalEntityCode = userInfo.legalEntityCode;

    if (!productList) {
      dispatch(fetchProductList({ token, legalEntityCode }));
    }
    const getPrices = async () => {
      const alo = await getProductPrices(token, legalEntityCode, productCode);
      console.log('Hi', alo);
    };
    getPrices();
    // eslint-disable-next-line
  }, []);

  const productDetails = productList?.find((product) => product?.code === productCode);

  return (
    <div className="pl-[85px] pr-[152px] pt-9">
      <div className="flex gap-[120px]">
        <div className="w-[356px]">
          <div className="flex items-center gap-4">
            <Link to="/" className="cursor-pointer">
              <img src="/images/icons/home-path.svg" alt="" />
            </Link>
            <img src="/images/icons/arrow.svg" alt="" className="h-3" />
            <Link to="/products-list" className="font-inter font-medium leading-6 text-[#637381]">
              Product List
            </Link>
            <img src="/images/icons/arrow.svg" alt="" className="h-3" />
            <p className="text-black font-inter font-medium leading-6 underline underline-offset-4 cursor-pointer">
              {productDetails?.name}
            </p>
          </div>
          <div className="mt-7 w-full">
            <img src="/images/product-1.png" alt="" className="w-full rounded-lg" />
          </div>
          <div className="mt-[18px] w-full grid grid-cols-3 gap-[18px]">
            <img src="/images/product-detail-1.png" alt="" className="w-full" />
            <img src="/images/product-detail-2.png" alt="" className="w-full" />
            <img src="/images/product-detail-3.png" alt="" className="w-full" />
          </div>
        </div>
        <div className="w-[470px]">
          <h1 className="font-inter font-bold text-[32px] leading-[45px] text-black">{productDetails?.name}</h1>
          <p className="font-inter font-medium leading-6 text-[#637381] mt-3">{productDetails?.description}</p>
          <h2 className="mt-7 font-inter font-semibold text-2xl text-black">Product Details</h2>
          <div className="mt-[30px] flex flex-col gap-[15px]">
            <div className="flex justify-between">
              <p className="font-inter font-medium text-sm leading-6 text-black">SKU</p>
              <p className="font-inter font-medium text-sm leading-6 text-black">{productDetails?.SKU}</p>
            </div>
            <div className="line"></div>
            <div className="flex justify-between">
              <p className="font-inter font-medium text-sm leading-6 text-black">Product Code</p>
              <p className="font-inter font-medium text-sm leading-6 text-black">{productDetails?.code}</p>
            </div>
            <div className="line"></div>
            <div className="flex justify-between">
              <p className="font-inter font-medium text-sm leading-6 text-black">Category</p>
              <p className="font-inter font-medium text-sm leading-6 text-black">{productDetails?.category}</p>
            </div>
            <div className="line"></div>
            <div className="flex justify-between">
              <p className="font-inter font-medium text-sm leading-6 text-black">Brand</p>
              <p className="font-inter font-medium text-sm leading-6 text-black">{productDetails?.brand}</p>
            </div>
            <div className="line"></div>
            <div className="flex justify-between">
              <p className="font-inter font-medium text-sm leading-6 text-black">Dimensions</p>
              <p className="font-inter font-medium text-sm leading-6 text-black">{`${productDetails?.dimension.width}, ${productDetails?.dimension.height}, ${productDetails?.dimension.length}`}</p>
            </div>
            <div className="line"></div>
            <div className="flex justify-between">
              <p className="font-inter font-medium text-sm leading-6 text-black">Weight</p>
              <p className="font-inter font-medium text-sm leading-6 text-black">{productDetails?.weight}</p>
            </div>
            <div className="line"></div>
            <div className="flex justify-between">
              <p className="font-inter font-medium text-sm leading-6 text-black">Material</p>
              <p className="font-inter font-medium text-sm leading-6 text-black">{productDetails?.material}</p>
            </div>
            <div className="line"></div>
            <div className="flex justify-between">
              <p className="font-inter font-medium text-sm leading-6 text-black">Color</p>
              <p className="font-inter font-medium text-sm leading-6 text-black">{productDetails?.color}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-black font-inter text-2xl font-semibold">Vendor Lists</h2>
        <div className="flex justify-end">
          <p className="text-primary cursor-pointer px-6 py-2 rounded-[32px] border border-solid border-primary">
            + Add new vendor
          </p>
        </div>
        <div className="w-full bg-white border border-solid border-gray-300 mt-10 px-9 rounded-[10px]">
          <div className="w-full grid grid-cols-3 py-[18px]">
            <h3 className="flex justify-center font-inter font-semibold leading-6 text-black">Vendor</h3>
            <h3 className="flex justify-center font-inter font-semibold leading-6 text-black">Pricing</h3>
            <h3 className="flex justify-center font-inter font-semibold leading-6 text-black">Action</h3>
          </div>
          <div className="line"></div>
          {vendors.map((vendor, idx) => {
            return (
              <div className="contents" key={vendor.id}>
                <VendorEdit name={vendor.name} price={vendor.price} id={vendor.id} />
                {idx !== vendors.length - 1 && <div className="line"></div>}
              </div>
            );
          })}
        </div>
        <div className="pb-10"></div>
      </div>
    </div>
  );
});

export default ProductInfo;
