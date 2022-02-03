import React, { useEffect, useRef } from 'react';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

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
      <div ref={ref}>{children}</div>
    </div>
  );
};

export default Modal;
