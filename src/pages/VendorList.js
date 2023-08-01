import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getVendors, searchVendor } from '~/api/vendorService';
import Modal from '~/components/Modal';
import ModalAddVendor from '~/components/ModalAddVendor';
import Pagination from '~/components/Pagination';
import SearchBox from '~/components/SearchBox';
import useMountTransition from '~/utils/useMountTransition';
import useToken from '~/utils/useToken';

const VendorList = React.memo(() => {
  useEffect(() => {
    document.title = 'Vendor List';
  }, []);

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [vendorsList, setVendorsList] = useState(null);
  const [addState, setAddState] = useState(false);

  const [modalState, setModalState] = useState(false);
  const hasTransitionedIn = useMountTransition(modalState, 200);

  const { token } = useToken();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1;

  useEffect(() => {
    const fetchVendorsList = async () => {
      const res = await getVendors(token, currentPage);

      if (res) {
        setVendorsList(res);
      }
    };
    fetchVendorsList();
    // eslint-disable-next-line
  }, [currentPage, addState]);

  useEffect(() => {
    if (search !== '') {
      const handleSearchVendors = async () => {
        const res = await searchVendor(token, search);

        if (res) {
          setSearchResult(res);
        }
      };
      handleSearchVendors();
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

  return (
    <div className="pl-10 pr-18 pt-7">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-inter font-semibold text-2xl leading-[30px] text-black">Vendor List</h1>
          <p className="mt-2 font-inter text-sm leading-5 text-mainText">
            In this page, user can view all the vendor list that provide the product
          </p>
        </div>
        <div className="flex gap-5">
          <SearchBox
            search={search}
            setSearch={setSearch}
            searchResult={searchResult}
            api={'vendor-list'}
            placeholder={'Search by vendor, code, name, or BN'}
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
        <div className="grid vendors-list-columns w-full">
          <h3 className="font-inter text-black font-semibold leading-6 py-[18px] flex items-center">Product</h3>
          <h3 className="font-inter text-black font-semibold leading-6 py-[18px] flex items-center">Vendor Code</h3>
          <h3 className="font-inter text-black font-semibold leading-6 py-[18px] flex items-center">Business Number</h3>
          <h3 className="font-inter text-black font-semibold leading-6 py-[18px] flex items-center">Group</h3>
          <h3 className="font-inter text-black font-semibold leading-6 py-[18px] flex items-center">Action</h3>
        </div>
        <div className="line"></div>
        {vendorsList?.data.length !== 0 ? (
          vendorsList?.data?.map((vendor, idx) => (
            <div key={idx} className="grid vendors-list-columns w-full">
              <div className="flex items-center my-[30px]">
                <img src="/images/vendor-1.png" alt="" className="w-[70px] mr-5" />
                <div>
                  <Link to={`/vendor-list/${vendor?.code}`} className="font-inter text-black font-semibold leading-6">
                    {vendor?.businessName}
                  </Link>
                  <p className="font-inter text-black font-normal leading-6">Lorem Ipsum</p>
                </div>
              </div>
              <p className="font-inter text-black font-semibold leading-6 self-center">{vendor?.code}</p>
              <p className="font-inter text-black font-semibold leading-6 self-center">{vendor?.businessNumber}</p>
              <p className="font-inter text-black font-semibold leading-6 self-center">Group A</p>
              <div className="flex items-center">
                <div className="relative h-5 w-4 ml-4 trash-selector cursor-pointer">
                  <img src="/images/icons/trash-inactive.svg" alt="" className="absolute trash-inactive" />
                  <img src="/images/icons/trash-active.svg" alt="" className="absolute trash-active" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="py-4 text-center font-inter font-semibold">No vendor added</p>
        )}
      </div>
      <div className="mt-7 flex items-center justify-center">
        <Pagination
          totalPages={vendorsList?.totalPages}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
      {(modalState || hasTransitionedIn) && (
        <Modal handleClose={handleCloseModal} hasTransitionedIn={hasTransitionedIn} active={modalState}>
          <ModalAddVendor handleClose={handleCloseModal} toggleAddState={toggleAddState} />
        </Modal>
      )}
    </div>
  );
});

export default VendorList;
