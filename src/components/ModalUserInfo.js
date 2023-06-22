import { useState, useEffect } from 'react';
import ModalSelectBox from './ModalSelectBox';
import useToken from '~/utils/useToken';
import { ROLE_LIST } from './Data';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEntityInfo } from '~/features/actions/entityAction';
import { setUserDepartment } from '~/api/departmentServices';
import { changeMemberDepartment, changeMemberRole, changeMemberTeam } from '~/features/data/memberListSlice';
import { setUserTeam } from '~/api/teamService';
import { setUserRole } from '~/api/userService';

function ModalUserInfo({ user, handleClose, edit, toggleEdit }) {
  const { token } = useToken();

  const [department, setDepartment] = useState();

  const [team, setTeam] = useState(
    !user.teamCode
      ? undefined
      : {
          teamCode: user.teamCode,
          teamName: user.teamName,
        },
  );
  const [role, setRole] = useState({ roleName: user.role });

  const dispatch = useDispatch();

  const { entity, loading, success, error } = useSelector((state) => state.entity);
  useEffect(() => {
    if (!entity && !loading && !success) {
      const legalEntityCode = user.legalEntityCode;
      dispatch(fetchEntityInfo({ token, legalEntityCode }));
    }

    if (!loading && error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    setDepartment(entity?.departments?.find((item) => item.departmentCode === user.departmentCode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity]);

  useEffect(() => {
    if (department && team && !department.teams.find((item) => item.teamCode === team.teamCode)) {
      setTeam(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department]);

  const selectBoxes = [
    {
      type: 'department',
      selected: department,
      setSelected: setDepartment,
      options: entity ? entity?.departments : undefined,
      alt: 'Choose Department',
    },
    {
      type: 'team',
      selected: !department ? false : team,
      setSelected: setTeam,
      options: department?.teams,
      alt: 'Choose Team',
    },
    {
      type: 'role',
      selected: role,
      setSelected: setRole,
      options: ROLE_LIST.filter((item) => item.roleName !== role.roleName),
      alt: 'Choose Role',
    },
  ];

  // Handle manager submit edit user
  const handleChange = async () => {
    if (department.departmentCode && user.departmentCode !== department.departmentCode) {
      const res = await setUserDepartment(token, department.departmentCode, user.email);

      if (!res) {
        return undefined;
      }
      dispatch(
        changeMemberDepartment({
          email: user.email,
          departmentName: department.departmentName,
          departmentCode: department.departmentCode,
        }),
      );
    }

    if (team.teamCode && user.teamCode !== team.teamCode) {
      const res = await setUserTeam(token, team.teamCode, user.email);

      // If there's an error, return undefined
      if (!res) {
        return undefined;
      }

      dispatch(changeMemberTeam({ email: user.email, teamCode: team.teamCode, teamName: team.teamName }));
    }

    if (role.roleName && user.role !== role.roleName) {
      const res = await setUserRole(token, user.email, role.roleName);

      if (!res) {
        return undefined;
      }
      dispatch(changeMemberRole({ email: user.email, role: role.roleName }));
    }

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
            type={selectBox.type}
            options={selectBox.options}
            selected={selectBox.selected}
            setSelected={selectBox.setSelected}
            edit={edit}
            toggleEdit={toggleEdit}
            alt={selectBox.alt}
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
