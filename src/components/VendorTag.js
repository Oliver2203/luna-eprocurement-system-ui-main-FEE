import React from 'react';

const VendorTag = ({ tag }) => {
  return (
    <div className="font-inter font-medium text-sm leading-[22px] text-primary bg-[#879BDF] bg-opacity-30 px-[14px] py-1 rounded-[30px]">
      {tag}
    </div>
  );
};

export default VendorTag;
