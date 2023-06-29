import React from 'react';

type propTypes = {
  handleSearch?: (value: string) => void;
  placeholder?: string;
};
const BasicSearch = ({ handleSearch, placeholder }: propTypes) => {
  return (
    <form className='flex w-full items-center'>
      <label htmlFor='simple-search' className='sr-only'>
        Search
      </label>
      <div className='relative w-full'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 md:pl-[23.4px]'>
          <svg
            aria-hidden='true'
            className='h-5 w-5 text-[#ADB8CC]'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            ></path>
          </svg>
        </div>
        <input
          type='text'
          id='simple-search'
          className='block h-[40px] w-full max-w-[581px] rounded-full border-0 bg-white p-2.5 pl-[54px] text-xs text-black shadow-sm placeholder:text-[#ADB8CC] focus:border-blue-500 focus:ring-blue-500'
          placeholder={placeholder ? placeholder : 'Search...'}
          required
          onChange={(e) => handleSearch?.(e.target.value)}
        />
      </div>
    </form>
  );
};

export default BasicSearch;
