import React from 'react';
import { BiSend } from 'react-icons/bi';
import Button from './Button';
import Input from './Input';

const MessageForm = ({ message, setMessage, onClick }) => {
  return (
    <form className='flex items-center gap-x-1 absolute bottom-0 w-full'>
      <Input className='flex 1' type='text' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Write a new message' />
      <Button classnames='border-teal300 border-[1px] bg-white hover:bg-teal100 h-[2.65rem]' type='submit' onClick={onClick}>
        <BiSend className='text-xl text-teal400' />
      </Button>
    </form>
  );
};

export default MessageForm;
