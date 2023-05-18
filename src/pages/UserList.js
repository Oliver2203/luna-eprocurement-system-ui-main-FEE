import { useEffect, useState } from 'react';
import ActionButton from '~/components/ActionButton';
import { USER_LIST } from '~/components/Data';
import Modal from '~/components/Modal';
import ModalUserInfo from '~/components/ModalUserInfo';
import Pagination from '~/components/Pagination';
import useMountTransition from '~/utils/useMountTransition';

function UserList() {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState(false);
  const [currentModal, setCurrentModal] = useState();

  const hasTransitionedIn = useMountTransition(modalState, 200);

  useEffect(() => {
    setUserList(USER_LIST);
  }, []);

  const handleOpen = (id) => {
    setModalState(true);
    setCurrentModal(id);
  };

  const handleClose = () => {
    setModalState(false);
  };

  const handleDelete = (id) => {
    setUserList((prevState) => prevState.filter((user) => user.id !== id));
  };

  const usersPerPage = 6;
  const lastUserIdx = currentPage * usersPerPage;
  const firstUserIdx = lastUserIdx - usersPerPage;
  const currentUsersList = userList.slice(firstUserIdx, lastUserIdx);

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
        {currentUsersList.map((user) => {
          return (
            <div key={user.id} className="contents">
              <div className="flex gap-[18px] h-20 items-center">
                <img src="/images/user-portrait.png" alt="" className="w-[46px]" />
                <div className="text-sm leading-5 font-inter">
                  <h3 className="text-black font-medium">{user.name}</h3>
                  <p className="text-mainText">{user.email}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center text-mainText text-sm leading-5 font-inter">
                <h3 className="font-semibold">{user.department ? user.department : ''}</h3>
                <p className="mt-1">{user.team ? user.team : ''}</p>
              </div>
              <div className="flex items-center">
                <p className="font-inter text-mainText text-sm leading-5">{user.role}</p>
              </div>
              <div className="flex items-center gap-5">
                <ActionButton
                  type="edit"
                  onClick={() => {
                    handleOpen(user.id);
                  }}
                />
                <ActionButton
                  type="delete"
                  onClick={() => {
                    handleDelete(user.id);
                  }}
                />
              </div>
              {(modalState || hasTransitionedIn) && currentModal === user.id && (
                <Modal
                  handleClose={handleClose}
                  active={modalState && currentModal === user.id}
                  hasTransitionedIn={hasTransitionedIn}
                >
                  <ModalUserInfo user={user} handleClose={handleClose} userList={userList} setUserList={setUserList} />
                </Modal>
              )}
            </div>
          );
        })}
      </div>
      <Pagination
        totalItems={userList.length}
        itemsPerPage={usersPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <div className="pt-5 bg-white"></div>
    </div>
  );
}

export default UserList;
