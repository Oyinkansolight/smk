/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Table from '@/components/tables/TableComponent';
import BulkUser from '@/components/views/admin/AddStudent/bulkusers';
import { getFromLocalStorage } from '@/lib/helper';
import { flattenObject } from '@/misc/functions/calculateEarthDistance';
import { getErrMsg } from '@/server';
import {
  useCreateBulkStudent,
  useGetStudentsListByInstitution,
} from '@/server/institution';
import { FlattenedStudent } from '@/types/institute';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { toast } from 'react-toastify';
import AvrilImage from '~/svg/avril.svg';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const studentListColumns: TableColumn<FlattenedStudent & { idx: number }>[] = [
  { name: 'Student ID', selector: (row) => row.id ?? '' },
  {
    name: 'Name',
    selector: (row) => row['user.0.firstName'] ?? '',
    cell: (row) => (
      <div className='col-span-3 w-max text-center text-[#525F7F] flex space-x-2 items-center'>
        <AvrilImage alt='avril' className='h-8 w-8 rounded-full' />
        <Link href={`/admin/student?id=${row.id}`}>
          <h2 className='text-sm font-medium capitalize'>
            {row['user.0.firstName']} {row['user.0.lastName']}
          </h2>
        </Link>
      </div>
    ),
  },
  { name: 'Type', selector: (row) => row['user.0.type'] ?? '' },
  {
    name: 'Institution',
    selector: (row) => row['institution.instituteName'] ?? '',
  },
  {
    name: 'Institution Type',
    selector: (row) => row['institution.instituteType'] ?? '',
  },
];

const AllStudent = () => {
  const institutionId = getFromLocalStorage('institutionId');

  // const fetchStudent = ()=>{
  //   if (typeof window !== 'undefined') {
  //     const institutionId = localStorage.getItem("institutionId")
  //   }
  // }

  const {
    data: students,
    error,
    isLoading,
  } = useGetStudentsListByInstitution(institutionId);
  const [isOpen, setIsOpen] = useState(false);
  const [isBulk, setisBulk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setfile] = useState<any>(null);

  const handleCreateBulkStudent = useCreateBulkStudent();
  const bulkStudentUpload = async () => {
    const formData = new FormData();
    formData.append('file', files);

    try {
      setLoading(true);
      const response = await handleCreateBulkStudent.mutateAsync(formData);

      if (response) {
        toast.success('Student(s) Added successfully');
        setLoading(false);
        setisBulk(!isBulk);

        //2 Second - Open Success Modal
        // setisOpen(true);
      }
    } catch (error) {
      setLoading(false);
      toast.error(getErrMsg(error));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(getErrMsg(error));
    }
  }, [error]);

  return (
    <section className='md:px-[60px] px-5 py-6'>
      <Link href='/admin'>
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
          <h1 className='font-semibold text-2xl'>{students?.length ?? 0}</h1>
        </div>

        {isBulk && (
          <BulkUser
            loading={loading}
            onClickHandler={() => {
              setisBulk(!isBulk);
            }}
            setfile={setfile}
            file={files}
            link='/pdfs/StudentOnboarding.xlsx'
            bulkStudentUpload={bulkStudentUpload}
          />
        )}
        <div className='mb-6 flex justify-end items-end relative'>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className='w-max flex items-center rounded border border-secondary px-6 py-3 text-center text-xs font-medium text-secondary '
          >
            Add Student
            <span className='ml-4'>
              <svg
                width='9'
                height='6'
                viewBox='0 0 9 6'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M0.136086 0.607068C0.300449 0.43941 0.557649 0.424168 0.738891 0.561343L0.790815 0.607068L4.50049 4.3913L8.21016 0.607068C8.37452 0.43941 8.63172 0.424168 8.81296 0.561343L8.86489 0.607068C9.02925 0.774727 9.04419 1.03708 8.90972 1.22196L8.86489 1.27493L4.82785 5.39293C4.66349 5.56059 4.40629 5.57583 4.22505 5.43866L4.17312 5.39293L0.136086 1.27493C-0.0447111 1.0905 -0.0447111 0.791493 0.136086 0.607068Z'
                  fill='#3361FF'
                />
              </svg>
            </span>
          </button>
          {isOpen && (
            <div
              className='fixed inset-0 z-[9]'
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          )}
          {isOpen && (
            <div className='shadow-lg rounded-xl flex  flex-col  text-left bg-white w-[200px] h-max absolute top-12 right-0 z-10'>
              <Link
                href='/admin/add-student'
                className='p-3 cursor-pointer hover:bg-slate-100  block text-left font-medium max-w-full'
              >
                Add Single Student
              </Link>

              <input type='file' name='upload_file' id='upload_file' hidden />
              <button
                onClick={() => {
                  setIsOpen(!isOpen);

                  setisBulk(!isBulk);
                }}
                className='w-full p-3 cursor-pointer hover:bg-slate-100  block text-left font-medium max-w-full'
              >
                Upload Bulk Student
              </button>
              <input
                type='file'
                name='upload_folder'
                id='upload_folder'
                hidden
              />
            </div>
          )}
        </div>
      </div>

      <div className='table-add-student mt-5 pb-4 pt-1 overflow-x-auto w-full'>
        {isLoading ? (
          <div className='text-center'>Loading...</div>
        ) : (
          <Table
            data={
              students?.map(
                (v, i) =>
                  ({ idx: i, ...flattenObject(v) } as FlattenedStudent & {
                    idx: number;
                  })
              ) ?? []
            }
            columns={studentListColumns}
          />
        )}
        {!isLoading && students?.length === 0 && (
          <div className='text-red-500 py-4 text-center'>No record found</div>
        )}
      </div>
    </section>
  );
};

export default AllStudent;
