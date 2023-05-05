/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import SubjectProfileCard from '@/components/cards/SubjectProfile';
import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import AllCurriculumView from '@/components/views/single-subject/AllCurriculumView';
import TaskListView from '@/components/views/single-subject/TaskListView';
import logger from '@/lib/logger';
import { useGetSubjectById } from '@/server/institution';
import { useState } from 'react';
import { MdArrowBackIos } from 'react-icons/md';
import { RiDashboardFill } from 'react-icons/ri';
import { useRouter } from 'next/router';

const SingleSubjectDashboard = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const { id } = router.query as any;
  const { data } = useGetSubjectById(id);
  logger(data);
  return (
    // max-width: 68.75rem;
    // @apply mx-auto w-11/12;
    <div className='w-11/12 max-w-7xl mx-auto flex overflow-y-scroll'>
      <SubjectProfileCard name='Mathematics' />
      <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
        {page === 0 ? (
          <>
            <div className='flex w-full items-center justify-between'>
              <TabBar
                variant='primary'
                selected={0}
                items={[
                  {
                    icon: <RiDashboardFill className='h-5 w-5' />,
                    label: 'Subject Classes',
                  },
                ]}
              />

              <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

              <div className='h-full border-b-[2px] border-[#EDEFF2]'>
                <SearchInput placeholder='Search Tasks' className='pt-[14px]' />
              </div>
            </div>
            <TaskListView curriculumClicked={() => setPage(1)} />
          </>
        ) : (
          <>
            <div className='flex w-full items-center justify-between'>
              <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

              <div className='h-full w-full items-center border-b-[2px] flex border-[#EDEFF2]'>
                <div
                  onClick={() => setPage(0)}
                  className='bg-[#EDEFF2] cursor-pointer items-center rounded-md py-2 px-4 flex'
                >
                  <MdArrowBackIos className='text-[#E5A500]' />{' '}
                  <div className='w-4' /> <div>Go Back</div>
                </div>
                <div className='flex-1' />
                <SearchInput
                  placeholder='Search Tasks'
                  className='pt-[14px] pb-5'
                />
              </div>
            </div>
            <AllCurriculumView />
          </>
        )}
      </div>
    </div>
  );
};

export default SingleSubjectDashboard;
