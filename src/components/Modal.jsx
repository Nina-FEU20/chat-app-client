import React, { useRef } from 'react';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { MdClose } from 'react-icons/md';

const Modal = ({ children, setModalOpen }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setModalOpen(false));
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: '1',
        width: '100%',
        height: '100%',
        background: 'hsla(0, 0%, 0%, 0.5)',
        top: '0',
        left: '0',

        display: 'grid',
        placeContent: 'center',
      }}
    >
      <div ref={ref} className='bg-white py-10 px-6 sm:p-10 rounded-md relative'>
        <button className='absolute right-4 text-xl top-4' onClick={() => setModalOpen(false)}>
          <MdClose />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
