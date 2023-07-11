/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import TabBar from '@/components/layout/TabBar';
import Files from '@/components/views/super-admin/Library/Files';
import logger from '@/lib/logger';
import { useGetAllFiles } from '@/server/library';
import { useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';


/* eslint-disable @typescript-eslint/no-explicit-any */




const TeacherLibrary = () => {
  const GovtFilesData = useGetAllFiles('');
  const schoolFilesData: any = [];
  const teacherFilesData: any = [];
  const { data, isLoading } = GovtFilesData;
  const [tabIdx, setTabIdx] = useState(0);

  logger('data', data);

  data &&
    data.forEach((element: any) => {
      if (element.userTypes.includes('Institutions')) {
        schoolFilesData.push(element);
      }
      if (element.userTypes.includes('Teachers')) {
        teacherFilesData.push(element);
      }
    });
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

          {/* <div className='h-full border-b-[2px] border-[#EDEFF2]'>
            <SearchInput placeholder='Search Files' className='pt-[14px]' />
          </div> */}
        </div>

        {tabIdx === 0 && (
          <Files data={data} isLoading={isLoading} variant='secondary' />
        )}
        {tabIdx === 1 && (
          <Files
            data={schoolFilesData}
            isLoading={isLoading}
            variant='secondary'
          />
        )}
        {tabIdx === 2 && (
          <Files
            data={teacherFilesData}
            isLoading={isLoading}
            variant='secondary'
          />
        )}
      </div>
    </div>
  );
};

export default TeacherLibrary;