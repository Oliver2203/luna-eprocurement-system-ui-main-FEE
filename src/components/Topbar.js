import { useSelector } from 'react-redux';

function Topbar() {
  const { userInfo } = useSelector((state) => state.userInfo);

  return (
    <>
      <div className="flex h-20 items-center justify-end pr-14 bg-white">
        <div className="flex items-center gap-4">
          <div className="flex flex-col justify-end items-end">
            <h3 className="text-black font-inter text-sm leading-5 font-medium">{userInfo?.username}</h3>
            <p className="font-inter text-xs leading-[14px] text-mainText uppercase">{userInfo?.role}</p>
          </div>
          <img src="/images/user-portrait.png" alt="" className="w-[46px]" />
        </div>
      </div>
      <div className="line"></div>
    </>
  );
}

export default Topbar;
