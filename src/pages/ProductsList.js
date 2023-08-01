import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { deleteProduct, getProducts, searchProduct } from '~/api/productService';
import Modal from '~/components/Modal';
import ModalAddProduct from '~/components/ModalAddProduct';
import Pagination from '~/components/Pagination';
import SearchBox from '~/components/SearchBox';
import VendorTag from '~/components/VendorTag';
import useMountTransition from '~/utils/useMountTransition';
import useToken from '~/utils/useToken';

const ProductList = React.memo(() => {
  useEffect(() => {
    document.title = 'Products List';
  }, []);

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [productList, setProductList] = useState(null);
  const [addState, setAddState] = useState(false);

  const [modalState, setModalState] = useState(false);
  const hasTransitionedIn = useMountTransition(modalState, 200);

  const { token } = useToken();

  const { userInfo } = useSelector((state) => state.userInfo);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1;

  useEffect(() => {
    const legalEntityCode = userInfo?.legalEntityCode;

    const fetchProductList = async () => {
      const res = await getProducts(token, legalEntityCode, currentPage);

      if (res) {
        setProductList(res);
      }
    };
    if (legalEntityCode) {
      fetchProductList();
    }
    // eslint-disable-next-line
  }, [userInfo, currentPage, addState]);

  useEffect(() => {
    const legalEntityCode = userInfo?.legalEntityCode;

    if (search !== '') {
      const handleSearchProducts = async () => {
        const res = await searchProduct(token, legalEntityCode, search);

        if (res) {
          setSearchResult(res);
        }
      };
      handleSearchProducts();
    } else {
      setSearchResult(null);
    }
    // eslint-disable-next-line
  }, [search]);

  const handleCloseModal = () => {
    setModalState(false);
  };

  const toggleAddState = () => {
    setAddState(!addState);
  };

  const handleDeleteProduct = async (productCode) => {
    const res = await deleteProduct(token, productCode);

    if (res) {
      toggleAddState();
    }
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
          <SearchBox
            search={search}
            setSearch={setSearch}
            searchResult={searchResult}
            api={'products-list'}
            placeholder={'Search by vendor, sku, code name'}
          />
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
        {productList?.data.length !== 0 ? (
          productList?.data?.map((product, idx) => {
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
                    {product?.providedVendorInfo?.map((vendor) => {
                      return <VendorTag key={vendor?.vendorCode} tag={vendor?.vendorName} />;
                    })}
                  </div>
                  <div className="flex items-center">
                    <div
                      onClick={() => handleDeleteProduct(product?.code)}
                      className="relative h-5 w-4 ml-4 trash-selector cursor-pointer"
                    >
                      <img src="/images/icons/trash-inactive.svg" alt="" className="absolute trash-inactive" />
                      <img src="/images/icons/trash-active.svg" alt="" className="absolute trash-active" />
                    </div>
                  </div>
                </div>
                {idx !== productList?.data?.length - 1 && <div className="line"></div>}
              </div>
            );
          })
        ) : (
          <p className="text-center py-4 font-inter font-medium">No product added</p>
        )}
      </div>
      <div className="mt-7 flex items-center justify-center">
        <Pagination
          totalPages={productList?.totalPages}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
      {(modalState || hasTransitionedIn) && (
        <Modal handleClose={handleCloseModal} hasTransitionedIn={hasTransitionedIn} active={modalState}>
          <ModalAddProduct handleClose={handleCloseModal} toggleAddState={toggleAddState} />
        </Modal>
      )}
    </div>
  );
});

export default ProductList;
