import React, { useState } from 'react';

function Modal({ children, active, hasTransitionedIn, handleClose }) {
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit((prevState) => !prevState);
  };

  const closeModal = () => {
    if (edit) {
      toggleEdit();
    } else {
      handleClose();
    }
  };

  return (
    <div className={`modal ${hasTransitionedIn && 'in'} ${active && 'visible'}`} onClick={closeModal}>
      {React.cloneElement(children, { edit: edit, toggleEdit: toggleEdit })}
    </div>
  );
}

export default Modal;
