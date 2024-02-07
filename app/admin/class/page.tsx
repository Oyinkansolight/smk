'use client';

import Button from '@/components/buttons/Button';
import StudentTeacherProfileCard from '@/components/cards/Classprofile';
import TabBar from '@/components/layout/TabBar';
import StudentList from '@/components/views/admin/Class/studentList';
import StudentLibrary from '@/components/views/single-student/StudentLibrary';
import SubjectList from '@/components/views/student.tsx/ClassSubjectList';
import ExamTimetable from '@/components/views/student.tsx/Examtimetable';
import { getFromLocalStorage } from '@/lib/helper';
import {
  useGetClassArmInfo,
  useGetInstituteClassArms,
} from '@/server/institution/class';
import { useGetClassArmStudents } from '@/server/institution/class-arm';
// import { useGetClassArmStudents } from '@/server/institution/class-arm';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { AiFillFolder } from 'react-icons/ai';
import { BiListCheck } from 'react-icons/bi';
import { RiDashboardFill } from 'react-icons/ri';

const Page = () => {
  const currentSessionId: string =
    getFromLocalStorage('currentSessionId') ?? '';
  const institutionId: string = getFromLocalStorage('institutionId') ?? '';
  const [tabIdx, setTabIdx] = useState(0);
  const [gridTabIdx, setGridTabIdx] = useState(0);
  const p = useSearchParams();
  const classArmId = p?.get('id');

  const { data: classArmInfo } = useGetClassArmInfo(classArmId);
  const { data: getInstitutionStudents } = useGetClassArmStudents({
    classArmId: classArmId,
  });

  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 100,

    institutionId,
    currentSessionId,
  });

  const {
    data: allClasses,
    isLoading,
    isError,
    refetch,
  } = useGetInstituteClassArms({ ...pagingData });

  return (
    <div className='flex md:flex-row flex-col'>
      <StudentTeacherProfileCard
        image={classArmInfo?.arm.charAt(0) ?? ''}
        name={`${classArmInfo?.class?.name ?? 'Loading...'} ${
          classArmInfo?.arm ?? ''
        }`}
        classTeacher={`${classArmInfo?.teacher?.user?.firstName ?? ''} ${
          classArmInfo?.teacher?.user?.lastName ?? ''
        }`}
        school=''
        id=''
        student={false}
        showAcademicYear
        currentGridIdx={gridTabIdx}
        setGridIdx={(v) => {
          setGridTabIdx(v);
          setTabIdx(0);
        }}
      />
      {gridTabIdx === 0 && (
        <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
          <div className='flex w-full items-center justify-between'>
            <TabBar
              variant='secondary'
              selected={tabIdx}
              onSelect={(i) => setTabIdx(i)}
              items={[
                {
                  icon: <RiDashboardFill className='h-5 w-5' />,
                  label: 'TimeTable',
                },
                {
                  icon: <BiListCheck className='h-5 w-5' />,
                  label: 'Student List',
                },
                {
                  icon: <AiFillFolder className='h-5 w-5' />,
                  label: 'Subject',
                },
                {
                  icon: <BiListCheck className='h-5 w-5' />,
                  label: 'Promotion',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
          </div>
          {tabIdx === 0 && (
            <div className='bg-[#fff] p-2 rounded'>
              {classArmInfo && (
                <ExamTimetable
                  isClassTimeTable={true}
                  classId={classArmInfo?.class?.id}
                />
              )}
            </div>
          )}
          {tabIdx === 1 && <StudentList classArmId={classArmId} />}
          {tabIdx === 2 && (
            <SubjectList studentSubjectsList={classArmInfo?.subjects} />
          )}
          {tabIdx === 3 && (
            <div>
              <p className='mb-4'>Class to transfer student to:</p>
              <div className='md:w-1/2 w-full'>
                {allClasses && allClasses?.data.length > 0 ? (
                  <select
                    name='promote'
                    id='promote'
                    className='rounded-md w-full outline-none border-none focus:ring-0'
                  >
                    {allClasses?.data?.map((item: any, key: number) => (
                      <option value={item.id} key={key}>
                        {`${item.class.name} ${item.arm}`}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className='py-10 text-center'>No Class Arm Found</div>
                )}
              </div>
              <p className='my-4'>Student List</p>
              <div className='w-full max-h-[600px] overflow-y-auto'>
                {getInstitutionStudents?.map((student, key) => (
                  <div className='flex space-x-2 items-center' key={key}>
                    <input type='checkbox' name='' id='' />
                    <p>{`${student.firstName} ${student.lastName}`}</p>
                  </div>
                ))}
              </div>

              <div className='flex justify-center w-1/2 mt-5'>
                <Button variant='secondary'> Promote Selected Children</Button>
              </div>
            </div>
          )}
        </div>
      )}

      {gridTabIdx === 1 && (
        <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
          <div className='flex w-full items-center justify-between'>
            <TabBar
              variant='primary'
              selected={tabIdx}
              onSelect={(i) => setTabIdx(i)}
              items={[
                {
                  icon: <RiDashboardFill className='h-5 w-5' />,
                  label: 'Library',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
          </div>

          {tabIdx === 0 && (
            <>
              <StudentLibrary />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
