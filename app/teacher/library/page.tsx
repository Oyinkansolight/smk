'use client';

import StaffProfileCard from '@/components/cards/StaffProfile';
import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import Files from '@/components/views/admin/Library/Files';
import { useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';

const TeacherLibrary = () => {
  const [tabIdx, setTabIdx] = useState(0);

  return (
    <div className='layout flex'>
      <StaffProfileCard />
      <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
        <div className='flex w-full items-center justify-between'>
          <TabBar
            variant='secondary'
            selected={tabIdx}
            onSelect={(i) => setTabIdx(i)}
            items={[
              {
                icon: <GiHamburgerMenu className='h-5 w-5' />,
                label: 'Government Library',
              },
              {
                icon: <BiListCheck className='h-5 w-5' />,
                label: 'School Library',
              },
              {
                icon: <BiListCheck className='h-5 w-5' />,
                label: 'Personal Library',
              },
            ]}
          />

          <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

          <div className='h-full border-b-[2px] border-[#EDEFF2]'>
            <SearchInput placeholder='Search Files' className='pt-[14px]' />
          </div>
        </div>

        {tabIdx === 0 && <Files />}
        {tabIdx === 1 && <Files />}
        {tabIdx === 2 && <Files />}
      </div>
    </div>
  );
};

export default TeacherLibrary;
