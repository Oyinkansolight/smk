/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface BasicCardProps {
  Icon: any;
  upperLimit?: string;
  lowerLimit?: string;
  subtitle: string;
}

const Result = ({ Icon, upperLimit, lowerLimit, subtitle }: BasicCardProps) => {
  return (
    <div className='bg-white rounded-md flex justify-between items-start p-4'>
      <div className='space-y-4'>
        <div className='font-bold text-xl'>
          {upperLimit && <span className='text-black'>{upperLimit}</span>}
          {lowerLimit && <span>/</span>}
          {lowerLimit && <span className='text-[#C8C8C8]'>{lowerLimit}</span>}
        </div>
        <p className='text-[#9696A0] text-xs'>{subtitle}</p>
      </div>
      <Icon className='w-10 h-10' />
    </div>
  );
};

export default Result;
