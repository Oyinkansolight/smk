/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import StudentTeacherProfileCard from '@/components/cards/StudentTeacher';
import PopOverSelect from '@/components/input/PopOverSelect';
import TabBar from '@/components/layout/TabBar';
import ControlledModal from '@/components/modal/ControlledModal';
import DeleteModalContent from '@/components/modal/DeleteModalContent';
import { getFromLocalStorage } from '@/lib/helper';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useDeleteStudent } from '@/server/government/classes_and_subjects';
import {
  useAssignStudentToParent,
  useGetSingleParent,
  useGetStudentsListByInstitution,
} from '@/server/institution';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';

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

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const Page = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(['']);
  const [itemIndex, setItemIndex] = useState<string>();
  const instituteId = getFromLocalStorage('institutionId');

  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1500);

  const [pagingData, setPagingData] = useState<any>({
    instituteId,
    page: 1,
    limit: 10,
    query,
  });

  const {
    data: students,
    isLoading,
    refetch,
  } = useGetStudentsListByInstitution({ ...pagingData });
  console.log(students);

  const handleSearch = (value: string) => {
    logger(value);
    setQuery(value);
    setPagingData({ ...pagingData, page: 1, query: value });
  };

  const handleItemIndex = (index) => {
    setItemIndex(index);
  };

  const handleAssignStudent = useAssignStudentToParent();

  async function assignStudentToParent() {
    if (itemIndex) {
      try {
        setLoading(true);
        const response = await handleAssignStudent.mutateAsync({
          id: p?.get('id') ?? '',
          studentId: students?.data[itemIndex].id,
        });
        if (response.status === 200) {
          toast.success('Student Linked successfully');
          setLoading(false);
        }
      } catch (error) {
        toast.error('Error adding student');
        getErrMsg(error);
        setLoading(false);
      }
    } else {
      toast.error('No Student Selected');
    }
  }

  useEffect(() => {
    const getSelectedStudent = (index) => {
      if (!index) return;

      setSelectedStudent([
        `${students?.data[index]?.lastName} ${students?.data[index]?.firstName}`,
      ]);
    };

    if (itemIndex) {
      getSelectedStudent(itemIndex);
    }
  }, [itemIndex, students?.data]);
  const [tabIdx, setTabIdx] = useState(0);
  const [gridTabIdx, setGridTabIdx] = useState(0);
  const [isEditingBioDetails, setIsEditingBioDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const p = useSearchParams();

  const { data, error } = useGetSingleParent({
    id: p?.get('id') ?? '',
  });

  const parent = data;
  console.log(data);

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
        name={`${parent?.firstName ?? 'Loading...'} ${parent?.lastName ?? ''}`}
        school=''
        id={parent?.id || ''}
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
                // {
                //   icon: <RiDashboardFill className='h-5 w-5' />,
                //   label: 'Dashboard',
                // },
                {
                  icon: <BiListCheck className='h-5 w-5' />,
                  label: 'Students',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
          </div>

          {tabIdx === 1 && <div>Dashboard</div>}
          {tabIdx === 0 && (
            <div>
              <div className='mb-6 flex justify-end space-x-4 items-end'>
                <button
                  onClick={() => setOpen(!open)}
                  className='w-max rounded border border-[#008146] px-6 py-3 text-center text-xs text-[#008146] '
                >
                  Link Student
                </button>
              </div>

              <section className=''>
                <h2 className='text-3xl font-bold'>Your Students </h2>

                <PopOverSelect
                  open={open}
                  key1='lastName'
                  key2='firstName'
                  setOpen={setOpen}
                  title='All Student'
                  data={students?.data}
                  handleSearch={handleSearch}
                  description='Select student'
                  setSelectedItem={(value) => {
                    console.log(value);
                  }}
                  setSelectedIndex={handleItemIndex}
                />

                <div className='my-10'>
                  {/* <Select
                    onClick={() => setOpen(!open)}
                    label='All Student'
                    options={selectedStudent}
                    formValue={selectedStudent[0]}
                  /> */}
                  {selectedStudent}
                  <button
                    onClick={() => {
                      assignStudentToParent();
                    }}
                    className='w-max rounded border bg-[#007AFF] px-8 py-3 text-xs text-[#fff] '
                  >
                    {loading ? (
                      <ImSpinner2 className='animate-spin' />
                    ) : (
                      'Link Student'
                    )}
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
