/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import TabBar from '@/components/layout/TabBar';
import Files from '@/components/views/super-admin/Library/Files';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Folder from '~/svg/folder.svg';

const Library = () => {
  const [tabIdx, setTabIdx] = useState(0);

  return (
    <div className='flex overflow-x-hidden'>
      <div className='hidden lg:flex flex-col items-center px-16 pt-5'>
        <Folder className='h-40 w-40 mt-20' />
        <h1 className='font-semibold mt-5 text-base'>Library</h1>
        <div className='h-[300px]' />
        {/* <div className='text-[#ADB8CC]'>Contact School</div>
        <div className='h-2' />
        <div className='flex space-x-3 rounded-full border-2 border-[#EDEFF2] p-3'>
          <MdLocalPhone className='h-5 w-5 text-[#FF6633]' />
          <MdMail className='h-5 w-5 text-[#29CC39]' />
          <MdChromeReaderMode className='h-5 w-5 text-[#8833FF]' />
          <BsFillSendFill className='h-5 w-5 text-[#33BFFF]' />
          <RiWhatsappFill className='h-5 w-5 text-green-500' />
        </div> */}
      </div>
      <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
        <div className='flex w-full items-center justify-between'>
          <TabBar
            variant='primary'
            selected={tabIdx}
            onSelect={(i) => setTabIdx(i)}
            items={[
              {
                icon: <GiHamburgerMenu className='h-5 w-5' />,
                label: 'Files',
              },
            ]}
          />

          <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
        </div>

        {tabIdx === 0 && <Files variant='primary' />}
      </div>
    </div>
  );
};

export default Library;
