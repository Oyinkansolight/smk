/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Table from '@/components/tables/TableComponent';
import { flattenObject } from '@/misc/functions/calculateEarthDistance';
import { getErrMsg } from '@/server';
import { useGetStudentsList } from '@/server/institution';
import { FlattenedStudent } from '@/types/institute';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { toast } from 'react-toastify';
// import Back from '@/'
// import clsxm from '@/lib/clsxm';
import AvrilImage from '~/svg/avril.svg';

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
      <div className='col-span-3 w-max text-center text-[#525F7F] flex space-x-2 items-center'>
        <AvrilImage alt='avril' className='h-8 w-8 rounded-full' />
        <Link href={`/super-admin/student?id=${row.id}`}>
          <h2 className='text-sm font-medium capitalize'>
            {row['user.0.lastName'] ?? row['user.lastName']} {row['user.0.firstName'] ?? row['user.firstName']}
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
  const [pagingData, setPagingData] = useState<any>({ page: 1, limit: 10, lastName });
  const { data: students, error, isLoading, refetch } = useGetStudentsList({ ...pagingData });

  const handleSearch = (value: string) => {
    setLastName(value);
    setPagingData({ ...pagingData, lastName: value });
  }

  useEffect(() => {
    refetch();
  }
    , [pagingData, refetch]);

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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>All Students</h1>

      <div className='mb-6 flex justify-between items-end'>
        <div className='bg-[#FFF6EC] p-3 rounded-2xl w-[200px]'>
          <p className='text-[#615F5F]'>Total Students</p>
          <h1 className='font-semibold text-2xl'>
            {pagingData.limit * (students?.paging.totalPage ?? 0)}
          </h1>
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
      </div>
    </section>
  );
};

export default AllStudent;
