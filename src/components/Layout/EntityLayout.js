import { NavLink } from 'react-router-dom';
import { Suspense } from 'react';

function EntityLayout({ children }) {
  return (
    <div className="bg-[#F8F8F8] h-screen w-screen flex justify-center items-center">
      <div className="w-[613px] bg-white shadow-md shadow-slate-300 rounded-lg">
        <div className="mx-11">
          <div className="mt-4 flex justify-center gap-10 font-inter font-medium text-[#637381]">
            <NavLink
              className={({ isActive }) =>
                (isActive ? 'text-primary before:opacity-100 ' : 'before:opacity-0 ') +
                'relative py-4 cursor-pointer before:absolute before:-bottom-[2px] before:z-10 before:w-full before:h-[2px] before:bg-primary hover:text-primary hover:before:opacity-100 transition-all duration-150'
              }
              to="/create-entity"
            >
              Create a Legal Entity
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                (isActive ? 'text-primary before:opacity-100 ' : 'before:opacity-0 ') +
                'relative py-4 cursor-pointer before:absolute before:-bottom-[2px] before:z-10 before:w-full before:h-[2px] before:bg-primary hover:text-primary hover:before:opacity-100 transition-all duration-150'
              }
              to="/join-entity"
            >
              Join a Legal Entity
            </NavLink>
          </div>
          <div className="line opacity-90"></div>
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}

export default EntityLayout;
