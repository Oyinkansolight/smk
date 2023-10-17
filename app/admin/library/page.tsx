/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import Files from '@/components/views/super-admin/Library/Files';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import Folder from '~/svg/folder.svg';

/* eslint-disable @typescript-eslint/no-explicit-any */

const Library = () => {
  const isGenericApp = Cookies.get('isGenericApp') === 'Y';
  const [tabIdx, setTabIdx] = useState(0);
  return (
    <div className='flex'>
      <div className='flex flex-col items-center px-16 pt-5'>
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
            variant='secondary'
            selected={tabIdx}
            onSelect={(i) => setTabIdx(i)}
            items={[
              {
                icon: <GiHamburgerMenu className='h-5 w-5' />,
                label: isGenericApp ? 'Library' : 'Government Library',
              },
              {
                icon: <BiListCheck className='h-5 w-5' />,
                label: 'School Library',
              },
            ]}
          />

          <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

          <div className='h-full border-b-[2px] border-[#EDEFF2]'>
            <SearchInput placeholder='Search Files' className='pt-[14px]' />
          </div>
        </div>

        {tabIdx === 0 && <Files variant='secondary' />}
        {tabIdx === 1 && <Files variant='secondary' />}
      </div>
    </div>
  );
};

export default Library;
