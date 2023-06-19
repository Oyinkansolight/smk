/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */
'use client';

import { BasicSearch } from '@/components/search';
import logger from '@/lib/logger';
import { useGetSchools } from '@/server/institution';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
// import Back from '@/'
// import clsxm from '@/lib/clsxm';
import AvrilImage from '~/svg/avril.svg';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

const SchoolList = ({
  name,
  title,
  type,
}: {
  name: string;
  title: string;
  type?: string;
}) => {
  const mockData = [
    {
      logo: 1,
      name: 'Avril Price School',
      numberOfStudent: '12,500',
      type: 'Primary',
      staff: '',
      location: 'Benin',
    },
    {
      logo: 2,
      name: 'Scaling Heights School',
      numberOfStudent: '12,500',
      type: 'Primary',
      staff: '',
      location: 'Benin',
    },
    {
      logo: 3,
      name: 'Black Dash School',
      numberOfStudent: '12,500',
      type: 'Primary',
      staff: '',
      location: 'Benin',
    },
    {
      logo: 4,
      name: 'Reaction Primary ',
      numberOfStudent: '12,500',
      type: 'Primary',
      staff: '',
      location: 'Benin',
    },
    {
      logo: 5,
      name: 'Victory International  School',
      numberOfStudent: '12,500',
      type: 'Primary',
      staff: '',
      location: 'Benin',
    },
  ];
  const { data, error, isLoading } = useGetSchools(type ? type : '');

  const [allSchool, setallSchool] = useState(mockData);

  const handleSearch = (value: string) => {
    const result = mockData.filter((data) =>
      data.name.toLowerCase().includes(value.toLowerCase())
    );
    setallSchool(result);
  };

  logger(data);

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
          <h1 className='font-semibold text-2xl'>{(data || []).length ?? 0}</h1>
        </div>
      </div>
      <div className='flex justify-end'>
        <div className='flex w-[300px] space-x-2'>
          <select name='' className='border-none bg-transparent outline-none'>
            <option value=''>Filter</option>
          </select>
          <BasicSearch handleSearch={handleSearch} />
        </div>
      </div>

      <div className='table-add-student mt-5 pb-4 pt-1 overflow-x-auto w-full'>
        <div className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400 bg-gray-100 py-4 px-1 text-[#8898AA] font-semibold'>
          <div className='col-span-1'>No</div>
          <div className='col-span-3'>Name</div>
          <div className='col-span-2'>Type</div>
          <div className='col-span-2'>Number of Students</div>
          <div className='col-span-2'>Number of Staffs</div>
          <div className='col-span-2'>Location</div>
        </div>
        {isLoading ? (
          <div className='text-center'>Loading...</div>
        ) : (
          (data ?? []).map((item: any, idx: number) => (
            <div
              className=' min-w-[800px] table-header grid grid-cols-12 gap-4  border-b  py-4 px-1 text-[#8898AA]'
              key={idx}
            >
              <div className='col-span-1'>#{idx + 1} </div>
              <div className='col-span-3 w-max text-center text-[#525F7F] flex space-x-2 items-center'>
                {item.instituteLogo ? (
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
                  <AvrilImage alt='avril' className='h-8 w-8 rounded-full' />
                )}
                <Link href='/super-admin/school'>
                  <h2 className='text-sm font-medium'>{item.instituteName}</h2>
                </Link>{' '}
              </div>
              <div className='col-span-2'>{item.instituteType} </div>
              <div className='col-span-2'>{item.studentCount}</div>
              <div className='col-span-2'>{item.studentCount}</div>
              <div className='col-span-2'> {item.instituteAddress} </div>
            </div>
          ))
        )}
        {!isLoading && data.length === 0 && (
          <div className='text-red-500 py-4 text-center'>No record found</div>
        )}

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

export default SchoolList;
