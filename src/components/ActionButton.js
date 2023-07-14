import { useEffect, useState } from 'react';

function ActionButton({ type, onClick }) {
  const [color, setColor] = useState();

  useEffect(() => {
    if (type === 'edit' || type === 'add team' || type === 'done') {
      setColor('primary');
    } else if (type === 'delete' || type === 'cancel') {
      setColor('red');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center rounded-[32px] transition duration-50 bg-white border border-solid action-btn-${color}`}
    >
      <p className={`px-5 py-2 capitalize text-sm leading-[18px] hover:text-white`}>{type}</p>
    </button>
  );
}

export default ActionButton;
