import { useEffect, useState } from 'react';
import useMountTransition from '~/utils/useMountTransition';

function ModalSelectBox({ options, setSelected, selected, edit, toggleEdit, alt }) {
  const [active, setActive] = useState(false);
  const [newOptions, setNewOptions] = useState(options);

  const hasTransitionedIn = useMountTransition(active, 200);

  useEffect(() => {
    setNewOptions(options.filter((option) => option !== selected).sort());
    // eslint-disable-next-line
  }, [selected]);

  useEffect(() => {
    if (!edit) {
      setActive(false);
    }
  }, [edit]);

  return (
    <button
      onClick={() => {
        setActive((prevState) => {
          return !prevState;
        });
        toggleEdit();
      }}
      className={`w-[500px] flex items-center py-3 px-5 relative border border-solid rounded-[5px] ${
        active && edit ? 'border-primary' : 'border-gray-100'
      }`}
    >
      <div className="flex justify-between w-full">
        <p className={`font-inter font-medium leading-6 pointer ${active && edit ? 'text-primary' : ' text-black'}`}>
          {selected ? selected : `-- ${alt} --`}
        </p>
        <img src={`/images/icons/arrow-${!active && 'in'}active.svg`} alt="" />
      </div>
      {(active || hasTransitionedIn) && (
        <div className={`select-box ${hasTransitionedIn && 'in'} ${active && 'visible'}`}>
          {newOptions.map((option, idx) => {
            return (
              <div
                key={idx}
                onClick={() => setSelected(option)}
                className="py-2 text-left pl-5 w-full text-mainText font-inter font-semibold leading-6 hover:bg-gray-200 hover:text-primary"
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </button>
  );
}

export default ModalSelectBox;
