'use client';

import Button from '@/components/buttons/Button';
import StudentTeacherProfileCard from '@/components/cards/StudentTeacher';
// import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import EmptyView from '@/components/misc/EmptyView';
import AddSubject from '@/components/modal/AddSubject';
import SingleStudentAttendanceTracker from '@/components/views/admin/student/SingleStudentAttendanceTracker';
import StudentDashboardView from '@/components/views/single-teacher/StudentDashboardView';
import TeacherBioDetails from '@/components/views/single-teacher/TeacherBioDetails';
import TeacherLibrary from '@/components/views/single-teacher/TeacherLibrary';
import SubjectList from '@/components/views/student.tsx/StudentSubjectList';
import clsxm from '@/lib/clsxm';
import { getErrMsg } from '@/server';
import {
  useGetSubjectAssignedToTeacher,
  useGetTeacherById,
  useUpdateStaffSubject,
} from '@/server/institution';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

const Page = () => {
  const router = useRouter();
  const [tabIdx, setTabIdx] = useState(0);
  const [gridTabIdx, setGridTabIdx] = useState(0);
  const [isEditingBioDetails, setIsEditingBioDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAddSubject, setisAddSubject] = useState(false);
  const p = useSearchParams();
  const { data, error } = useGetTeacherById({
    id: p?.get('id'),
  });
  const { data: studentSubjectsList } = useGetSubjectAssignedToTeacher(
    p?.get('id')
  );
  const [assignedClassSubject, setassignedClassSubject] = useState<
    { classId: string | null; subjectId: string | null }[]
  >([{ classId: null, subjectId: null }]);

  const onClickHandler = () => {
    setisAddSubject(!isAddSubject);
  };

  const addSubjectClass = () => {
    setassignedClassSubject([
      ...assignedClassSubject,
      { classId: null, subjectId: null },
    ]);
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
      subjectAndClasses: assignedClassSubject,
    };
    try {
      setLoading(true);
      const response = await handleUpdateStaff.mutateAsync(payload);

      if (response) {
        toast.success('Staff Subject Update successfully');
        onClickHandler();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(getErrMsg(error));
    }
  };
  console.log(data);

  const staff = data;

  useEffect(() => {
    if (error) {
      toast.error(getErrMsg(error));
    }
  }, [error]);

  return (
    <div className='flex'>
      <StudentTeacherProfileCard
        // image={staff?.document?.idCardImage ?? '/images/teacher_1.png'}
        image='/images/teacher_1.png'
        name={`${(staff?.user ?? [])[0]?.firstName} ${
          (staff?.user ?? [])[0]?.lastName
        }`}
        school={staff?.institution?.instituteName ?? ''}
        id={staff?.staffId}
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
            <StudentDashboardView
              classCount={staff ? staff.classes.length : 0}
              subjectCount={staff ? staff.subjects.length : 0}
            />
          )}
          {tabIdx === 1 && (
            <div>
              <EmptyView label='Timetable Not Available Yet' />
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
              <div className='bg-white px-8'>
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
              <SubjectList studentSubjectsList={studentSubjectsList} />
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
