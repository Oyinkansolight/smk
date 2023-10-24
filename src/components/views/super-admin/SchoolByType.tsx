/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';


/* eslint-disable @typescript-eslint/no-explicit-any */
import FirebaseLogo from '@/components/avatars/FirebaseLogo';
import { BasicSearch } from '@/components/search';
import { INSTITUTION_TYPES } from '@/constant/institution';
import clsxm from '@/lib/clsxm';
import { useGetDashboardOverview } from '@/server/dashboard';

import { BasicSearch } from '@/components/search';
import clsxm from '@/lib/clsxm';
import { getErrMsg } from '@/server';

import { useGetSchools } from '@/server/institution';
import { Institution } from '@/types/institute';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import AvrilImage from '~/svg/avril.svg';
import Castle from '~/svg/castle.svg';
import NextArrow from '~/svg/nextarrow.svg';
import PrevArrow from '~/svg/prevarrow.svg';


import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';

const SchoolByType = ({ name, title }: { name: string; title: string }) => {
  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1500);
  const { data: dashboardInfo } = useGetDashboardOverview();
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
      {/* <Link href='/super-admin'>
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

      <div className='mb-6 flex justify-between items-end'>
        <div className='bg-[#FFF6EC] p-3 rounded-2xl w-[200px]'>
          <p className='text-[#615F5F]'>{title}</p>
          <h1 className='font-semibold text-2xl'>{pagingData.limit * (schools?.paging.totalPage ?? 0)}</h1>
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

        <Link
          href='/super-admin/add-school'
          className='w-max rounded border bg-[#5754F7] px-6 py-3 text-center text-xs text-[#007AFF] '
        >
          Add Institution
        </Link>
      </div>
      <Table
        handleSearchParam={handleSetInstitutionName}
        data={((data?.data ?? []) as any[]).map((item, i) => ({
          idx: pagingData.page * pagingData.limit - pagingData.limit + i,
          ...item,
        }))}
        columns={columns}
        progressPending={isLoading || !data}
        progressComponent={<div className='font-bold'>Loading...</div>}
        paginationServer
        paginationTotalRows={pagingData.limit * (data?.paging.totalPage ?? 0)}
        onChangePage={(page) => {
          setPagingData({ page, limit: pagingData.limit, instituteName });
        }}
        onChangeRowsPerPage={(limit, page) => {
          setPagingData({ page, limit, instituteName });
        }}
      /> */}

      <div className='rounded-2xl p-4 bg-[#F0FFFF]'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-4xl'>Institutions</h1>
            <h2 className='text-[#8C8C8C] text-base font-normal'>
              An overview of all institution
            </h2>
          </div>
          <Link
            href='/super-admin/add-school'
            className='w-max h-fit py-3 rounded-3xl border bg-[#5754F7] px-3  text-center text-xs text-white '
          >
            Add Institution
          </Link>
        </div>

        <div className='space-y-4 my-4 pt-4'>
          <InstituteTypeCard
            type='ECCDE'
            title='Total ECCDE Institution'
            count={dashboardInfo?.Total_ECCDE ?? 0}
          />
          <InstituteTypeCard
            type='Primary'
            title='Total Primary Institution'
            count={dashboardInfo?.Total_Primary ?? 0}
          />
          <InstituteTypeCard
            type='Secondary'
            title='Total Secondary Institution'
            count={dashboardInfo?.Total_Secondary ?? 0}
          />
          <InstituteTypeCard
            type='Tertiary'
            title='Total Tertiary Institution'
            count={dashboardInfo?.Total_Tertiary ?? 0}
          />
        </div>
      </div>
      <div className='rounded-2xl p-4 mt-8 bg-[#FFF]'>
        <div className='flex sm:flex-row flex-col sm:justify-between justify-start items-end'>
          <div className='space-y-3'>
            <h2 className='text-[#8C8C8C] text-base font-normal'>
              List of all the Institutions in the state
            </h2>
            <BasicSearch />
          </div>
          <div className='flex space-x-2 pb-4'>
            <button className='bg-black  rounded-lg flex space-x-2 p-2 text-white'>
              <span>Filter by institution</span>
              <span>
                <svg
                  width='17'
                  height='16'
                  viewBox='0 0 17 16'
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
        {data?.data && (
          <div className='space-y-2 mt-4'>
            {data?.data.map((item, idx) => (
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
        </div>
      </div>

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

const InstitutionCard = ({ data }) => {
  const isECCDE =
    data.instituteType.toLowerCase() === INSTITUTION_TYPES.ECCDE.toLowerCase();
  const isTertiary =
    data.instituteType.toLowerCase() ===
    INSTITUTION_TYPES.TERTIARY.toLowerCase();
  const isSecondary =
    data.instituteType.toLowerCase() ===
    INSTITUTION_TYPES.SECONDARY.toLowerCase();
  const isPrimary =
    data.instituteType.toLowerCase() ===
      INSTITUTION_TYPES.PRIMARY.toLowerCase() ||
    data.instituteType.toLowerCase() === 'basic';

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
        <div className='text-[#525F7F] max-w-[150px] 2xl:max-w-[200px] text-ellipsis overflow-hidden'>
          {data.instituteName}
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
          {data?.instituteType ?? ''}
        </div>

        <div className='text-xs font-light text-[#855201]'>
          {data?.instituteAddress ?? ''}
        </div>
        <div className='text-xs font-light text-[#98988E]'>
          Students:{' '}
          <span className='font-medium'>{data?.students.length ?? '0'}</span>
        </div>
        <div className='text-xs font-light text-[#98988E]'>
          Staffs:{' '}
          <span className='font-medium'>{data?.staff.length ?? '0'}</span>
        </div>
      </div>

      <div className='flex  flex-col-reverse gap-3'>
        <Castle className='h-8 w-8 self-end opacity-50' />
      </div>
    </div>
  );
};

export default SchoolByType;
