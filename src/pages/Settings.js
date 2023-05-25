import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useUserInfo from '~/utils/useUserInfo';

function Settings() {
  const [copy, setCopy] = useState(false);

  const { userInfo } = useUserInfo();

  useEffect(() => {
    document.title = 'Settings';
  });

  const handleCopy = async () => {
    setCopy(true);
    await navigator.clipboard.writeText(userInfo.legalEntityCode);

    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  const routes = [
    {
      path: 'user-list',
      content: 'User list',
    },
    {
      path: 'teams',
      content: 'Deparment/Teams',
    },
    {
      path: 'config-roles',
      content: 'Configure Roles',
    },
  ];

  if (userInfo?.role !== 'MANAGER') return <h1>Member cannot see Settings Page</h1>;

  return (
    <div className="px-10 pt-7">
      <div className="flex justify-between">
        <div>
          <h1 className="font-inter font-semibold text-2xl leading-[30px] text-black">Settings</h1>
          <p className="mt-2 font-inter text-sm leading-5 text-mainText">
            In this page, user can manage admin list, create teams and configure roles
          </p>
        </div>
        <div className="flex items-center bg-white rounded-[10px] border border-solid border-[#e4e4e4] gap-20 px-5">
          <div className="py-3">
            <h3 className="text-black leading-5 font-inter font-medium">Legal Entity Code</h3>
            <p className="text-sm mt-1 leading-5 text-mainText">{userInfo?.legalEntityCode}</p>
          </div>
          <button
            className={
              (copy
                ? 'bg-lime-100'
                : 'bg-primary bg-opacity-[0.08] hover:bg-opacity-25 active:bg-opacity-25 transition duration-100') +
              ' rounded-md p-2'
            }
            onClick={handleCopy}
          >
            {copy ? (
              <img src="/images/icons/copied.png" alt="" className="w-[26px]" />
            ) : (
              <img src="/images/icons/copy.svg" alt="" className="w-[26px]" />
            )}
          </button>
        </div>
      </div>
      <div className="mt-4 h-15 flex gap-16">
        {routes.map((route, idx) => {
          return (
            <NavLink
              key={idx}
              to={`/settings/${route.path}`}
              className={({ isActive }) =>
                (isActive
                  ? 'text-primary before:absolute before:h-[2px] before:w-full before:-bottom-[2px] before:bg-primary '
                  : 'text-mainText hover:before:absolute hover:before:h-[2px] hover:before:w-full hover:before:-bottom-[2px] hover:before:bg-primary hover:text-primary ') +
                'relative flex items-center justify-center w-37.5 max-w-full h-full leading-5 font-inter'
              }
            >
              {route.content}
            </NavLink>
          );
        })}
      </div>
      <div className="line"></div>
      <Outlet />
    </div>
  );
}

export default Settings;
