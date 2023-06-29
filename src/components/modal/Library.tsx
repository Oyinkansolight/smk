import React from 'react';
import { AiOutlineFileText } from 'react-icons/ai';
import { BiFolderOpen } from 'react-icons/bi';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler?: () => void;
}

//Change to trigger build

function AddSingleSchool({ onClickHandler }: propType) {
  return (
    <div className='fixed inset-0 z-10 grid place-content-center rounded-sm bg-black/30'>
      <div className='flex w-[600px] flex-col rounded-lg  space-y-4 bg-white  md:p-8'>
        <div className='flex justify-end'>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />{' '}
          </button>
        </div>

        <div className='mt-4 border'>
          <div className='p-4'>
            {' '}
            <h4 className='text-gray-400 font-bold'>Attach Files</h4>
          </div>
          <div className='p-4 bg-[#F6F9FC] text-[#8898AA]'>Folder Name</div>
          <div className='border-b p-3 flex space-x-2 items-center'>
            <BiFolderOpen className='h-6 w-6 text-yellow-600' />
            <p>Prime Numbers 1 Maths note</p>
          </div>
          <div className='border-b p-3 flex space-x-2 items-center'>
            <AiOutlineFileText className='h-6 w-6' />
            <p>Calculus Introduction</p>
          </div>
          <div className='border-b p-3 flex space-x-2 items-center'>
            <BiFolderOpen className='h-6 w-6 text-yellow-600' />
            <p>Prime Numbers 1 Maths note</p>
          </div>
          <div className='border-b p-3 flex space-x-2 items-center'>
            <AiOutlineFileText className='h-6 w-6' />
            <p>Calculus Introduction</p>
          </div>
          <div className='border-b p-3 flex space-x-2 items-center'>
            <BiFolderOpen className='h-6 w-6 text-yellow-600' />
            <p>Prime Numbers 1 Maths note</p>
          </div>
          <div className='border-b p-3 flex space-x-2 items-center'>
            <AiOutlineFileText className='h-6 w-6' />
            <p>Calculus Introduction</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSingleSchool;
