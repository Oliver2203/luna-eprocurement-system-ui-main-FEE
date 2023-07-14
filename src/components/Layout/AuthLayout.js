import { Suspense } from 'react';

function AuthLayout({ children }) {
  return (
    <div className="bg-[#F8F8F8] h-screen w-screen flex justify-center items-center">
      <div className="w-[1170px] h-[550px] flex">
        <div className="flex-1 bg-white">
          <div className=" mx-[93px] h-full flex flex-col justify-center">
            <Suspense>{children}</Suspense>
          </div>
        </div>
        <div className="flex-1 bg-center bg-cover relative" style={{ backgroundImage: `url("/images/auth-bg.png")` }}>
          <h1 className="font-inter text-white font-bold text-3xl w-[300px] absolute bottom-16 left-14">
            Welcome to <br></br> Lunar eProcurement System
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
