import React from 'react';
import { Link, useParams } from 'react-router-dom';

const VendorInfo = React.memo(() => {
  const { vendorID } = useParams();
  return (
    <div className="pl-[85px] pr-[152px] pt-9">
      <div className="flex gap-[120px]">
        <div className="w-[356px]">
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
              Adidas
            </p>
          </div>
        </div>
      </div>
      <div className="mt-7"></div>
    </div>
  );
});

export default VendorInfo;
