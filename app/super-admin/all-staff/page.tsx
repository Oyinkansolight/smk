'use client';

import Table from '@/components/tables/TableComponent';
import { flattenObject } from '@/misc/functions/calculateEarthDistance';
import { getErrMsg } from '@/server';
import { useGetTeachersList } from '@/server/institution';
import { FlattenedStaff } from '@/types/institute';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { toast } from 'react-toastify';
import AvrilImage from '~/svg/avril.svg';

const staffColumn: TableColumn<FlattenedStaff & { idx: number }>[] = [
  {
    name: 'No',
    selector: (row) => row.idx,
    cell: (row) => <div>#{row.idx + 1}</div>,
  },
  {
    name: 'Staff ID',
    selector: (row) => row.staffId ?? '',
    cell: (row) => <div>{row.staffId}</div>,
  },
  {
    name: 'Name',
    grow: 2,
    cell: (row) => (
      <div className='col-span-3 w-max text-center text-[#525F7F] flex space-x-2 items-center'>
        <AvrilImage alt='avril' className='h-8 w-8 rounded-full' />
        <Link href={`/super-admin/teacher?id=${row.id}`}>
          <h2 className='text-sm font-medium capitalize'>
            {row['user.firstName']} {row['user.lastName']}
          </h2>
        </Link>
      </div>
    ),
  },
  {
    name: 'Type',
    selector: (row) => row.staffType ?? '',
    cell: (row) => <div>{row.staffType}</div>,
  },
  {
    name: 'Institution',
    selector: (row) => row['institution.instituteName'] ?? '',
    cell: (row) => <div>{row['institution.instituteName']}</div>,
  },
  {
    name: 'Institution Type',
    selector: (row) => row['institution.instituteType'] ?? '',
    cell: (row) => <div>{row['institution.instituteType']}</div>,
  },
];

const AllStaff = () => {
  const [pagingData, setPagingData] = useState({ page: 1, limit: 10 });
  const {
    data: staff,
    error,
    isLoading,
  } = useGetTeachersList({ ...pagingData });

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
          <h1 className='font-semibold text-2xl'>
            {staff?.data?.count ?? 0}
          </h1>
        </div>
      </div>

      <div className='table-add-student mt-5 pb-4 pt-1 overflow-x-auto w-full'>
        {isLoading ? (
          <div className='text-center'>Loading...</div>
        ) : (
          <Table
            data={
              staff?.data?.staffs?.map((v, i) => ({
                idx: pagingData.page * pagingData.limit - pagingData.limit + i,
                ...flattenObject(v),
              })) ?? []
            }
            columns={staffColumn}
            paginationServer
            paginationTotalRows={
              pagingData.limit * (staff?.paging.totalPage ?? 0)
            }
            onChangePage={(page) => {
              setPagingData({ page, limit: pagingData.limit });
            }}
            onChangeRowsPerPage={(limit, page) => {
              setPagingData({ page, limit });
            }}
          />
        )}
        {!isLoading && staff?.data?.staffs && staff?.data?.staffs?.length === 0 && (
          <div className='text-red-500 py-4 text-center'>No record found</div>
        )}
      </div>
    </section>
  );
};

export default AllStaff;
