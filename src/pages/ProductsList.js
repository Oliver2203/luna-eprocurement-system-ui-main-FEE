import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchProduct } from '~/api/productService';
import Modal from '~/components/Modal';
import ModalAddProduct from '~/components/ModalAddProduct';
import Pagination from '~/components/Pagination';
import SearchBox from '~/components/SearchBox';
import VendorTag from '~/components/VendorTag';
import { fetchProductList } from '~/features/actions/productListAction';
import useMountTransition from '~/utils/useMountTransition';
import useToken from '~/utils/useToken';

const ProductList = React.memo(() => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const [modalState, setModalState] = useState(false);

  const hasTransitionedIn = useMountTransition(modalState, 200);

  const { token } = useToken();

  const { productList } = useSelector((state) => state.productList);
  const { userInfo } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    const legalEntityCode = userInfo?.legalEntityCode;

    if (!productList && userInfo) {
      dispatch(fetchProductList({ token, legalEntityCode }));
    }
    // eslint-disable-next-line
  }, [userInfo]);

  useEffect(() => {
    if ( search !== "" ) {
      const legalEntityCode = userInfo.legalEntityCode;
    const handleSearchProducts = async () => {
      const res = await searchProduct(token, legalEntityCode, search);

      if (res) {
        setSearchResult(res);
      }
    };
    handleSearchProducts();
    }
    
    // eslint-disable-next-line
  }, [search]);
  console.log(searchResult);

  // Variables for current page and change current page for pagination
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 3;
  const lastProductsIdx = currentPage * productsPerPage;
  const firstProductsIdx = lastProductsIdx - productsPerPage;
  let currentProductsLists = productList?.slice(firstProductsIdx, lastProductsIdx);

  useEffect(() => {
    document.title = 'Products List';
  }, []);

  const handleCloseModal = () => {
    setModalState(false);
  };

  return (
    <div className="pl-10 pr-18 pt-7">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-inter font-semibold text-2xl leading-[30px] text-black">Products List</h1>
          <p className="mt-2 font-inter text-sm leading-5 text-mainText">
            In this page, user can view their product lists and find vendors accordingly
          </p>
        </div>
        <div className="flex gap-5">
          <SearchBox search={search} setSearch={setSearch} placeholder={'Search by vendor, sku, code name'} />
          <button
            className="bg-primary h-11 w-11 flex items-center justify-center rounded-[4px]"
            onClick={() => setModalState(true)}
          >
            <img src="/images/icons/plus-white.svg" alt="" />
          </button>
        </div>
      </div>
      <div className="mt-5 flex flex-col bg-white rounded-[10px] border border-solid border-gray-300 px-9">
        <div className="grid products-list-columns w-full">
          <h3 className="font-inter text-black font-semibold leading-6 py-[18px] flex items-center">Product</h3>
          <h3 className="font-inter text-black font-semibold leading-6 py-[18px] flex items-center">SKU</h3>
          <h3 className="font-inter text-black font-semibold leading-6 py-[18px] flex items-center">Product code</h3>
          <h3 className="font-inter text-black font-semibold leading-6 py-[18px] flex items-center">Vendor</h3>
          <h3 className="font-inter text-black font-semibold leading-6 py-[18px] flex items-center">Remove</h3>
        </div>
        <div className="line"></div>
        {currentProductsLists?.map((product, idx) => {
          return (
            <div className="contents" key={product?.code}>
              <div className="grid products-list-columns w-full">
                <div className="flex items-center py-[30px]">
                  <img src="/images/product-1.png" alt="" className="w-[70px] rounded-[5px]" />
                  <div className="leading-6 ml-5">
                    <Link
                      className="text-lg font-inter font-semibold text-black hover:text-primary hover:underline hover:underline-offset-2"
                      to={`/products-list/${product?.code}`}
                    >
                      {product?.name}
                    </Link>
                    <p className="font-medium font-inter text-[#637681]">{product?.description}</p>
                  </div>
                </div>
                <div className="flex items-center font-inter font-semibold text-lg leading-6 text-black">
                  {product?.SKU}
                </div>
                <div className="flex items-center font-inter font-semibold text-lg leading-6 text-black">
                  {product?.code}
                </div>
                <div className="flex flex-col justify-center items-baseline gap-3">
                  <VendorTag tag={'Vendor A'} />
                  <VendorTag tag={'Vendor B'} />
                </div>
                <div className="flex items-center">
                  <div className="relative h-5 w-4 ml-4 trash-selector cursor-pointer">
                    <img src="/images/icons/trash-inactive.svg" alt="" className="absolute trash-inactive" />
                    <img src="/images/icons/trash-active.svg" alt="" className="absolute trash-active" />
                  </div>
                </div>
              </div>
              {idx !== currentProductsLists.length - 1 && <div className="line"></div>}
            </div>
          );
        })}
      </div>
      <div className="mt-7 flex items-center justify-center">
        <Pagination
          totalItems={productList?.length - 1}
          itemsPerPage={productsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      {(modalState || hasTransitionedIn) && (
        <Modal handleClose={handleCloseModal} hasTransitionedIn={hasTransitionedIn} active={modalState}>
          <ModalAddProduct handleClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
});

export default ProductList;
