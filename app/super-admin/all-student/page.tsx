/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';


import { BasicSearch } from '@/components/search';
import { INSTITUTION_TYPES } from '@/constant/institution';
import clsxm from '@/lib/clsxm';
import { getErrMsg } from '@/server';
import { useGetStudentsList } from '@/server/institution';
import { FlattenedStudent } from '@/types/institute';

// import AvrilImage from '~/svg/avril.svg';
import ControlledModal from '@/components/modal/ControlledModal';
import DeleteModalContent from '@/components/modal/DeleteModalContent';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useDeleteStudent } from '@/server/government/classes_and_subjects';
import {
  useGetStudentsList,
} from '@/server/institution';
import { Student } from '@/types/institute';
import Image from 'next/image';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';

import Castle from '~/svg/castle.svg';
import NextArrow from '~/svg/nextarrow.svg';
import PrevArrow from '~/svg/prevarrow.svg';
import Student from '~/svg/student.svg';

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

const studentListColumns: TableColumn<FlattenedStudent & { idx: number }>[] = [
  {
    name: 'No',
    selector: (row) => row.idx,
    cell: (row) => <div>#{row.idx + 1}</div>,
  },
  { name: 'Student ID', selector: (row) => row.id ?? '' },
  {
    name: 'Name',
    selector: (row) => row['user.0.firstName'] ?? '',
    cell: (row) => (
      <div className='col-span-3 w-max text-left  text-[#525F7F] flex space-x-2 items-center'>
        <Link href={`/super-admin/student?id=${row.id}`}>
          <h2 className='text-sm font-medium capitalize'>
            {row['user.0.lastName'] ?? row['user.lastName']}{' '}
            {row['user.0.firstName'] ?? row['user.firstName']}
          </h2>
        </Link>
      </div>
    ),
  },
  { name: 'Type', selector: (row) => row['user.0.type'] ?? '-' },
  {
    name: 'Institution',
    selector: (row) => row['institution.instituteName'] ?? '-',
  },
  {
    name: 'Institution Type',
    selector: (row) => row['institution.instituteType'] ?? '-',
  },
];

const AllStudent = () => {
  const [lastName, setLastName] = useState('');
  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    lastName,
  });

import { BasicSearch } from '@/components/search';
import clsxm from '@/lib/clsxm';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { useDebounce } from 'usehooks-ts';

const AllStudent = () => {
  const [action, setAction] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string>();

  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1500);

  const [pagingData, setPagingData] = useState<any>({ page: 1, limit: 10, query });


  const {
    data: students,
    error,
    isLoading,
    refetch
  } = useGetStudentsList({ ...pagingData });


  const handleSearch = (value: string) => {
    setQuery(value);
    setPagingData({ ...pagingData, query: debouncedSearchTerm });
  };


  const handleNextPage = () => {
    setPagingData({ ...pagingData, page: pagingData.page + 1 });
  };

  const handlePrevPage = () => {
    if (pagingData.page === 1) return;
    setPagingData({ ...pagingData, page: pagingData.page - 1 });
  };

  const handleJumpToStart = () => {
    setPagingData({ ...pagingData, page: 1 });
  };

  const handleJumpToEnd = () => {
    if (students) setPagingData({ ...pagingData, page: students?.paging?.totalPage });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { mutateAsync } = useDeleteStudent();

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        toggleModal();
        setAction(null)
        const res = await mutateAsync(itemToDelete);
        toast.success('Student removed successfully');
      } catch (error) {
        logger(error);
      }
    }
  };

  useEffect(() => {
    const refetchSearchRecords = () => {
      if (debouncedSearchTerm) {
        refetch()
      }
    };

    refetchSearchRecords();

  }, [refetch, debouncedSearchTerm]);


  useEffect(() => {
    if (error) {
      toast.error(getErrMsg(error));
    }
  }, [error]);


  const InstituteTypeCard = ({ type, title, count }) => {
    return (
      <div
        className={clsxm(
          type === 'ECCDE' && 'bg-[#FFFEF5] border-[#FFE664]',
          type === 'Primary' && 'bg-[#FFF8F4] border-[#FFCAAB]',
          type === 'Tertiary' && 'bg-[#F9FFFA] border-[#73ED95]',
          type === 'Secondary' && 'bg-[#FAFDFF] border-[#A4DEFF]',
          'p-4 space-y-2 rounded-lg  border-[0.5px] '
        )}
      >
        <h4
          className={clsxm(
            type === 'ECCDE' && ' text-[#D9B80E]',
            type === 'Primary' && ' text-[#AC4407]',
            type === 'Tertiary' && ' text-[#008F28]',
            type === 'Secondary' && ' text-[#6699B6]',
            'text-sm font-normal '
          )}
        >
          {title}
        </h4>
        <h1 className='text-4xl'>{count}</h1>
      </div>
    );
  };

  return (
    <section className='md:px-[60px] px-5 py-6'>
      {/* <Link href='/super-admin'>

  const totalPage = students?.paging?.totalPage ?? 0;

  return (
    <section className='md:px-[60px] px-5 py-6'>
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
      <Link href='/super-admin'>
        <div className='flex items-center space-x-4'>
          <Image
            src='/svg/back.svg'
            width={10}
            height={10}
            alt='back'
            className='h-4 w-4'
          />
          <h3 className='text-[10px] font-medium'>Dashboard</h3>
        </div>
      </Link>

      <h1 className='mt-5 mb-6 text-2xl font-bold'>All Students</h1>

      <div className='mb-6 flex justify-between items-end'>
        <div className='bg-[#FFF6EC] p-3 rounded-2xl w-[200px]'>
          <p className='text-[#615F5F]'>Total Students</p>
          <h1 className='font-semibold text-2xl'>{(pagingData.limit * totalPage) ?? 0}</h1>
        </div>
      </div>

      <div className='table-add-student mt-5 pb-4 pt-1 overflow-x-auto w-full'>
        {isLoading ? (
          <div className='text-center'>Loading...</div>
        ) : (
          <Table
            handleSearchParam={handleSearch}
            data={
              students?.data?.map(
                (v, i) =>
                ({
                  idx:
                    pagingData.page * pagingData.limit - pagingData.limit + i,
                  ...flattenObject(v),
                } as FlattenedStudent & {
                  idx: number;
                })
              ) ?? []
            }
            columns={studentListColumns}
            paginationServer
            paginationTotalRows={
              pagingData.limit * (students?.paging.totalPage ?? 0)
            }
            onChangePage={(page) => {
              setPagingData({ page, limit: pagingData.limit, lastName });
            }}
            onChangeRowsPerPage={(limit, page) => {
              setPagingData({ page, limit, lastName });
            }}
          />
        )}
        {!isLoading && students?.data?.length === 0 && (
          <div className='text-red-500 py-4 text-center'>No record found</div>
        )}
      </div> */}

      <div className='rounded-2xl p-4 bg-[#FFF4DF]'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-4xl'>Student</h1>
            <h2 className='text-[#8C8C8C] text-base font-normal'>
              An overview of all students
            </h2>
          </div>
          <Link
            href='/super-admin/add-school'
            className='w-max h-fit py-3 rounded-3xl border bg-[#5754F7] px-3  text-center text-xs text-white '
          >
            Add Student
          </Link>
        </div>

        <div className='space-y-4 my-4 pt-4'>
          <InstituteTypeCard
            type='ECCDE'
            title='Total ECCDE Students'
            count={0}
          />
          <InstituteTypeCard
            type='Primary'
            title='Total Primary Students'
            count={0}
          />
          <InstituteTypeCard
            type='Secondary'
            title='Total Secondary Students'
            count={0}
          />
          <InstituteTypeCard
            type='Tertiary'
            title='Total Tertiary Students'
            count={0}
          />
        </div>
      </div>
      <div className='flex space-x-2 py-4 mt-8'>
        <button className='w-max h-fit py-2 rounded-3xl border bg-[#5754F7] px-3  text-center text-xs text-white '>
          All Student List
        </button>
        <button className='w-max h-fit py-2 rounded-3xl border bg-[#fff]  px-3  text-center text-xs text-gray-500 '>
          Transfer Student List
        </button>
      </div>
      <div className='rounded-2xl p-4 mt-2 bg-[#FFF]'>
        <div className='flex sm:flex-row flex-col sm:justify-between justify-start sm:items-end'>
          <div className='space-y-3'>
            <h2 className='text-[#8C8C8C] text-base font-normal'>
              List of all the Students in the state
            </h2>
            <BasicSearch />
          </div>
          <div className='flex space-x-2 mt-2 sm:mt-0 pb-4'>
            <button className='bg-black  rounded-lg flex space-x-2 p-2 text-white'>
              <span>Filter by institution</span>
              <span>
                <svg
                  width='17'
                  height='16'
                  viewBox='0 0 17 16'

      <div className='flex flex-col gap-4'>
        <div className='flex justify-end'>
          <div className='flex w-[300px] space-x-2'>

            <BasicSearch
              placeholder='Search...'
              handleSearch={handleSearch}
            />
          </div>
        </div>
        <div className='table-add-student mt-3 py-4 pb-4 bg-white overflow-x-scroll'>
          <div className='grid grid-cols-12 p-4 border-b text-[#55597D] font-medium'>
            <div className='col-span-1'>No</div>
            <div className='col-span-5'>Name</div>
            <div className='hidden lg:block col-span-4'>Institution</div>
            <div className='hidden lg:block col-span-1'>Institution Type</div>
          </div>

          {isLoading &&
            <div className='text-center'>Loading...</div>
          }

          {!isLoading && students && students?.data?.length > 0 && (
            students?.data.map((item: Student, idx: number) => (
              <div className='grid grid-cols-12 p-4 border-b' key={item.id}>
                <div className='col-span-1'>
                  {(pagingData.page - 1) * 10 + (students?.paging?.itemCount ?? idx + 1)}
                </div>

                <div className='col-span-5'>
                  <Link href={`/super-admin/student?id=${item.id}`}>
                    {item?.user?.[0]?.lastName || item?.lastName || 'N/A'} {item?.user?.[0]?.firstName || item?.firstName || 'N/A'}
                  </Link>
                </div>

                <div className='col-span-4 lg:col-span-4'>
                  {' '}
                  {item?.institution?.instituteName || 'N/A'}{' '}
                </div>

                <div className='hidden lg:block col-span-1'>
                  {' '}
                  {item?.institution?.instituteType || 'N/A'}{' '}
                </div>

                <div className='col-span-1 justify-end flex'>
                  <button
                    onClick={() => {
                      setAction(idx + 1);
                    }}
                    className='relative'
                  >
                    <BsThreeDotsVertical />
                    {action == idx + 1 && (
                      <div className='shadow-lg rounded-xl bg-white w-[140px] h-max absolute top-0 -left-[150px] z-10'>
                        <button className='p-4 hover:bg-gray-200 w-full'>
                          Edit
                        </button>
                        <button className='p-4 hover:bg-gray-200 w-full'>
                          Delete
                        </button>
                      </div>
                    )}
                  </button>
                  {action && (
                    <div
                      className='fixed inset-0 z-[1]'
                      onClick={() => {
                        setAction(null);
                      }}
                    ></div>
                  )}
                </div>
              </div>
            )))}

          {!isLoading && students?.data?.length === 0 && (
            <div className='text-red-500 py-4 text-center'>No record found</div>
          )}

          {students && students?.data?.length > 0 && (
            <div className='lg:min-w-[800px] my-4 flex items-center justify-center lg:justify-end space-x-3 lg:pr-10'>
              <button
                onClick={handleJumpToStart}
                disabled={pagingData.page === 1}
                className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
              >
                <BiChevronsLeft />
              </button>

              <button
                onClick={handlePrevPage}
                disabled={pagingData.page === 1}
                className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
              >
                <svg
                  width='6'
                  height='8'
                  viewBox='0 0 6 8'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M4.2651 5.65967C4.46036 5.44678 4.77694 5.44678 4.97221 5.65967L8.2651 9.25C8.46036 9.4629 8.77694 9.4629 8.97221 9.25L12.2651 5.65968C12.4604 5.44678 12.7769 5.44678 12.9722 5.65968C13.1675 5.87257 13.1675 6.21775 12.9722 6.43065L9.67931 10.021C9.09353 10.6597 8.14378 10.6597 7.55799 10.021L4.2651 6.43065C4.06984 6.21775 4.06984 5.87257 4.2651 5.65967Z'
                    fill='#D9D9D9'
                  />
                </svg>
              </span>
            </button>
            <button className='bg-black  rounded-lg flex space-x-2 p-2 text-white'>
              <span>Filter by location</span>
              <span>
                <svg
                  width='17'
                  height='16'
                  viewBox='0 0 17 16'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M4.43018 0.169922L5.83643 1.5764L3.72705 3.68612L5.83643 5.79583L4.43018 7.20231L0.914551 3.68612L4.43018 0.169922Z'
                    fill='#8898AA'
                  />
                </svg>
              </button>

              {Array(students.paging.totalPage)
                .fill(0)
                .slice(0, 2)
                .map((item, idx: number) => (
                  <div
                    key={Math.random() * 100}
                    className={clsxm(
                      pagingData.page === idx + 1
                        ? 'bg-[#008146] text-white'
                        : 'bg-white text-gray-500',
                      'grid h-7 w-7 place-content-center rounded-full border p-2'
                    )}
                  >
                    {idx + 1}
                  </div>
                ))}

              {students.paging.totalPage > 3 &&
                <div
                  key={Math.random() * 100}
                  className={clsxm(
                    pagingData.page === 3 ||
                      (pagingData.page > 3 && pagingData.page < students.paging.totalPage)
                      ? 'bg-[#008146] text-white'
                      : 'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2'
                  )}
                >
                  {pagingData.page > 3 && pagingData.page < students.paging.totalPage
                    ? pagingData.page
                    : 3}
                </div>
              }

              {students.paging.totalPage > 4 && (
                <div
                  key={Math.random() * 100}
                  className={clsxm(
                    'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2'
                  )}
                >
                  ...
                </div>
              )}

              {students.paging.totalPage > 1 &&
                <div
                  className={clsxm(
                    pagingData.page === students.paging.totalPage
                      ? 'bg-[#008146] text-white'
                      : 'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2'
                  )}
                >
                  {students.paging.totalPage}
                </div>
              }

              <button
                onClick={handleNextPage}
                disabled={students && students?.data?.length < 10}
                className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
              >
                <svg
                  width='6'
                  height='8'
                  viewBox='0 0 6 8'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M4.2651 5.65967C4.46036 5.44678 4.77694 5.44678 4.97221 5.65967L8.2651 9.25C8.46036 9.4629 8.77694 9.4629 8.97221 9.25L12.2651 5.65968C12.4604 5.44678 12.7769 5.44678 12.9722 5.65968C13.1675 5.87257 13.1675 6.21775 12.9722 6.43065L9.67931 10.021C9.09353 10.6597 8.14378 10.6597 7.55799 10.021L4.2651 6.43065C4.06984 6.21775 4.06984 5.87257 4.2651 5.65967Z'
                    fill='#D9D9D9'
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
        {students?.data && (
          <div className='space-y-2 mt-4'>
            {students?.data.map((item, idx) => (
              <InstitutionCard data={item} key={idx} />
            ))}
          </div>
        )}

        <div className='flex justify-between py-4 border-t mt-5'>
          <div>Page 1 of 30</div>
          <div className='flex space-x-2 items-center'>
            <button className='bg-[#f7f7f7]   shadow-[2px] border px-3 py-1 rounded-3xl font-bold flex items-center space-x-2'>
              {' '}
              <PrevArrow /> <span>Previous</span>
            </button>
            <button className='bg-[#f7f7f7] shadow-[2px] border px-3 py-1 rounded-3xl font-bold flex items-center space-x-2'>
              {' '}
              <span>Next</span> <NextArrow />
            </button>
          </div>
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M2.32031 0.169922L0.914062 1.5764L3.02344 3.68612L0.914062 5.79583L2.32031 7.20231L5.83594 3.68612L2.32031 0.169922Z'
                    fill='#8898AA'
                  />
                </svg>
              </button>

              <button
                onClick={handleJumpToEnd}
                disabled={students && students?.data?.length < 10}
                className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
              >
                <BiChevronsRight />
              </button>
            </div>
          )}
        </div>
      </div>

    </section>
  );
};

const InstitutionCard = ({ data }) => {
  const isECCDE =
    data.institution.instituteType.toLowerCase() ===
    INSTITUTION_TYPES.ECCDE.toLowerCase();
  const isTertiary =
    data.institution.instituteType.toLowerCase() ===
    INSTITUTION_TYPES.TERTIARY.toLowerCase();
  const isSecondary =
    data.institution.instituteType.toLowerCase() ===
    INSTITUTION_TYPES.SECONDARY.toLowerCase();
  const isPrimary =
    data.institution.instituteType.toLowerCase() ===
      INSTITUTION_TYPES.PRIMARY.toLowerCase() ||
    data.institution.instituteType.toLowerCase() === 'basic';

  return (
    <div
      className={clsxm(
        isECCDE && 'bg-[#FFFEF9] border-[#FFE664]',
        isPrimary && 'bg-[#FFF8F4] border-[#FFCAAB]',
        isTertiary && 'bg-[#F9FFFA] border-[#73ED95]',
        isSecondary && 'bg-[#FAFDFF] border-[#A4DEFF]',
        'flex flex-row justify-between border-[0.25px] border-l-2 rounded-lg p-2 h-fit'
      )}
    >
      <div className='text-sm flex flex-col items-start capitalize gap-2 font-medium whitespace-nowrap overflow-hidden'>
        <div className=' text-ellipsis overflow-hidden'>
          {`${data.firstName} ${data.lastName}`}
        </div>
        <div
          className={clsxm(
            isECCDE && 'bg-[#FFE664]',
            isPrimary && 'bg-[#FFCAAB]',
            isTertiary && 'bg-[#73ED95]',
            isSecondary && 'bg-[#6699B6]',
            'flex items-center text-[10px] px-[5px] h-5 font-normal text-white rounded-full capitalize'
          )}
        >
          {data?.institution.instituteType ?? ''}
        </div>

        <div className='text-xs font-light text-[#8B8B8B] flex space-x-2'>
          <Castle className='h-4 w-4 self-end opacity-50' />
          <span>{data?.institution.instituteName ?? ''}</span>
        </div>
        <div className='text-xs font-light text-[#98988E]'>
          Class: <span className='font-medium'>{data?.class?.class?.name}</span>
        </div>
      </div>

      <div className='flex  flex-col-reverse gap-3'>
        <Student className='h-8 w-8 self-end opacity-50' />
      </div>
    </div>
  );
};

export default AllStudent;
