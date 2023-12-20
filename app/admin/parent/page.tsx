/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { CountCard } from '@/components/cards';
import StudentTeacherProfileCard from '@/components/cards/ParentProfileCard';
import PopOverSelect from '@/components/input/PopOverSelect';
import TabBar from '@/components/layout/TabBar';
import ConfirmModalContent from '@/components/modal/ConfirmModalContent';
import ControlledModal from '@/components/modal/ControlledModal';
import Table from '@/components/tables/TableComponent';
import ParentBioDetails from '@/components/views/single-parent/ParentBioDetail';
import clsxm from '@/lib/clsxm';
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
import { TableColumn } from 'react-data-table-component';
import { BiListCheck } from 'react-icons/bi';
import { RiDashboardFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';


const studentListColumns: TableColumn<any>[] = [
  // { name: 'Number', cell: (row) => <div className='truncate'># {row.id}</div> },
  {
    name: 'Name',
    cell: (row) => (
      <div>
        {row.user[0].firstName} {row.user[0].lastName}
      </div>
    ),
  },
  // {
  //   name: 'Class',
  //   cell: (row) => (
  //     <div>
  //       {row.class.class.name} - {row.class.arm}
  //     </div>
  //   ),
  // },
];

const Page = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(['']);
  const [itemIndex, setItemIndex] = useState<string>();
  const instituteId = getFromLocalStorage('institutionId');
  const [isEditingBioDetails, setIsEditingBioDetails] = useState(false);

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
          toggleModal();
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const p = useSearchParams();

  const { data, error } = useGetSingleParent({
    id: p?.get('id') ?? '',
  });

  const parent = data;

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

          {tabIdx === 0 && (
            <div>
              <CountCard
                count={parent?.students?.length}
                title='Student'
                variant='basic'
              />
            </div>
          )}
          {tabIdx === 1 && (
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
                    toggleModal();
                  }}
                  setSelectedIndex={handleItemIndex}
                />
                <ControlledModal
                  isOpen={isModalOpen}
                  toggleModal={toggleModal}
                  content={
                    <ConfirmModalContent
                      title='Link Student'
                      body={`Are you sure you want to link ${selectedStudent} with ${parent?.firstName ?? 'N/A'
                        } ${parent?.lastName ?? 'N/A'}`}
                      toggleModal={toggleModal}
                      handleAction={assignStudentToParent}
                      loading={loading}
                    />
                  }
                  className='max-w-[777px] w-full h-[267px]'
                />

                <div className='bg-white rounded-md p-6'>
                  <div className='flex justify-between'>
                    <div className='text-[#6B7A99] text-xl font-bold'>
                      Student List
                    </div>
                  </div>
                  <Table
                    showFilter={false}
                    showSearch={false}
                    columns={studentListColumns}
                    data={parent?.students}
                  // data={[]}
                  />
                </div>
              </section>
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
                {/* <Button
                  disabled={isEditingBioDetails}
                  onClick={() => setIsEditingBioDetails(!isEditingBioDetails)}
                  variant='secondary'
                >
                  Edit Account Details
                </Button> */}
              </div>
              <div className='bg-white px-8 pb-20'>
                <ParentBioDetails
                  isEditing={isEditingBioDetails}
                  setIsEditing={setIsEditingBioDetails}
                  initParent={parent}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
