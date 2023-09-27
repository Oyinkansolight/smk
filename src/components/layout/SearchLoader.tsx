'use client';

import React from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

const SearchLoader = ({
  width = '100',
  color = '#4fa94d',
}) => {
  return (
    <div className='flex flex-col gap-6 justify-center items-center h-[40vh]'>
      <MagnifyingGlass
        width={width}
        visible={true}
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor='#c0efff'
        color={color}
      />

      <div className='h4'>
        Loading data...
      </div>
    </div>
  );
};

export default SearchLoader;
