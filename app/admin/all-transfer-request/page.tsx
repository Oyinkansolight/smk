/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// import AvrilImage from '~/svg/avril.svg';
import ControlledModal from '@/components/modal/ControlledModal';
import DeleteModalContent from '@/components/modal/DeleteModalContent';
import { BasicSearch } from '@/components/search';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import {
  useDeleteStudentRequest,
  useGetStudentTransferRequests,
} from '@/server/institution';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';

/* eslint-disable @typescript-eslint/no-explicit-any */

const AllStudentTransferRequests = () => {
  const [action, setAction] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string>();

  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1500);

  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    // query,
    // sort: 'SUCCESS'
  });

  const {
    data: students,
    error,
    isLoading,
    refetch,
  } = useGetStudentTransferRequests({ ...pagingData });

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
    if (students)
      setPagingData({ ...pagingData, page: students?.paging?.totalPage });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { mutateAsync } = useDeleteStudentRequest();

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        toggleModal();
        setAction(null);
        const res = await mutateAsync(itemToDelete);
        toast.success('Student request removed successfully');
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

  useEffect(() => {
    if (error) {
      toast.error(getErrMsg(error));
    }
  }, [error]);

  return (
    <section className='py-6 layout'>
      <ControlledModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        content={
          <DeleteModalContent
            title='Delete Student Request'
            body='Are you sure you want to delete this request?'
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>
        Student Transfer Requests
      </h1>

      <div className='mb-6 flex justify-between items-end'>
        <div className='bg-[#FFF6EC] p-3 rounded-2xl w-[200px]'>
          <p className='text-[#615F5F]'>Total Requests</p>
          <h1 className='font-semibold text-2xl'>
            {students?.paging?.totalItems ?? 0}
          </h1>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex justify-end'>
          <div className='flex w-[300px] space-x-2'>
            <BasicSearch placeholder='Search...' handleSearch={handleSearch} />
          </div>
        </div>
        <div className='table-add-student mt-3 py-4 pb-4 bg-white overflow-x-scroll'>
          <div className='grid grid-cols-12 p-4 border-b text-[#55597D] font-medium'>
            <div className='col-span-1'>No</div>
            <div className='col-span-3'>Name</div>
            <div className='col-span-3'>Previous Institution</div>
            <div className='col-span-3'>New Institution</div>
            <div className='hidden lg:block col-span-1'>Status</div>
          </div>

          {isLoading && <div className='text-center'>Loading...</div>}

          {!isLoading &&
            students &&
            students?.data?.length > 0 &&
            students?.data.map((item: any, idx: number) => (
              <div className='grid grid-cols-12 p-4 border-b' key={item.id}>
                <div className='col-span-1'>
                  {(pagingData.page - 1) * 10 + (idx + 1)}
                </div>

                <div className='col-span-3'>
                  {item?.student?.[0]?.lastName ||
                    item?.student?.lastName ||
                    'N/A'}{' '}
                  {item?.student?.[0]?.firstName ||
                    item?.student?.firstName ||
                    'N/A'}
                </div>

                <div className='col-span-3'>
                  {' '}
                  {item?.transferFrom?.instituteName || 'N/A'}{' '}
                </div>

                <div className='col-span-3'>
                  {' '}
                  {item?.transferTo?.instituteName || 'N/A'}{' '}
                </div>

                <div className='col-span-1'> {item?.status || 'N/A'} </div>

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
                        <span
                          // href={`/super-admin/student?id=${item.id}`}
                          className='p-4 hover:bg-gray-200 w-full block'
                        >
                          Edit
                        </span>
                        <button
                          onClick={() => {
                            setItemToDelete(item.id);
                            toggleModal();
                          }}
                          className='p-4 hover:bg-gray-200 w-full'
                        >
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
            ))}

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

              {students.paging.totalPage > 3 && (
                <div
                  key={Math.random() * 100}
                  className={clsxm(
                    pagingData.page === 3 ||
                      (pagingData.page > 3 &&
                        pagingData.page < students.paging.totalPage)
                      ? 'bg-[#008146] text-white'
                      : 'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2'
                  )}
                >
                  {pagingData.page > 3 &&
                    pagingData.page < students.paging.totalPage
                    ? pagingData.page
                    : 3}
                </div>
              )}

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

              {students.paging.totalPage > 1 && (
                <div
                  onClick={() => handleCurrentPage(students.paging.totalPage)}
                  className={clsxm(
                    pagingData.page === students.paging.totalPage
                      ? 'bg-[#008146] text-white'
                      : 'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2 cursor-pointer'
                  )}
                >
                  {students.paging.totalPage}
                </div>
              )}

              <button
                onClick={handleNextPage}
                disabled={
                  (students && students?.data?.length < 10) ||
                  pagingData.page === students.paging.totalPage
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
                  (students && students?.data?.length < 10) ||
                  pagingData.page === students.paging.totalPage
                }
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

export default AllStudentTransferRequests;
