import React, { useRef } from 'react';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { MdClose } from 'react-icons/md';

const Modal = ({ children, setModalOpen }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setModalOpen(false));
  return (
    <div className='absolute z-[1000] w-full h-full top-0 left-0 grid place-content-center bg-blackOpacity'>
      <div ref={ref} className='bg-white dark:bg-teal450 py-10 px-6 sm:p-10 rounded-md relative'>
        <button className='absolute right-4 text-xl top-4' onClick={() => setModalOpen(false)}>
          <MdClose className='dark:text-teal100' />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
