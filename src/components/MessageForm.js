import React from 'react';
import { BiSend } from 'react-icons/bi';
import Button from './Button';
import Input from './Input';

const MessageForm = ({ message, onClick, onChange }) => {
  const hello = (event) => {
    event.preventDefault();
    console.log(event);
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      console.log('Enter key was pressed. Run your function.');
    }
    console.log('hello');
  };
  return (
    <form className='flex items-center gap-x-1 absolute bottom-0 w-[calc(100%-1.3rem)] p-4 bg-teal100' onSubmit={onClick}>
      <Input className='flex 1' type='text' value={message} onChange={onChange} placeholder='Write a new message' />
      <Button classnames='border-teal300 border-[1px] bg-white hover:bg-teal100 h-[2.65rem]' type='submit' onClick={onClick}>
        <BiSend className='text-xl text-teal400' />
      </Button>
    </form>
  );
};

export default MessageForm;
