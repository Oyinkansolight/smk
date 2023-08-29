/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import TabBar from '@/components/layout/TabBar';
import Files from '@/components/views/super-admin/Library/Files';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const TeacherLibrary = () => {
  const [tabIdx, setTabIdx] = useState(0);

  return (
    <div className='w-full layout'>
      <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
        <div className='flex w-full items-center justify-between'>
          <TabBar
            variant='secondary'
            selected={tabIdx}
            onSelect={(i) => setTabIdx(i)}
            items={[
              {
                icon: <GiHamburgerMenu className='h-5 w-5' />,
                label: 'Library',
              },
            ]}
          />

          <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

          {/* <div className='h-full border-b-[2px] border-[#EDEFF2]'>
            <SearchInput placeholder='Search Files' className='pt-[14px]' />
          </div> */}
        </div>

        {tabIdx === 0 && <Files variant='secondary' />}
        {tabIdx === 1 && <Files variant='secondary' />}
        {tabIdx === 2 && <Files variant='secondary' />}
      </div>
    </div>
  );
};

export default TeacherLibrary;
