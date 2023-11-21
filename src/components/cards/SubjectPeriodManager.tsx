'use client';

import Image from 'next/image';
import { useState } from 'react';

type propType = {
  idx: number;
  setCurrentView: (v: number) => void;
};

const Periods = ({ idx, setCurrentView }: propType) => {
  const [action, setAction] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='rounded-xl transition-all duration-300  border border-[#E3E3E3] bg-[#F8F8FF]'>
      <div className='p-4 w-full'>
        <div className='py-4 flex w-full space-x-2 flex-1 rounded-xl'>
          <Image
            src='/svg/assignment.svg'
            height={24}
            width={24}
            alt='book'
            className=''
          />
          <div className='spacey-y-5 w-full'>
            <div className='flex justify-between'>
              <h2 className='text-xl '>Week 1 </h2>
              <div className='rounded-full bg-[#1BB44930] grid place-content-center py-1 px-3 text-green-500 w-max text-[8px] border-dot border-green-500'>
                Completed
              </div>
            </div>
            <div className='flex space-x-2'>
              <span className='text-gray-500'>Theme:</span>
              <span className='font-medium text-[#615E83]'>Number Theory</span>
            </div>
            <div className='flex justify-between'>
              <div className='flex space-x-2'>
                <span className='text-gray-500'>Sub-Theme/Topic:</span>
                <span className='font-medium text-[#615E83]'>
                  Number Theory
                </span>
              </div>
              <button
                className=''
                onClick={() => {
                  setAction(idx);
                  setIsOpen(!isOpen);
                }}
              >
                {isOpen && (
                  <div className='flex items-center'>
                    <span className='text-[#B2B2B2] text-xs'>Collapse</span>
                    <div>
                      <Image
                        src='/svg/arrowup.svg'
                        height={24}
                        width={24}
                        alt='arrowup'
                        className='ml-2'
                      />
                    </div>
                  </div>
                )}
                {!isOpen && (
                  <div className='flex items-center'>
                    <span className='text-[#B2B2B2] text-xs'>See details</span>
                    <div>
                      <Image
                        src='/svg/arrowdown.svg'
                        height={24}
                        width={24}
                        alt='arrowdown'
                        className='ml-2'
                      />
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {action === idx && isOpen && (
          <div>
            <div className='my-5 border rounded-xl bg-white'>
              {[1, 2, 3, 4].map((item, idx) => (
                <div className='flex justify-between p-3 border-b' key={idx}>
                  <h5>Period {item}</h5>
                  <div className='flex space-x-2'>
                    <span className='text-gray-500'>Theme:</span>
                    <span className='font-medium text-[#615E83]'>
                      Number Theory
                    </span>
                  </div>
                  <button className='text-[#5754F7]'>View</button>
                </div>
              ))}
            </div>
            <div className='my-6 flex justify-center'>
              <button
                onClick={() => {
                  setCurrentView(1);
                }}
                className='text-[#5754F7] text-base font-medium'
              >
                Edit Week
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Periods;
