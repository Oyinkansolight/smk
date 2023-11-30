/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from '@/components/buttons/Button';
import StudentTeacherProfileCard from '@/components/cards/StudentTeacher';
// import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import EmptyView from '@/components/misc/EmptyView';
import AddSubject from '@/components/modal/AddSubject';
import ControlledModal from '@/components/modal/ControlledModal';
import DeleteModalContent from '@/components/modal/DeleteModalContent';
import SingleStudentAttendanceTracker from '@/components/views/admin/student/SingleStudentAttendanceTracker';
import StudentDashboardView from '@/components/views/single-teacher/StudentDashboardView';
import TeacherBioDetails from '@/components/views/single-teacher/TeacherBioDetails';
import TeacherLibrary from '@/components/views/single-teacher/TeacherLibrary';
import SubjectList from '@/components/views/student.tsx/StudentSubjectList';
import TimetableView from '@/components/views/teacher/TimetableView';
import { getURL } from '@/firebase/init';
import clsxm from '@/lib/clsxm';
import { getFromLocalStorage } from '@/lib/helper';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useGetTeacherTimetable } from '@/server/Schedule';
import { useDeleteStaff } from '@/server/government/classes_and_subjects';
import {
  useGetSubjectAssignedToTeacher,
  useGetTeacherById,
  useUpdateStaffSubject,
} from '@/server/institution';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const Page = () => {
  const router = useRouter();
  const currentSessionId: string =
    getFromLocalStorage('currentSessionId') ?? '';
  const [tabIdx, setTabIdx] = useState(0);
  const [gridTabIdx, setGridTabIdx] = useState(0);
  const [isEditingBioDetails, setIsEditingBioDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAddSubject, setisAddSubject] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState('/images/teacher_1.png');

  const [computedSubjectCount, setComputedSubjectCount] = useState(0);

  const p = useSearchParams();
  const { data, error } = useGetTeacherById({
    id: p?.get('id'),
  });

  const { data: teacherTimeTable, isLoading: isTTLoading } =
    useGetTeacherTimetable({
      // sessionId: currentSessionId,
      // termId: currentTermInfo?.id,
      classId: data?.managedClassArm?.class?.id,
      teacherId: p?.get('id') ?? '',
    });

  const { data: SubjectsList } = useGetSubjectAssignedToTeacher(
    p?.get('id'),
    currentSessionId
  );
  const [assignedClassSubject, setassignedClassSubject] = useState<
    { classArmId: string | null; subjectId: string | null }[]
  >([{ classArmId: null, subjectId: null }]);

  const onClickHandler = () => {
    setisAddSubject(!isAddSubject);
  };

  const addSubjectClass = () => {
    setassignedClassSubject([
      ...assignedClassSubject,
      { classArmId: null, subjectId: null },
    ]);
  };

  useMemo(() => {
    //* Get total number of subjects a teacher is teaching by using the subject id
    const seenSubjects = new Set();
    const getTotalSubjects = () => {
      SubjectsList?.map((item: any) => {
        if (!seenSubjects.has(item.subject.id)) {
          seenSubjects.add(item.subject.id);
        }
      });

      setComputedSubjectCount(seenSubjects.size);
    };

    getTotalSubjects();
  }, [SubjectsList]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const removeRemoveSubjectClass = (id: number) => {
    const updatedItems = assignedClassSubject.filter((_, i) => i !== id);
    setassignedClassSubject(updatedItems);
    toast.success('Record deleted');
  };
  const handleSubjectClassChange = (name: string, value: any, id: number) => {
    const updatedItems = assignedClassSubject.map((item, i) => {
      if (i === id) {
        return { ...item, [name]: value }; // Update the name property
      }
      return item;
    });
    setassignedClassSubject(updatedItems);
  };
  const handleUpdateStaff = useUpdateStaffSubject();

  const SubmitHandler = async () => {
    const payload = {
      teacherId: p?.get('id'),
      sessionId: currentSessionId,
      subjectAndClasses: assignedClassSubject,
    };

    if (payload.subjectAndClasses.length === 0) {
      toast.error('Please add at least one subject');
      return;
    }

    for (let i = 0; i < payload.subjectAndClasses.length; i++) {
      if (
        !payload.subjectAndClasses[i].classArmId ||
        !payload.subjectAndClasses[i].subjectId
      ) {
        toast.error('Please complete all fields');
        return;
      }
    }

    try {
      setLoading(true);
      const response = await handleUpdateStaff.mutateAsync(payload);

      if (response) {
        toast.success('Teacher subject updated successfully');
        onClickHandler();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(getErrMsg(error));
    }
  };

  const staff = data;

  useEffect(() => {
    const getFileURL = async () => {
      if (data?.profileImg) {
        await getURL(data?.profileImg).then((imageUrl) => {
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

  const { mutateAsync } = useDeleteStaff();

  const handleDelete = async () => {
    const staffId = p?.get('id');

    if (staffId) {
      try {
        const res = await mutateAsync(staffId);
        res && router.push('/admin/all-staff');
      } catch (error) {
        logger(error);
      }
    }
  };

  const teacherName = `${
    staff ? (staff?.user ?? {})?.firstName : 'Loading...'
  } ${staff ? (staff?.user ?? {})?.lastName : ''}`;

  return (
    <div className='flex flex-col lg:flex-row'>
      <ControlledModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        content={
          <DeleteModalContent
            title='Delete Staff'
            body='Are you sure you want to delete this staff?'
            toggleModal={toggleModal}
            handleDelete={handleDelete}
          />
        }
        className='max-w-[777px] w-full h-[267px]'
      />
      <StudentTeacherProfileCard
        image={url}
        name={teacherName}
        school={staff?.institution?.instituteName ?? ''}
        id={staff?.oracleNumber ?? staff?.staffId}
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
                  label: 'Time Table',
                },
                {
                  icon: <RiCalendar2Fill className='h-5 w-5' />,
                  label: 'Attendance Tracker',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
          </div>

          {tabIdx === 0 && (
            <div>
              <div className='flex justify-end py-2'>
                <Button
                  variant='danger'
                  onClick={() => {
                    toggleModal();
                  }}
                  className='flex flex-row items-center justify-center space-x-2 w-[168px] whitespace-nowrap'
                >
                  <span>Delete Staff</span>
                </Button>
              </div>
              <StudentDashboardView
                subjectCount={computedSubjectCount}
                classCount={staff ? staff.subjects.length : 0}
                managedClass={staff ? staff.managedClassArm : {}}
              />
            </div>
          )}
          {tabIdx === 1 && (
            <div>
              {teacherTimeTable.length > 0 ? (
                <TimetableView
                  data={teacherTimeTable}
                  isLoading={isTTLoading}
                />
              ) : (
                <EmptyView
                  label='Timetable Not Available Yet'
                  useStandardHeight
                />
              )}
            </div>
          )}
          {tabIdx === 2 && <SingleStudentAttendanceTracker />}
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
                  label: 'Account Details',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
          </div>

          {tabIdx === 0 && (
            <>
              <div
                className={clsxm(
                  'flex justify-end gap-5',
                  isEditingBioDetails && 'opacity-50'
                )}
              >
                <Button
                  onClick={() => router.push('/admin/student/edit-history')}
                  disabled={isEditingBioDetails}
                  variant='ghost'
                  className='text-secondary bg-white hover:bg-secondary-100 border border-secondary-500'
                >
                  View Edit History
                </Button>
                <Button
                  disabled={isEditingBioDetails}
                  onClick={() => setIsEditingBioDetails(!isEditingBioDetails)}
                  variant='secondary'
                >
                  Edit Account Details
                </Button>
              </div>
              <div className='bg-white px-8 pb-10'>
                <TeacherBioDetails
                  isEditing={isEditingBioDetails}
                  setIsEditing={setIsEditingBioDetails}
                  initStaff={staff}
                />
              </div>
            </>
          )}
        </div>
      )}

      {isAddSubject && (
        <AddSubject
          onClickHandler={onClickHandler}
          SubmitHandler={SubmitHandler}
          removeRemoveSubjectClass={removeRemoveSubjectClass}
          addSubjectClass={addSubjectClass}
          assignedClassSubject={assignedClassSubject}
          handleSubjectClassChange={handleSubjectClassChange}
          loading={loading}
        />
      )}
      {gridTabIdx === 2 && (
        <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
          <div className='flex w-full items-center justify-between'>
            <TabBar
              variant='primary'
              selected={tabIdx}
              onSelect={(i) => setTabIdx(i)}
              items={[
                {
                  icon: <RiDashboardFill className='h-5 w-5' />,
                  label: 'Subject & Classes',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
          </div>

          {tabIdx === 0 && (
            <>
              <div className='flex justify-end'>
                <Button
                  onClick={() => {
                    setisAddSubject(!isAddSubject);
                  }}
                  disabled={isEditingBioDetails}
                  variant='ghost'
                  className='text-secondary bg-white hover:bg-secondary-100 border border-secondary-500'
                >
                  Add Subject
                </Button>
              </div>
              <SubjectList
                studentSubjectsList={SubjectsList}
                managedClassArm={data.managedClassArm}
                teacher={teacherName}
              />
            </>
          )}
        </div>
      )}
      {gridTabIdx === 3 && (
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
              <TeacherLibrary />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
