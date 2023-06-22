'use client';

import Table from '@/components/tables/TableComponent';
import { flattenObject } from '@/misc/functions/calculateEarthDistance';
import { getErrMsg } from '@/server';
import { useGetTeachersList } from '@/server/institution';
import { FlattenedStaff } from '@/types/institute';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { TableColumn } from 'react-data-table-component';
import { toast } from 'react-toastify';
import AvrilImage from '~/svg/avril.svg';

const staffColumn: TableColumn<FlattenedStaff & { idx: number }>[] = [
  {
    name: 'No',
    selector: (row) => row.idx,
    cell: (row) => <div>#{row.idx}</div>,
  },
  {
    name: 'Name',
    grow: 2,
    cell: (row) => (
      <div className='col-span-3 w-max text-center text-[#525F7F] flex space-x-2 items-center'>
        <AvrilImage alt='avril' className='h-8 w-8 rounded-full' />
        <Link href={`/super-admin/teacher?id=${row.id}`}>
          <h2 className='text-sm font-medium capitalize'>
            {row['user.0.firstName']} {row['user.0.lastName']}
          </h2>
        </Link>
      </div>
    ),
  },
  {
    name: 'Staff ID',
    selector: (row) => row.id ?? '',
    cell: (row) => <div>{row.id}</div>,
  },
  {
    name: 'Type',
    selector: (row) => row.staffType ?? '',
    cell: (row) => <div>{row.staffType}</div>,
  },
  {
    name: 'Schools',
    selector: (row) => row['institution.instituteName'] ?? '',
    cell: (row) => <div>{row['institution.instituteName']}</div>,
  },
];

const AllStaff = () => {
  const { data: staff, error, isLoading } = useGetTeachersList();

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
          <h1 className='font-semibold text-2xl'>{staff?.data.length ?? 0}</h1>
        </div>
        <Link
          href='/admin/add-staff'
          className='w-max rounded border border-[#007AFF] px-6 py-3 text-center text-xs text-[#007AFF] '
        >
          Add Staff
        </Link>
      </div>

      <div className='table-add-student mt-5 pb-4 pt-1 overflow-x-auto w-full'>
        {isLoading ? (
          <div className='text-center'>Loading...</div>
        ) : (
          <Table
            data={
              staff?.data.map((v, i) => ({
                idx: i + 1,
                ...flattenObject(v),
              })) ?? []
            }
            columns={staffColumn}
          />
        )}
        {!isLoading && staff?.data.length === 0 && (
          <div className='text-red-500 py-4 text-center'>No record found</div>
        )}

      </div>
    </section>
  );
};

export default AllStaff;
