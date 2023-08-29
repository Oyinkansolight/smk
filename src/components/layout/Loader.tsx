'use client';

import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const GenericLoader = ({
  width = '100',
  stroke = '5',
  color = '#4fa94d',
  duration = '0.75',
}) => {
  return (
    <div className='flex justify-center items-center h-[40vh]'>
      <RotatingLines
        width={width}
        visible={true}
        strokeWidth={stroke}
        strokeColor={color}
        animationDuration={duration}
      />
    </div>
  );
};

export default GenericLoader;
