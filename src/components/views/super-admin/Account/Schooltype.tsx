/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import GenericLoader from '@/components/layout/Loader';
import AddSchoolType from '@/components/modal/addSchoolType';
import clsxm from '@/lib/clsxm';
import { useGetInstituteTypes } from '@/server/institution';
import { useState } from 'react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';

/* eslint-disable @typescript-eslint/no-explicit-any */

const Schooltype = () => {
  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
  });

  const { data: allInstitutes, isLoading } = useGetInstituteTypes({
    ...pagingData,
  });

  const [isOpen, setIsOpen] = useState(false);

  function handleModal() {
    setIsOpen(!isOpen);
  }

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
    if (allInstitutes?.instituteTypes)
      setPagingData({ ...pagingData, page: allInstitutes?.paging?.totalPage });
  };

  const handleCurrentPage = (page: number) => {
    setPagingData({ ...pagingData, page });
  };

  if (isLoading) {
    return <GenericLoader />;
  }

  return (
    <div>
      <div className='flex justify-end items-center space-x-4 my-5'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='w-max  rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
        >
          Add New School Type
        </button>
      </div>
      {isOpen && <AddSchoolType onClickHandler={handleModal} />}

      <div className='table-add-student mt-3 py-4 pb-4 bg-white'>
        <div className='text-[#6B7A99] text-base font-semibold border-b p-3'>
          School Types
        </div>

        <div className='grid grid-cols-12 p-4 border-b text-[#55597D] font-medium'>
          <div className='col-span-6'>Name</div>
          <div className='col-span-6'>Term(s)/Semester(s)</div>
        </div>
        {allInstitutes?.instituteTypes &&
          allInstitutes?.instituteTypes?.length > 0 &&
          allInstitutes?.instituteTypes.map((item) => (
            <div className='grid grid-cols-12 p-4 border-b' key={item?.id}>
              <div className='col-span-6'>{item?.name ?? 'N/A'} </div>
              <div className='col-span-6'>{item?.semester ?? 'N/A'}</div>
            </div>
          ))}

        {!allInstitutes?.instituteTypes ||
          (allInstitutes?.instituteTypes?.length === 0 && (
            <div className='text-red-500 py-4 text-center'>No record found</div>
          ))}

        {allInstitutes?.instituteTypes && allInstitutes?.instituteTypes?.length > 0 && (
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

            {Array(allInstitutes?.paging?.totalPage)
              .fill(0)
              .slice(0, 1)
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

            {allInstitutes?.paging?.totalPage > 3 && (
              <div
                key={Math.random() * 100}
                className={clsxm(
                  pagingData.page === 3 ||
                    (pagingData.page > 3 &&
                      pagingData.page < allInstitutes?.paging?.totalPage)
                    ? 'bg-[#008146] text-white'
                    : 'bg-white text-gray-500',
                  'grid h-7 w-7 place-content-center rounded-full border p-2'
                )}
              >
                {pagingData.page > 3 &&
                  pagingData.page < allInstitutes?.paging?.totalPage
                  ? pagingData.page
                  : 3}
              </div>
            )}

            {allInstitutes?.paging?.totalPage > 4 && (
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

            {allInstitutes?.paging?.totalPage > 1 && (
              <div
                onClick={() => handleCurrentPage(allInstitutes?.paging?.totalPage)}
                className={clsxm(
                  pagingData.page === allInstitutes?.paging?.totalPage
                    ? 'bg-[#008146] text-white'
                    : 'bg-white text-gray-500',
                  'grid h-7 w-7 place-content-center rounded-full border p-2 cursor-pointer'
                )}
              >
                {allInstitutes?.paging?.totalPage}
              </div>
            )}

            <button
              onClick={handleNextPage}
              disabled={
                (allInstitutes?.instituteTypes && allInstitutes?.instituteTypes?.length < 10) ||
                pagingData.page === allInstitutes?.paging?.totalPage
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
                (allInstitutes?.instituteTypes && allInstitutes?.instituteTypes?.length < 10) ||
                pagingData.page === allInstitutes?.paging?.totalPage
              }
              className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
            >
              <BiChevronsRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schooltype;
