/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import logger from '@/lib/logger';
import { useGetStaffs } from '@/server/government/staff';
import { useGetClassesList } from '@/server/institution';

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

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const Publish = ({ publishData }: any) => {
  logger(publishData);
  const { data: staffs } = useGetStaffs();
  const { data: classes } = useGetClassesList();

  const getTeacher = (staffs ?? []).find(
    (v: any) => v.id === Number(publishData.classTeacher)
  );
  const getClass = (classes?.data ?? []).find(
    (v: any) => v.id === Number(publishData.class)
  );

  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>Publish</h2>
      <p>Kindly ensure that the details below are correct before submitting:</p>

      <div className='bg-[#F4F9FF] p-8 rounded-md mt-4'>
        <h2 className='text-xl font-bold mb-10'>Summary</h2>

        <div className='grid grid-cols-12 gap-4  items-center mb-10'>
          <div className='col-span-8'>
            <h2 className='text-xs mb-2 font-medium'>Class Name</h2>
            <p>{getClass?.name} </p>
          </div>
          <div className='col-span-4'>
            <h2 className='text-xs mb-2 font-medium'>Class Arm</h2>
            <p>{publishData.classArm}</p>
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4  items-center mb-10'>
          <div className='col-span-8'>
            <h2 className='text-xs mb-2 font-medium'>Capacity</h2>
            <p>{publishData.classCapacity}</p>
          </div>

          <div className='col-span-4'>
            <h2 className='text-xs mb-2 font-medium'>Class Teacher</h2>
            <p>
              {getTeacher?.user[0].firstName || ''}{' '}
              {getTeacher?.user[0].lastName || ''}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publish;
