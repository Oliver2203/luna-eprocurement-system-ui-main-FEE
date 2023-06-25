import React, { useEffect, useState, useCallback } from 'react';
import useMountTransition from '~/utils/useMountTransition';

const ModalSelectBox = React.memo(({ options, selected, setSelected, edit, toggleEdit, type, alt }) => {
  const [active, setActive] = useState(false);
  const [newOptions, setNewOptions] = useState(options);

  const hasTransitionedIn = useMountTransition(active, 200);

  useEffect(() => {
    setNewOptions(options?.filter((option) => option?.[`${type}Code`] !== selected?.[`${type}Code`]).sort());
    // eslint-disable-next-line
  }, [selected, options]);

  useEffect(() => {
    if (!edit) {
      setActive(false);
    }
  }, [edit]);

  const handleClick = useCallback(() => {
    setActive((prevState) => !prevState);
    toggleEdit();
  }, [toggleEdit]);

  return (
    <button
      onClick={handleClick}
      className={`w-[500px] flex items-center py-3 px-5 relative border border-solid rounded-[5px] ${
        selected === false ? 'opacity-80 pointer-events-none' : active && edit ? 'border-primary' : 'border-gray-100'
      }`}
    >
      <div className="flex justify-between w-full">
        <p className={`font-inter font-medium leading-6 pointer ${active && edit ? 'text-primary' : ' text-black'}`}>
          {selected ? selected?.[`${type}Name`] : `-- ${alt} --`}
        </p>
        <img src={`/images/icons/arrow-${!active ? 'in' : ''}active.svg`} alt="" />
      </div>
      {selected !== false && (active || hasTransitionedIn) && (
        <div className={`select-box ${hasTransitionedIn && 'in'} ${active && 'visible'}`}>
          {newOptions.map((option) => {
            return (
              <div
                key={option?.[`${type}Code`]}
                onClick={() => setSelected(option)}
                className="py-2 text-left pl-5 w-full text-mainText font-inter font-semibold leading-6 hover:bg-gray-200 hover:text-primary"
              >
                {option?.[`${type}Name`]}
              </div>
            );
          })}
        </div>
      )}
    </button>
  );
});

export default ModalSelectBox;
