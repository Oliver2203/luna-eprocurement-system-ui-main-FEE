import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionButton from '~/components/ActionButton';
import Modal from '~/components/Modal';
import ModalUserInfo from '~/components/ModalUserInfo';
import Pagination from '~/components/Pagination';
import { fetchMemberList } from '~/features/actions/memberListAction';
import { deleteMember, setMemberList } from '~/features/data/memberListSlice';
import useMountTransition from '~/utils/useMountTransition';
import useToken from '~/utils/useToken';

function UserList() {
  // Get token from local storage
  const { token } = useToken();

  // Variables for current page and change current page for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Define params for effect on modal
  const [modalState, setModalState] = useState(false);
  const [currentModal, setCurrentModal] = useState();

  // Get userInfo and userList from redux store
  const { userInfo } = useSelector((state) => state.userInfo);
  const { memberList } = useSelector((state) => state.memberList);

  // Get dispatch function
  const dispatch = useDispatch();

  // Define transition effect on modal appearing
  const hasTransitionedIn = useMountTransition(modalState, 200);

  useEffect(() => {
    // Change document title
    document.title = 'User Lists';
  }, []);

  useEffect(() => {
    // If memberList is null, which means memberList hasn't been fetched from API
    // fetch it from API
    if (!memberList) {
      dispatch(fetchMemberList({ token, legalEntityCode: userInfo.legalEntityCode }));
    }
    // eslint-disable-next-line
  }, []);

  // Handle open change member info modal
  const handleOpen = (email) => {
    // Set modal state to true to close modal and have transition in
    setModalState(true);

    // To know which modal is currently on
    setCurrentModal(email);
  };

  // Handle close change member info modal
  const handleClose = () => {
    // Set modal state to false to close modal and have transition out
    setModalState(false);
  };

  // Define params for Pagination
  const usersPerPage = 6;
  const lastUserIdx = currentPage * usersPerPage;
  const firstUserIdx = lastUserIdx - usersPerPage;
  let currentUsersList = memberList?.filter((user) => user.email !== userInfo.email).slice(firstUserIdx, lastUserIdx);

  return (
    <div className="mt-9 rounded-xl overflow-hidden sidebar-shadow">
      <div className="grid user-list-columns px-11">
        {/* Heading */}
        <h3 className="font-inter text-black font-medium text-[15px] leading-[26px] h-15 flex items-center">NAME</h3>
        <h3 className="font-inter text-black font-medium text-[15px] leading-[26px] h-15 flex items-center">
          DEPARTMENT/TEAMS
        </h3>
        <h3 className="font-inter text-black font-medium text-[15px] leading-[26px] h-15 flex items-center">ROLE</h3>
        <h3 className="font-inter text-black font-medium text-[15px] leading-[26px] h-15 flex items-center ml-15">
          ACTION
        </h3>
      </div>
      <div className="line"></div>
      <div className="grid user-list-columns px-11 bg-white">
        {currentUsersList?.map((user) => {
          return (
            <div key={user.email} className="contents">
              <div className="flex gap-[18px] h-20 items-center">
                <img src="/images/user-portrait.png" alt="" className="w-[46px]" />
                <div className="text-sm leading-5 font-inter">
                  <h3 className="text-black font-medium">{user.username}</h3>
                  <p className="text-mainText">{user.email}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center text-mainText text-sm leading-5 font-inter">
                <h3 className="font-semibold">{user.departmentName ? user.departmentName : ''}</h3>
                <p className="mt-1">{user.teamName ? user.teamName : ''}</p>
              </div>
              <div className="flex items-center">
                <p className="font-inter text-mainText text-sm leading-5">{user.role}</p>
              </div>
              <div className="flex items-center gap-5">
                <ActionButton
                  type="edit"
                  onClick={() => {
                    handleOpen(user.email);
                  }}
                />
                <ActionButton
                  type="delete"
                  onClick={() => {
                    dispatch(deleteMember(user.email));
                  }}
                />
              </div>
              {(modalState || hasTransitionedIn) && currentModal === user.email && (
                <Modal
                  handleClose={handleClose}
                  active={modalState && currentModal === user.email}
                  hasTransitionedIn={hasTransitionedIn}
                >
                  <ModalUserInfo
                    user={user}
                    handleClose={handleClose}
                    userList={memberList}
                    setUserList={setMemberList}
                  />
                </Modal>
              )}
            </div>
          );
        })}
      </div>
      <Pagination
        totalItems={memberList?.length - 1}
        itemsPerPage={usersPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      {currentUsersList?.length === 0 && (
        <h1 className="font-inter font-medium text-center py-4 bg-white">
          This entity currently has no member available
        </h1>
      )}
      {usersPerPage < currentUsersList?.length && <div className="pt-5 bg-white"></div>}
    </div>
  );
}

export default UserList;
