import React from 'react';

const Input = ({ label, placeholder, onChange, name, type, value }) => {
  return (
    <div className='space-y-1 mb-4 last-of-type:mb-0 flex-1'>
      {label && (
        <label className='pb-2 text-teal400'>
          {label}
          <span className='text-red required-dot pl-2 '>*</span>
        </label>
      )}
      <input
        type={type}
        className='rounded-lg flex-1 border border-teal300 w-full py-2 px-4 bg-white shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-teal200 focus:border-teal200'
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoComplete='on'
      />
    </div>
  );
};

export default Input;
