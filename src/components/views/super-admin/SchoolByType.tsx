'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import FirebaseLogo from '@/components/avatars/FirebaseLogo';
import Table from '@/components/tables/TableComponent';
import { useGetSchools } from '@/server/institution';
import { Institution } from '@/types/institute';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import AvrilImage from '~/svg/avril.svg';

const columns: TableColumn<Institution & { idx: string }>[] = [
  {
    name: 'No',
    selector: (item) => item.idx,
    cell: (item) => <div>#{item.idx + 1}</div>,
    width: '90px',
    sortable: true,
  },
  {
    name: 'Name',
    grow: 2,
    selector: (item) => item.instituteName ?? '',
    sortable: true,
    cell: (item) => {
      return (
        <div className='flex items-center gap-4 text-[#525F7F]'>
          {!item.instituteLogo ? (
            <AvrilImage
              alt='avril'
              className='h-8 w-8 min-w-[32px] min-h-[32px] rounded-full'
            />
          ) : !item.instituteLogo?.includes('profile_picture') ? (
            <Image
              src={
                item.instituteLogo.includes('placeimg') ||
                item.instituteLogo.includes('picsum')
                  ? item.instituteLogo
                  : `/${item.instituteLogo}`
              }
              className='h-8 w-8 rounded-full'
              alt=''
              width={20}
              height={10}
            />
          ) : (
            <FirebaseLogo path={item.instituteLogo} sizePixels={32} />
          )}
          <Link href={`/super-admin/school?id=${item.id}`}>
            <h2 className='text-sm font-medium'>{item.instituteName}</h2>
          </Link>
        </div>
      );
    },
  },
  {
    name: 'Type',
    selector: (item) => item.instituteType ?? '',
    sortable: true,
    cell: (item) => <div className='col-span-2'>{item.instituteType} </div>,
  },
  {
    name: 'Number of Students',
    selector: (item) => item.studentCount ?? '',
    sortable: true,
    cell: (item) => <div className='col-span-2'>{item.studentCount}</div>,
  },
  {
    name: 'Number of Staff',
    selector: (item) => item.studentCount ?? '',
    sortable: true,
    cell: (item) => <div className='col-span-2'>{item.studentCount}</div>,
  },
  {
    name: 'Location',
    selector: (item) => item.instituteAddress ?? '',
    sortable: true,
    cell: (item) => <div className='col-span-2'> {item.instituteAddress} </div>,
  },
];

const SchoolList = ({ name, title }: { name: string; title: string }) => {
  const [pagingData, setPagingData] = useState({ page: 1, limit: 10 });
  const { data, isLoading } = useGetSchools({ ...pagingData });

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

      <div className='mb-6 flex justify-between items-end'>
        <div className='bg-[#FFF6EC] p-3 rounded-2xl w-[200px]'>
          <p className='text-[#615F5F]'> {title} </p>
          <h1 className='font-semibold text-2xl'>
            {pagingData.limit * (data?.paging.totalPage ?? 0)}
          </h1>
        </div>

        <Link
          href='/super-admin/add-school'
          className='w-max rounded border border-[#007AFF] px-6 py-3 text-center text-xs text-[#007AFF] '
        >
          Add Institution
        </Link>
      </div>
      <Table
        data={((data?.data ?? []) as any[]).map((item, i) => ({
          idx: (pagingData.page * pagingData.limit - pagingData.limit) + i,
          ...item,
        }))}
        columns={columns}
        progressPending={isLoading || !data}
        progressComponent={<div className='font-bold'>Loading...</div>}
        paginationServer
        paginationTotalRows={pagingData.limit * (data?.paging.totalPage ?? 0)}
        onChangePage={(page) => {
          setPagingData({ page, limit: pagingData.limit });
        }}
        onChangeRowsPerPage={(limit, page) => {
          setPagingData({ page, limit });
        }}
      />
    </section>
  );
};

export default SchoolList;
