import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getVendorInfo } from '~/api/vendorService';
import ActionButton from '~/components/ActionButton';
import Modal from '~/components/Modal';
import ModalAddContact from '~/components/ModalAddContact';
import useMountTransition from '~/utils/useMountTransition';
import useToken from '~/utils/useToken';

const VendorInfo = React.memo(() => {
  const { token } = useToken();

  const { vendorCode } = useParams();

  const [vendorInfo, setVendorInfo] = useState({});
  const [addState, setAddState] = useState(false);

  const [modalState, setModalState] = useState(false);
  const hasTransitionedIn = useMountTransition(modalState, 200);

  useEffect(() => {
    const fetchVendorInfo = async () => {
      const res = await getVendorInfo(token, vendorCode);

      if (res) {
        setVendorInfo(res);
      }
    };
    fetchVendorInfo();
    // eslint-disable-next-line
  }, [addState]);

  const handleCloseModal = () => {
    setModalState(false);
  };

  const toggleAddState = () => {
    setAddState(!addState);
  };

  return (
    <div className="pl-[85px] pr-[152px] pt-9">
      <div className="w-[468px]">
        <div className="flex items-center gap-4">
          <Link to="/" className="cursor-pointer">
            <img src="/images/icons/home-path.svg" alt="" />
          </Link>
          <img src="/images/icons/arrow.svg" alt="" className="h-3" />
          <Link to="/vendor-list" className="font-inter font-medium leading-6 text-[#637381]">
            Vendor List
          </Link>
          <img src="/images/icons/arrow.svg" alt="" className="h-3" />
          <p className="text-black font-inter font-medium leading-6 underline underline-offset-4 cursor-pointer">
            {vendorInfo?.businessName}
          </p>
        </div>
        <div className="mt-7 flex justify-between">
          <h1 className="font-inter text-[32px] leading-[45px] text-black font-bold">{vendorInfo?.businessName}</h1>
          <img src="/images/icons/vendor-1.svg" alt="" className="h-12" />
        </div>
        <h2 className="mt-7 mb-[30px] font-inter text-black font-semibold text-2xl leading-[30px]">Vendor Details</h2>
        <div className="flex justify-between">
          <p className="font-inter text-sm leading-6 text-black">Vendor Code</p>
          <p className="font-inter text-sm leading-6 text-black">{vendorCode}</p>
        </div>
        <div className="line my-3"></div>
        <div className="flex justify-between">
          <p className="font-inter text-sm leading-6 text-black">Business Number</p>
          <p className="font-inter text-sm leading-6 text-black">{vendorInfo?.businessNumber}</p>
        </div>
        <div className="line my-3"></div>
        <div className="flex justify-between">
          <p className="font-inter text-sm leading-6 text-black">Group</p>
          <p className="font-inter text-sm leading-6 text-black">Group A</p>
        </div>
      </div>
      <h2 className="mt-14 font-inter text-black font-semibold text-2xl leading-[30px]">Contact list</h2>
      <div className="flex justify-end">
        <button
          onClick={() => setModalState(true)}
          className="text-primary text-sm font-inter cursor-pointer px-6 py-2 rounded-[32px] border border-solid border-primary hover:bg-primary hover:text-white transition-all duration-150"
        >
          + Add new contact
        </button>
      </div>
      {(modalState || hasTransitionedIn) && (
        <Modal handleClose={handleCloseModal} hasTransitionedIn={hasTransitionedIn} active={modalState}>
          <ModalAddContact handleClose={handleCloseModal} toggleAddState={toggleAddState} />
        </Modal>
      )}
      <div className="w-full bg-white border border-solid border-gray-300 mt-5 px-9 rounded-[10px]">
        <div className="grid vendor-info-columns py-[18px]">
          <h3 className="font-inter text-black font-semibold leading-6 flex items-center">Full Name</h3>
          <h3 className="font-inter text-black font-semibold leading-6 flex items-center">Phone Number</h3>
          <h3 className="font-inter text-black font-semibold leading-6 flex items-center">Position</h3>
          <div className="flex justify-center">
            <h3 className="font-inter text-black font-semibold leading-6 flex items-center">Action</h3>
          </div>
        </div>
        <div className="line"></div>
        {vendorInfo?.contacts?.length === 0 ? (
          <p className="font-inter text-black font-medium leading-6 flex items-center justify-center py-[18px]">
            No contacts to show
          </p>
        ) : (
          vendorInfo?.contacts?.map((contact, idx) => (
            <div key={contact.phone}>
              <div className="grid vendor-info-columns py-[18px]">
                <p className="font-inter text-black font-medium leading-6 flex items-center">{contact.name}</p>
                <p className="font-inter text-black font-medium leading-6 flex items-center">{contact.phone}</p>
                <p className="font-inter text-black font-medium leading-6 flex items-center">{contact.position}</p>
                <div className="flex justify-center items-center">
                  <ActionButton type="delete" />
                </div>
              </div>
              {idx !== vendorInfo?.contacts?.length - 1 && <div className="line"></div>}
            </div>
          ))
        )}
      </div>
    </div>
  );
});

export default VendorInfo;
