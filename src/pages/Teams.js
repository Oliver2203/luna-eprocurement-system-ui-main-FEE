import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionButton from '~/components/ActionButton';
import useMountTransition from '~/utils/useMountTransition';
import Modal from '~/components/Modal';

import useToken from '~/utils/useToken';
import ModalAddDepartment from '~/components/ModalAddDepartment';
import { fetchEntityInfo } from '~/features/actions/entityAction';
import ModalAddTeam from '~/components/ModalAddTeam';
import { deleteDepartment } from '~/api/departmentServices';
import { removeDepartment } from '~/features/data/entitySlice';
import { removeUsersFromDepartment } from '~/features/data/memberListSlice';

const Teams = React.memo(() => {
  const { token } = useToken();

  const { entity, error } = useSelector((state) => state.entity);

  const dispatch = useDispatch();

  const [modalState, setModalState] = useState(false);
  const [currentModal, setCurrentModal] = useState();

  const { userInfo } = useSelector((state) => state.userInfo);

  const hasTransitionedIn = useMountTransition(modalState, 200);

  useEffect(() => {
    document.title = 'Departments/Teams';
  }, []);

  useEffect(() => {
    const legalEntityCode = userInfo.legalEntityCode;

    if (!entity && !error) {
      dispatch(fetchEntityInfo({ token, legalEntityCode }));

      if (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line
  }, [error]);

  const handleOpenDepartmentModal = () => {
    setCurrentModal('Department');
    setModalState(true);
  };

  const handleOpenTeamModal = (departmentCode) => {
    setCurrentModal(departmentCode);
    setModalState(true);
  };

  const handleDeleteDepartment = async (departmentCode) => {
    const res = await deleteDepartment(token, departmentCode);

    if (res) {
      dispatch(removeDepartment({ departmentCode }));
      dispatch(removeUsersFromDepartment({ departmentCode }));
    }
  };

  const handleClose = () => {
    setModalState(false);
  };

  return (
    <div className="mt-9 rounded-xl overflow-hidden sidebar-shadow">
      <div className="grid grid-cols-3 px-11 pr-56">
        <div className="flex gap-4">
          <h3 className="font-inter font-medium text-[15px] leading-[26px] text-black py-4">DEPARTMENT</h3>
          <img
            src="/images/icons/plus-circle.svg"
            alt=""
            className="cursor-pointer"
            onClick={handleOpenDepartmentModal}
          />
          {(modalState || hasTransitionedIn) && currentModal === 'Department' && (
            <Modal handleClose={handleClose} active={modalState} hasTransitionedIn={hasTransitionedIn}>
              <ModalAddDepartment handleClose={handleClose} />
            </Modal>
          )}
        </div>
        <h3 className="font-inter font-medium text-[15px] leading-[26px] text-black py-4 flex justify-center">TEAMS</h3>
        <h3 className="font-inter font-medium text-[15px] leading-[26px] text-black py-4 flex justify-center">
          ACTION
        </h3>
      </div>
      <div className="line"></div>
      <div className="grid grid-cols-3 px-11 bg-white pr-56">
        {!entity && <div>An error has occured</div>}
        {entity &&
          entity.departments?.map((department) => (
            <div key={department.departmentCode} className="contents">
              <div className="flex items-center text-mainText text-sm font-inter h-20">{department.departmentName}</div>
              <div className="flex flex-col gap-3 justify-center items-center text-mainText text-sm font-inter">
                {department.teams?.map((team) => (
                  <div key={team.teamCode} className="">
                    {team.teamName}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-5">
                <ActionButton
                  type="add team"
                  onClick={() => {
                    handleOpenTeamModal(department.departmentCode);
                  }}
                />
                <ActionButton
                  type="delete"
                  onClick={() => {
                    handleDeleteDepartment(department.departmentCode);
                  }}
                />
              </div>
              {(modalState || hasTransitionedIn) && currentModal === department.departmentCode && (
                <Modal handleClose={handleClose} active={modalState} hasTransitionedIn={hasTransitionedIn}>
                  <ModalAddTeam handleClose={handleClose} departmentCode={department.departmentCode} />
                </Modal>
              )}
            </div>
          ))}
      </div>
      {/* <div className="pt-5 bg-white" /> */}
    </div>
  );
});

export default Teams;
