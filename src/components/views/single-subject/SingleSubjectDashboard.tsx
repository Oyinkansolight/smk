/* eslint-disable react-hooks/rules-of-hooks */

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import SubjectProfileCard from '@/components/cards/SubjectProfile';
import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import AllCurriculumView from '@/components/views/single-subject/AllCurriculumView';
import SingleTestExamView from '@/components/views/single-subject/SingleTestExamView';
import TaskListView from '@/components/views/single-subject/TaskListView';
import TestExamListView from '@/components/views/single-subject/TestExamListView';
import Files from '@/components/views/super-admin/Library/Files';
import request, { getErrMsg } from '@/server';
import { useGetSubjectById } from '@/server/institution';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdArrowBackIos } from 'react-icons/md';
import { RiDashboardFill } from 'react-icons/ri';

const SingleSubjectDashboard = () => {
  const params = useSearchParams();
  const [page, setPage] = useState(0);
  const id = params?.get('id') as string;
  const { data } = useGetSubjectById(id);
  const [sessionterms, setsessionterms] = useState([]);
  const [allclasses, setallclasses] = useState<any>([]);
  const [schoolType, setschoolType] = useState(2);
  const [termId, settermId] = useState('');
  const [classId, setclassId] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [academicyear, setacademicyear] = useState({ session: '', id: '' });
  const [currentTermName, setCurrentTermName] = useState('First Term');

  const handleSetCurrentTermName = (termName: string) => {
    setCurrentTermName(termName);
  };

  // const { data: allclasses } = useGetClassesList();

  const GetAllClasses = async () => {
    setisLoading(true);
    await request
      .get(
        `/v1/government/curriculum/get-subject-curriculum-completion?sessionId=${academicyear.id}&termId=${termId}&subjectId=${id}`
      )
      .then((res) => {
        setisLoading(false);
        setallclasses(res.data.data.data);
      })
      .catch((err) => {
        setisLoading(false);
        getErrMsg(err);
      });
  };

  useEffect(() => {
    if (termId && academicyear?.id && id) {
      GetAllClasses();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termId, academicyear]);


  return (
    // max-width: 68.75rem;
    // @apply mx-auto w-11/12;
    <div className='w-11/12 max-w-7xl mx-auto flex overflow-y-scroll'>
      <SubjectProfileCard
        name={(data ?? [])[0]?.name ?? 'Loading...'}
        setschoolType={setschoolType}
        setacademicyear={setacademicyear}
        setsessionterms={setsessionterms}
        sessionterms={sessionterms}
        settermId={settermId}
        handleSetCurrentTermName={handleSetCurrentTermName}
      />
      <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
        <>
          <div className='flex w-full items-center justify-between'>
            <TabBar
              variant='primary'
              selected={page}
              onSelect={(i) => setPage(i)}
              items={[
                {
                  icon: <RiDashboardFill className='h-5 w-5' />,
                  label: 'Subject Classes',
                },
                {
                  icon: <RiDashboardFill className='h-5 w-5' />,
                  label: 'Test & Exam Question',
                },
                {
                  icon: <GiHamburgerMenu className='h-5 w-5' />,
                  label: 'Files',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
          </div>

          {page === 0 && (
            <TaskListView
              params={params}
              curriculumClicked={() => setPage(3)}
              schoolType={schoolType}
              academicyear={academicyear?.session}
              classList={allclasses || []}
              sessionterms={sessionterms || []}
              settermId={settermId}
              setclassId={setclassId}
              isLoading={isLoading}
            />
          )}

          {page === 1 && (
            <TestExamListView
              curriculumClicked={() => setPage(4)}
              schoolType={schoolType}
              academicyear={academicyear?.session}
              classList={allclasses || []}
              sessionterms={sessionterms || []}
              settermId={settermId}
              setclassId={setclassId}
              isLoading={isLoading}
            />
          )}

          {page === 2 && <Files variant='primary' />}

          {page === 3 && (
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
              <AllCurriculumView
                termId={termId}
                sessionId={academicyear?.id}
                classId={classId}
              />
            </>
          )}

          {page === 4 && (
            <>
              <div className='flex w-full items-center justify-between'>
                <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

                <div className='h-full w-full items-center border-b-[2px] flex border-[#EDEFF2]'>
                  <div
                    onClick={() => setPage(1)}
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
              <SingleTestExamView
                subject={data}
                termId={termId}
                classId={classId}
                schoolType={schoolType}
                sessionId={academicyear.id}
                currentTermName={currentTermName}
                className={allclasses?.find((c) => c.classId === classId)?.className}
              />
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default SingleSubjectDashboard;
