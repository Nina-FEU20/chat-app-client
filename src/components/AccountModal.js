import React from 'react';
import Login from './Login';
import Modal from './Modal';
import Signup from './Signup';

const AccountModal = ({ setOpen, open }) => {
  return (
    <Modal setModalOpen={setOpen}>
      {open === 'create' && <Signup setOpen={setOpen} />}
      {open === 'login' && <Login setOpen={setOpen} />}
    </Modal>
  );
};

export default AccountModal;
