/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { BasicSearch } from '@/components/search';
import clsxm from '@/lib/clsxm';
import { getErrMsg } from '@/server';
import { useGetSchools } from '@/server/institution';
import { Institution } from '@/types/institute';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';

const SchoolByType = ({ name, title }: { name: string; title: string }) => {
  const AT = Cookies.get('adminType');
  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1500);
  const [action, setAction] = useState<number | null>(null);
  const [pagingData, setPagingData] = useState<any>({ page: 1, limit: 10, query });

  const {
    data: schools,
    error,
    isLoading,
    refetch
  } = useGetSchools({ ...pagingData });

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
    if (schools) setPagingData({ ...pagingData, page: schools?.paging?.totalPage });
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>{name}</h1>

      {AT === "SUPER" &&
        <div className='mb-6 flex justify-between items-end'>
          <Link
            href='/super-admin/add-school'
            className='w-max rounded border border-[#007AFF] px-6 py-3 text-center text-xs text-[#007AFF] '
          >
            Add Institution
          </Link>
        </div>
      }

      <div className='mb-6 flex justify-between items-end'>
        <div className='bg-[#FFF6EC] p-3 rounded-2xl w-[200px]'>
          <p className='text-[#615F5F]'>{title}</p>
          <h1 className='font-semibold text-2xl'>{schools?.paging.totalItems ?? 0}</h1>
        </div>
      </div>

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
            <div className='col-span-3'>Name</div>
            <div className='hidden lg:block col-span-1'>Type</div>
            <div className='hidden lg:block col-span-1'>No. of Students</div>
            <div className='hidden lg:block col-span-1'>No. of Staff</div>
            <div className='col-span-4'>Location</div>
          </div>
          {isLoading ? (
            <div className='text-center'>Loading...</div>
          ) : (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (schools?.data ?? []).map((item: Institution, idx: number) => (
              <div className='grid grid-cols-12 p-4 border-b' key={item.id}>
                <div className='col-span-1'>
                  {idx + 1}
                  {/* {(pagingData.page - 1) * 10 + (schools?.paging?.totalPage ?? idx + 1)} */}
                </div>

                <div className='col-span-5 lg:col-span-3'>
                  <Link href={`/super-admin/school?id=${item.id}`}>
                    <h2 className='text-sm font-medium'>{item?.instituteName}</h2>
                  </Link>
                </div>

                <div className='hidden lg:block col-span-1'>
                  {item?.instituteType ?? "-"}
                </div>

                <div className='hidden lg:block col-span-1'> {item?.studentCount ?? item?.students?.length ?? 0}</div>

                <div className='hidden lg:block col-span-1'>
                  {' '}
                  {item?.staffCount ?? item?.staff?.length ?? 0}{' '}
                </div>

                <div className='col-span-5 lg:col-span-4'>
                  {' '}
                  {item?.instituteAddress ?? "-"}{' '}
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
          {!isLoading && schools?.data?.length === 0 && (
            <div className='text-red-500 py-4 text-center'>No record found</div>
          )}

          {schools && schools?.data?.length > 0 && (
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

              {Array(schools.paging.totalPage)
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

              {schools.paging.totalPage > 3 &&
                <div
                  key={Math.random() * 100}
                  className={clsxm(
                    pagingData.page === 3 ||
                      (pagingData.page > 3 && pagingData.page < schools.paging.totalPage)
                      ? 'bg-[#008146] text-white'
                      : 'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2'
                  )}
                >
                  {pagingData.page > 3 && pagingData.page < schools.paging.totalPage
                    ? pagingData.page
                    : 3}
                </div>
              }

              {schools.paging.totalPage > 4 && (
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

              {schools.paging.totalPage > 1 &&
                <div
                  className={clsxm(
                    pagingData.page === schools.paging.totalPage
                      ? 'bg-[#008146] text-white'
                      : 'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2'
                  )}
                >
                  {schools.paging.totalPage}
                </div>
              }

              <button
                onClick={handleNextPage}
                disabled={schools && schools?.data?.length < 10}
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
                disabled={schools && schools?.data?.length < 10}
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

export default SchoolByType;