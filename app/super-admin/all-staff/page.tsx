/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { BasicSearch } from '@/components/search';
import clsxm from '@/lib/clsxm';
import { getErrMsg } from '@/server';
import { useGetTeachersList } from '@/server/institution';
import { Staff } from '@/types/institute';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';

const AllStaff = () => {
  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1500);
  const [action, setAction] = useState<number | null>(null);
  const [pagingData, setPagingData] = useState<any>({ page: 1, limit: 10, query });

  const {
    data: staff,
    error,
    isLoading,
    refetch
  } = useGetTeachersList({ ...pagingData });

  const handleSearch = (value: string) => {
    setQuery(value);
    setPagingData({ ...pagingData, query: value });
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
    if (staff) setPagingData({ ...pagingData, page: staff?.paging?.totalPage });
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

  return (
    <section className='md:px-[60px] px-5 py-6'>
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>All Staff</h1>

      <div className='mb-6 flex justify-between items-end'>
        <div className='bg-[#FFF6EC] p-3 rounded-2xl w-[200px]'>
          <p className='text-[#615F5F]'>Total Teacher</p>
          <h1 className='font-semibold text-2xl'>{staff?.paging.itemCount ?? 0}</h1>
        </div>
      </div>

      {/* <div className='flex space-x-2 py-2 border-b'>
        <button>All Staff</button>
        <button>Transfer Requests</button>
      </div> */}

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
            <div className='col-span-2'>Staff ID</div>
            <div className='col-span-4'>Name</div>
            <div className='hidden lg:block col-span-1'>Type</div>
            <div className='hidden lg:block col-span-2'>Institution</div>
            <div className='hidden lg:block col-span-1'>Institution Type</div>
          </div>
          {isLoading ? (
            <div className='text-center'>Loading...</div>
          ) : (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (staff?.data?.staffs ?? []).map((item: Staff, idx: number) => (
              <div className='grid grid-cols-12 p-4 border-b' key={item.id}>
                <div className='col-span-1'>
                  {(pagingData.page - 1) * 10 + (idx + 1)}
                </div>

                <div className='col-span-2'>
                  {item?.oracleNumber ?? "-"}
                </div>

                <div className='col-span-4'>
                  <Link href={`/super-admin/teacher?id=${item.id}`}>
                    {item?.user?.lastName || 'N/A'} {item?.user?.firstName || 'N/A'}
                  </Link>
                </div>

                <div className='hidden lg:block col-span-1'> {item?.staffType || 'N/A'}</div>

                <div className='col-span-4 lg:col-span-2'>
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
            ))
          )}
          {!isLoading && staff?.data?.staffs?.length === 0 && (
            <div className='text-red-500 py-4 text-center'>No record found</div>
          )}

          {staff && staff?.data?.staffs?.length > 0 && (
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

              {Array(staff.paging.totalPage)
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

              {staff.paging.totalPage > 3 &&
                <div
                  key={Math.random() * 100}
                  className={clsxm(
                    pagingData.page === 3 ||
                      (pagingData.page > 3 && pagingData.page < staff.paging.totalPage)
                      ? 'bg-[#008146] text-white'
                      : 'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2'
                  )}
                >
                  {pagingData.page > 3 && pagingData.page < staff.paging.totalPage
                    ? pagingData.page
                    : 3}
                </div>
              }

              {staff.paging.totalPage > 4 && (
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

              {staff.paging.totalPage > 1 &&
                <div
                  className={clsxm(
                    pagingData.page === staff.paging.totalPage
                      ? 'bg-[#008146] text-white'
                      : 'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2'
                  )}
                >
                  {staff.paging.totalPage}
                </div>
              }

              <button
                onClick={handleNextPage}
                disabled={staff && staff?.data?.staffs?.length < 10}
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
                disabled={staff && staff?.data?.staffs?.length < 10}
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

export default AllStaff;