/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import ControlledModal from '@/components/modal/ControlledModal';
import DeleteModalContent from '@/components/modal/DeleteModalContent';
import { BasicSearch } from '@/components/search';
import ROUTES from '@/constant/routes';
import clsxm from '@/lib/clsxm';
import { getFromLocalStorage } from '@/lib/helper';
import logger from '@/lib/logger';
import { useDeleteClass } from '@/server/government/classes_and_subjects';
import { useGetTeachersListByInstitution } from '@/server/institution';
import { useGetInstituteClassArms } from '@/server/institution/class';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const AllClasses = () => {
  const router = useRouter();

  const currentSessionId: string =
    getFromLocalStorage('currentSessionId') ?? '';
  const institutionId: string = getFromLocalStorage('institutionId') ?? '';
  const [action, setAction] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string>();

  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1500);

  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    query,
    institutionId,
    // currentSessionId,
  });

  const {
    data: allClasses,
    isLoading,
    isError,
    refetch,
  } = useGetInstituteClassArms({ ...pagingData });

  const { data: staffs } = useGetTeachersListByInstitution({
    instituteId: institutionId,
    limit: 100,
  });

  const handleSearch = (value: string) => {
    setQuery(value);
    setPagingData({ ...pagingData, page: 1, query: value });
  };

  const handleCurrentPage = (page: number) => {
    setPagingData({ ...pagingData, page });
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
    if (allClasses)
      setPagingData({ ...pagingData, page: allClasses?.paging?.totalPage });
  };

  const getTeacher = (teacherId: number) => {
    const teacherInfo = (staffs?.data ?? []).find(
      (v: any) => v.id === teacherId
    );
    return teacherInfo?.user
      ? `${teacherInfo?.user.firstName} ${teacherInfo?.user.lastName}`
      : '';
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { mutateAsync } = useDeleteClass();

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        const res = await mutateAsync(itemToDelete);
        toast.success('class removed successfully');
        toggleModal();
        setAction(null);
      } catch (error) {
        logger(error);
      }
    }
  };

  useEffect(() => {
    const refetchSearchRecords = () => {
      if (debouncedSearchTerm) {
        refetch();
      }
    };

    refetchSearchRecords();
  }, [refetch, debouncedSearchTerm]);

  return (
    <section className='md:px-[60px] px-5 py-6'>
      <ControlledModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        content={
          <DeleteModalContent
            title='Delete Class'
            body='Are you sure you want to delete this class?'
            toggleModal={toggleModal}
            handleDelete={handleDelete}
          />
        }
        className='max-w-[777px] w-full h-[267px]'
      />
      <Link href={ROUTES.ADMIN}>
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>All Classes</h1>

      <div className='mb-6 flex justify-end space-x-4 items-end'>
        <Link
          href='/admin/add-class'
          className='w-max rounded border border-[#007AFF] px-6 py-3 text-center text-xs text-[#007AFF] '
        >
          Add Class Arm
        </Link>
      </div>
      <div className='flex justify-end'>
        <div className='flex w-[300px] space-x-2'>
          <BasicSearch placeholder='Search...' handleSearch={handleSearch} />
        </div>
      </div>

      <div className='table-add-student mt-5 pb-20 pt-1 overflow-x-auto w-full h-full'>
        <div className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400 bg-white py-4 px-1 text-[#8898AA] font-semibold'>
          <div className='col-span-3'>Class Arm</div>
          <div className='col-span-3'>Capacity</div>
          <div className='col-span-4'>Class Teacher</div>
          <div className='col-span-2'></div>
        </div>
        {isLoading && !isError ? (
          <div className='py-10 text-center'>Loading...</div>
        ) : (
          <div>
            {allClasses && allClasses?.data.length > 0 ? (
              allClasses?.data?.map((item: any, idx: number) => (
                <div
                  className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b bg-white py-4 px-1 text-[#8898AA] font-semibold'
                  key={item.id}
                >
                  <div className='col-span-3'>
                    <Link href={`/admin/class?id=${item.id}`}>
                      {`${item.class.name} ${item.arm}`}
                    </Link>
                  </div>
                  <div className='col-span-3'> {item.capacity} </div>
                  <div className='col-span-4'>
                    {getTeacher(item?.teacher?.id ?? item?.staffManager?.id)}
                  </div>
                  <div className='col-span-2'>
                    <div
                      onClick={() => {
                        setAction(idx + 1);
                      }}
                      className='relative'
                    >
                      <BsThreeDotsVertical className='text-lg' />

                      {action == idx + 1 && (
                        <div className='shadow-lg rounded-xl bg-white w-[180px] h-max absolute top-0 -left-[180px] z-10'>
                          <button
                            onClick={() => {
                              router.push(`/admin/edit-class?id=${item.id}`);
                            }}
                            className='p-4 text-black hover:bg-gray-200 w-full  text-left font-medium'
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              // item.setDeleteFileId(item?.id ?? '');
                              setItemToDelete(item.id);
                              toggleModal();
                            }}
                            className='p-4 text-black hover:bg-gray-200  text-left font-medium w-full'
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>

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
              ))
            ) : (
              <div className='py-10 text-center'>No Class Arm Found</div>
            )}
          </div>
        )}

        {allClasses && allClasses?.data?.length > 0 && (
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
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M4.43018 0.169922L5.83643 1.5764L3.72705 3.68612L5.83643 5.79583L4.43018 7.20231L0.914551 3.68612L4.43018 0.169922Z'
                  fill='#8898AA'
                />
              </svg>
            </button>

            {Array(allClasses.paging.totalPage)
              .fill(0)
              .slice(0, 2)
              .map((item, idx: number) => (
                <div
                  key={Math.random() * 100}
                  onClick={() => handleCurrentPage(idx + 1)}
                  className={clsxm(
                    pagingData.page === idx + 1
                      ? 'bg-[#008146] text-white'
                      : 'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2 cursor-pointer'
                  )}
                >
                  {idx + 1}
                </div>
              ))}

            {allClasses.paging.totalPage > 3 && (
              <div
                key={Math.random() * 100}
                className={clsxm(
                  pagingData.page === 3 ||
                    (pagingData.page > 3 &&
                      pagingData.page < allClasses.paging.totalPage)
                    ? 'bg-[#008146] text-white'
                    : 'bg-white text-gray-500',
                  'grid h-7 w-7 place-content-center rounded-full border p-2'
                )}
              >
                {pagingData.page > 3 &&
                pagingData.page < allClasses.paging.totalPage
                  ? pagingData.page
                  : 3}
              </div>
            )}

            {allClasses.paging.totalPage > 4 && (
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

            {allClasses.paging.totalPage > 2 && (
              <div
                onClick={() => handleCurrentPage(allClasses.paging.totalPage)}
                className={clsxm(
                  pagingData.page === allClasses.paging.totalPage
                    ? 'bg-[#008146] text-white'
                    : 'bg-white text-gray-500',
                  'grid h-7 w-7 place-content-center rounded-full border p-2 cursor-pointer'
                )}
              >
                {allClasses.paging.totalPage}
              </div>
            )}

            <button
              onClick={handleNextPage}
              disabled={
                (allClasses && allClasses?.data?.length < 10) ||
                pagingData.page === allClasses.paging.totalPage
              }
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
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M2.32031 0.169922L0.914062 1.5764L3.02344 3.68612L0.914062 5.79583L2.32031 7.20231L5.83594 3.68612L2.32031 0.169922Z'
                  fill='#8898AA'
                />
              </svg>
            </button>

            <button
              onClick={handleJumpToEnd}
              disabled={
                (allClasses && allClasses?.data?.length < 10) ||
                pagingData.page === allClasses.paging.totalPage
              }
              className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
            >
              <BiChevronsRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllClasses;
