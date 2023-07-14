import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import ModalAddVendor from '~/components/ModalAddVendor';
import Pagination from '~/components/Pagination';
import SearchBox from '~/components/SearchBox';
import useMountTransition from '~/utils/useMountTransition';

const VendorList = React.memo(() => {
  const [search, setSearch] = useState('');

  const [modalState, setModalState] = useState(false);

  const hasTransitionedIn = useMountTransition(modalState, 200);

  const [currentPage, setCurrentPage] = useState(1);

  const vendors = [
    {
      imgae: '/images/vendor-1.png',
      name: 'Adidas',
      description: 'Lorem ipsum',
      vendorCode: 'HP21001',
      bussinessNumber: '388BE27',
      group: 'Group A',
    },
    {
      imgae: '/images/vendor-1.png',
      name: 'Adidas',
      description: 'Lorem ipsum',
      vendorCode: 'HP21002',
      bussinessNumber: '388BE28',
      group: 'Group A',
    },
    {
      imgae: '/images/vendor-1.png',
      name: 'Adidas',
      description: 'Lorem ipsum',
      vendorCode: 'HP21003',
      bussinessNumber: '388BE29',
      group: 'Group A',
    },
    {
      imgae: '/images/vendor-1.png',
      name: 'Adidas',
      description: 'Lorem ipsum',
      vendorCode: 'HP21004',
      bussinessNumber: '388BE30',
      group: 'Group A',
    },
  ];

  const vendorsPerPage = 3;
  const lastVendorIdx = currentPage * vendorsPerPage;
  const firstVendorIdx = lastVendorIdx - vendorsPerPage;
  const currentVendors = vendors.slice(firstVendorIdx, lastVendorIdx);

  useEffect(() => {
    document.title = 'Vendor List';
  }, []);

  const handleCloseModal = () => {
    setModalState(false);
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
          <SearchBox search={search} setSearch={setSearch} placeholder={'Search by vendor, code, name, or BN'} />
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
          <h3 className="font-inter text-black font-semibold leading-6 py-[18px] flex items-center">Vendor Code</h3>
          <h3 className="font-inter text-black font-semibold leading-6 py-[18px] flex items-center">Bussines Number</h3>
          <h3 className="font-inter text-black font-semibold leading-6 py-[18px] flex items-center">Group</h3>
          <h3 className="font-inter text-black font-semibold leading-6 py-[18px] flex items-center">Action</h3>
        </div>
        <div className="line"></div>
        {currentVendors.map((vendor, idx) => (
          <div key={idx} className="grid products-list-columns w-full">
            <div className="flex items-center my-[30px]">
              <img src={vendor.imgae} alt="" className="w-[70px] mr-5" />
              <div>
                <Link
                  to={`/vendor-list/${vendor.vendorCode}`}
                  className="font-inter text-black font-semibold leading-6"
                >
                  {vendor.name}
                </Link>
                <p className="font-inter text-black font-normal leading-6">{vendor.description}</p>
              </div>
            </div>
            <p className="font-inter text-black font-semibold leading-6 self-center">{vendor.vendorCode}</p>
            <p className="font-inter text-black font-semibold leading-6 self-center">{vendor.bussinessNumber}</p>
            <p className="font-inter text-black font-semibold leading-6 self-center">{vendor.group}</p>
            <div className="flex items-center gap-3 ml-2">
              <img src="/images/icons/write.svg" alt="" className="h-5 w-5 cursor-pointer" />
              <div className="relative h-5 w-4 trash-selector cursor-pointer">
                <img src="/images/icons/trash-inactive.svg" alt="" className="absolute trash-inactive" />
                <img src="/images/icons/trash-active.svg" alt="" className="absolute trash-active" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-7 flex items-center justify-center">
        <Pagination
          totalItems={vendors.length}
          itemsPerPage={vendorsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {(modalState || hasTransitionedIn) && (
        <Modal handleClose={handleCloseModal} hasTransitionedIn={hasTransitionedIn} active={modalState}>
          <ModalAddVendor handleClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
});

export default VendorList;
