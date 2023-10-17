/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { BasicSearch } from '@/components/search';
import clsxm from '@/lib/clsxm';
import { PaginatedData } from '@/types/pagination';
import { useState } from 'react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface EMSTableProps {
  title: string;
  isLoading?: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
  data: PaginatedData<any[]>;
  handleSearchParam?: (value: string) => void;
}

//! THIS COMPONENT IS NOT TO BE USED AS A TABLE COMPONENT, 
//! IT IS A TEMPLATE FOR TABLE COMPONENTS, COPY AND USE IT AS A TEMPLATE FOR OTHER TABLE COMPONENTS

const EMSTable = (props: EMSTableProps) => {
  const [action, setAction] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const handleJumpToStart = () => {
    setCurrentPage(1);
  };

  const handleJumpToEnd = () => {
    if (props.data) setCurrentPage(props.data.paging.totalPage);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-end'>
        <div className='flex w-[300px] space-x-2'>
          {props.showFilter && (
            <select
              name=''
              className='border-none bg-transparent outline-none'
            >
              <option value=''>Filter</option>
            </select>
          )}
          {props.showSearch ||
            (props.showSearch === undefined && (
              <BasicSearch
                placeholder='Search...'
                handleSearch={props.handleSearchParam}
              />
            ))}
        </div>
      </div>
      <div className='table-add-student mt-3 py-4 pb-4 bg-white'>
        <div className='text-[#6B7A99] text-base font-semibold border-b p-3'>
          {props.title}
        </div>

        <div className='grid grid-cols-12 p-4 border-b text-[#55597D] font-medium'>
          <div className='col-span-4'>Name</div>
          <div className='col-span-5 lg:col-span-4'>Username/Email</div>
          <div className='col-span-2'>Role</div>
          <div className='hidden lg:block col-span-1'>Status</div>
        </div>
        {props.isLoading ? (
          <div className='text-center'>Loading...</div>
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (props.data?.data ?? []).map((item: any, idx: number) => (
            <div className='grid grid-cols-12 p-4 border-b' key={idx}>
              <div className='col-span-4'>
                {item?.user?.firstName || 'N/A'} {item?.user?.lastName || 'N/A'}
              </div>
              <div className='col-span-5 lg:col-span-4'>
                {item?.user?.email || 'N/A'}
              </div>
              <div className='col-span-2'> {item?.type || 'N/A'} ADMIN </div>
              <div className='hidden lg:block col-span-1'>
                {' '}
                {item?.status || 'N/A'}{' '}
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
                        Delete Account
                      </button>
                      <button className='p-4 hover:bg-gray-200 w-full'>
                        Edit Permission
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
        {!props.isLoading && props.data?.data?.length === 0 && (
          <div className='text-red-500 py-4 text-center'>No record found</div>
        )}

        {props.data && props.data.data.length > 0 && (
          <div className=' min-w-[800px] my-4 flex items-center justify-end space-x-3 pr-10'>
            <button
              onClick={handleJumpToStart}
              disabled={currentPage === 1}
              className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
            >
              <BiChevronsLeft />
            </button>

            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
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

            {Array(props.data.paging.totalPage)
              .fill(0)
              .slice(0, 2)
              .map((item, idx: number) => (
                <div
                  key={Math.random() * 100}
                  className={clsxm(
                    currentPage === idx + 1
                      ? 'bg-[#008146] text-white'
                      : 'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2'
                  )}
                >
                  {idx + 1}
                </div>
              ))}

            <div
              key={Math.random() * 100}
              className={clsxm(
                currentPage === 3 ||
                  (currentPage > 3 && currentPage < props.data.paging.totalPage)
                  ? 'bg-[#008146] text-white'
                  : 'bg-white text-gray-500',
                'grid h-7 w-7 place-content-center rounded-full border p-2'
              )}
            >
              {currentPage > 3 && currentPage < props.data.paging.totalPage
                ? currentPage
                : 3}
            </div>

            {props.data.paging.totalPage > 4 && (
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

            <div
              className={clsxm(
                currentPage === props.data.paging.totalPage
                  ? 'bg-[#008146] text-white'
                  : 'bg-white text-gray-500',
                'grid h-7 w-7 place-content-center rounded-full border p-2'
              )}
            >
              {props.data.paging.totalPage}
            </div>

            <button
              onClick={handleNextPage}
              disabled={props.data && props.data?.data?.length < 10}
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
              disabled={props.data && props.data?.data?.length < 10}
              className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
            >
              <BiChevronsRight />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default EMSTable