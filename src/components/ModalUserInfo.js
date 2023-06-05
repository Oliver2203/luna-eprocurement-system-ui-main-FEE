import { useState } from 'react';
import ModalSelectBox from './ModalSelectBox';
import { DEPARTMENT_LIST, TEAM_LIST, ROLE_LIST } from './Data';
import useToken from '~/utils/useToken';
import handleMember from '~/utils/handleMember';

function ModalUserInfo({ user, userList, setUserList, handleClose, edit, toggleEdit }) {
  const { token } = useToken();

  const [department, setDepartment] = useState(user.department);
  const [team, setTeam] = useState(user.team);
  const [role, setRole] = useState(user.role);

  const selectBoxes = [
    {
      selected: department,
      setSelected: setDepartment,
      options: DEPARTMENT_LIST,
      alt: 'Choose Department',
    },
    {
      selected: team,
      setSelected: setTeam,
      options: TEAM_LIST,
      alt: 'Choose Team',
    },
    {
      selected: role,
      setSelected: setRole,
      options: ROLE_LIST,
      alt: 'Choose Role',
    },
  ];

  // Handle manager submit edit user
  const handleChange = async (email) => {
    if (user.department !== department) {
      const res = await handleMember('department', department, email, token);

      // If there's an error, return undefined
      if (!res) {
        return undefined;
      }
    }

    if (user.team !== team) {
      const res = await handleMember('team', team, email, token);

      // If there's an error, return undefined
      if (!res) {
        return undefined;
      }
    }

    const changedUser = {
      ...user,
      department,
      team,
      role,
    };

    const userIdx = userList.findIndex((user) => user.email === email);

    setUserList((prevState) => {
      prevState[userIdx] = changedUser;
      return prevState;
    });

    handleClose();
  };

  return (
    <div className="p-9 bg-white rounded-[20px]" onClick={(ev) => ev.stopPropagation()}>
      <h3 className="font-bold font-inter text-2xl leading-[30px] text-black">Edit information</h3>
      <div className="h-[3px] w-[500px] mt-3 bg-primary"></div>
      <div className="flex mt-4 gap-4">
        <img src="/images/user-portrait.png" alt="" className="w-[45px]" />
        <div className="flex flex-col justify-center font-inter">
          <p className="text-black text-sm leading-5 font-medium">{user.name}</p>
          <p className="text-mainText text-sm leading-5">{user.email}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-2">
        {selectBoxes.map((selectBox, idx) => (
          <ModalSelectBox
            key={idx}
            selected={selectBox.selected}
            setSelected={selectBox.setSelected}
            options={selectBox.options}
            alt={selectBox.alt}
            edit={edit}
            toggleEdit={toggleEdit}
          />
        ))}
      </div>
      <div className="flex mt-6 gap-6">
        <button
          className="flex-1 py-3 border border-solid border-gray-250 rounded-lg text-black font-inter leading-6 font-medium"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          className="flex-1 py-3 font-inter leading-6 font-medium bg-primary text-white rounded-lg"
          onClick={() => handleChange(user.email)}
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export default ModalUserInfo;
