/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import OnlineStatus from '@/components/profile/OnlineStatus';
import { BasicSearch } from '@/components/search';
import ROUTES from '@/constant/routes';
import { getErrMsg } from '@/server';
import { useGetTeachersList } from '@/server/institution';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';


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

// import Back from '@/'
// import clsxm from '@/lib/clsxm';

const AllStudent = () => {
  const staff = [
    {
      n: 2343,
      name: 'Akani',
      type: 'Teaching',
      date: '03/03/12',
      status: 'online',
    },
    {
      n: 2343,
      name: 'Akani',
      type: 'Teaching',
      date: '03/03/12',
      status: 'online',
    },
    {
      n: 2343,
      name: 'Akani',
      type: 'Teaching',
      date: '03/03/12',
      status: 'online',
    },
    {
      n: 2343,
      name: 'Akani',
      type: 'Teaching',
      date: '03/03/12',
      status: 'online',
    },
  ];
  // const handleSearch = (value: string) => {
  //   const result = students.filter(
  //     (data) =>
  //       data.user[0].firstName.toLowerCase().includes(value.toLowerCase()) ||
  //       data.user[0].lastName.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setstudents(result);
  // };
  const router = useRouter();
  const { data, error, isLoading } = useGetTeachersList();
  useEffect(() => {
    if (error) {
      toast.error(getErrMsg(error));
    }
  }, [error]);
  return (
    <section className='md:px-[60px] px-5 py-6'>
      <Link href={ROUTES.ADMIN}>
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

      <div className='mb-6 gap-8 flex justify-end items-end'>
        <Link
          href='#'
          className='w-max rounded border border-[#007AFF] bg-white px-8 py-2 text-center text-xs text-[#007AFF] '
        >
          Download Report
        </Link>
        <Link
          href='/admin/add-staff'
          className='w-max rounded border border-[#007AFF] bg-white px-8 py-2 text-center text-xs text-[#007AFF] '
        >
          Add Staff
        </Link>
      </div>
      <div className='flex justify-end'>
        <div className='flex w-[200px] space-x-2'>
          <BasicSearch />
        </div>
      </div>
      <div className='bg-white'>
        {isLoading ? <div>Loading...</div> : <table className='w-full'>
          <tr className='bg-[#F6F9FC] border-b-2 h-14'>
            <th className='text-start'>Number</th>
            <th className='text-start'>Name</th>
            <th className='text-start'>Staff Type</th>
            <th className='text-start'>Date of Posted to Current School</th>
            <th className='text-start'>Status</th>
          </tr>
          {data?.data.map((v, i) => (
            <tr
              onClick={() => router.push('/admin/staff')}
              className='h-14 border-y cursor-pointer'
              key={i}
            >
              <td>#{v.id}</td>
              <td>{(v?.user ?? [])[0].firstName}</td>
              <td>{v.staffType}</td>
              <td>{(v?.employmentHistory ?? [])[0].employmentYear}</td>
              <td>
                <div className='flex justify-start'>
                  <OnlineStatus status="online" />
                </div>
              </td>
            </tr>
          ))}
        </table>}
        <div className=' min-w-[800px] my-4 flex items-center justify-end space-x-3 pr-10'>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            {' '}
            <svg
              width='6'
              height='8'
              viewBox='0 0 6 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M4.43018 0.169922L5.83643 1.5764L3.72705 3.68612L5.83643 5.79583L4.43018 7.20231L0.914551 3.68612L4.43018 0.169922Z'
                fill='#8898AA'
              />
            </svg>
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border bg-[#008146] p-2 text-white'>
            1
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            2
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            3
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            <svg
              width='6'
              height='8'
              viewBox='0 0 6 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M2.32031 0.169922L0.914062 1.5764L3.02344 3.68612L0.914062 5.79583L2.32031 7.20231L5.83594 3.68612L2.32031 0.169922Z'
                fill='#8898AA'
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllStudent;