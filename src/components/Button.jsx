import React from 'react';

const Button = ({ children, onClick, filled, classnames }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className={`${filled && 'bg-teal200 hover:bg-teal300 hover:border-teal300'}
         whitespace-nowrap py-2 px-4 border-2 border-teal200 tracking-wide hover:bg-teal200 focus:ring-teal300 focus:ring-teal300 text-teal600 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg
        ${classnames}`}
    >
      {children}
    </button>
  );
};

export default Button;
