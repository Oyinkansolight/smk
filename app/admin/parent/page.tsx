/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from '@/components/buttons/Button';
import StudentTeacherProfileCard from '@/components/cards/StudentTeacher';
import TabBar from '@/components/layout/TabBar';
import ControlledModal from '@/components/modal/ControlledModal';
import DeleteModalContent from '@/components/modal/DeleteModalContent';
import SingleStudentAttendanceTracker from '@/components/views/admin/student/SingleStudentAttendanceTracker';
import ExamReportView from '@/components/views/single-school/ExamReportView';
import StudentDashboardView from '@/components/views/single-student/StudentDashboardView';
import StudentLibrary from '@/components/views/single-student/StudentLibrary';
import SubjectList from '@/components/views/student.tsx/ClassSubjectList';
import StudentBioDetailsAlt from '@/components/views/student.tsx/StudentBioDetailsAlt';
import { getURL } from '@/firebase/init';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useDeleteStudent } from '@/server/government/classes_and_subjects';
import { useGetStudentList } from '@/server/government/student';
import { useGetClassArmInfo } from '@/server/institution/class';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const Page = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const [gridTabIdx, setGridTabIdx] = useState(0);
  const [isEditingBioDetails, setIsEditingBioDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const p = useSearchParams();

  const { data, error } = useGetStudentList({
    id: p?.get('id'),
  });

  const student = data;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { mutateAsync } = useDeleteStudent();

  const handleDelete = async () => {
    const studentId = p?.get('id');

    if (studentId) {
      try {
        const res = await mutateAsync(studentId);
        toggleModal();
      } catch (error) {
        logger(error);
      }
    }
  };
  const [url, setUrl] = useState<string | any>(
    'https://www.bu.edu/wll/files/2017/10/avatar.png'
  );
  const [content, setContent] = useState([]);
  const getFileURL = async () => {
    setUrl(url);
    await getURL(data?.profileImg ?? ' ').then((v) => setUrl(v));
    logger(url);
  };
  useEffect(() => {
    const getFileURL = async () => {
      if (student?.profileImg) {
        await getURL(student?.profileImg).then((imageUrl) => {
          setUrl(imageUrl);
        });
      }
    };
    getFileURL();
  }, [data]);
  useEffect(() => {
    if (error) {
      toast.error(getErrMsg(error));
    }
  }, [error]);
  return (
    <div className='flex flex-col lg:flex-row'>
      <ControlledModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        content={
          <DeleteModalContent
            title='Delete Student'
            body='Are you sure you want to delete this student?'
            toggleModal={toggleModal}
            handleDelete={handleDelete}
          />
        }
        className='max-w-[777px] w-full h-[267px]'
      />
      <StudentTeacherProfileCard
        image={url}
        name={`${(student?.user ?? [])[0]?.firstName ?? 'Loading...'} ${
          (student?.user ?? [])[0]?.lastName ?? ''
        }`}
        school={student?.institution?.instituteName ?? ''}
        id={student?.id || ''}
        student
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
              variant='primary'
              selected={tabIdx}
              onSelect={(i) => setTabIdx(i)}
              items={[
                {
                  icon: <RiDashboardFill className='h-5 w-5' />,
                  label: 'Dashboard',
                },
                {
                  icon: <BiListCheck className='h-5 w-5' />,
                  label: 'Students',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
          </div>

          {tabIdx === 0 && <div>Dashboard</div>}
          {tabIdx === 1 && (
            <div className='mb-6 flex justify-end space-x-4 items-end'>
              <Link
                href='/admin/parent/link-student'
                className='w-max rounded border border-[#008146] px-6 py-3 text-center text-xs text-[#008146] '
              >
                Link Student
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
