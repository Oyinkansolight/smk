'use client';

import ROUTES from '@/constant/routes';
import { getFromLocalStorage } from '@/lib/helper';
import { useGetStaffs } from '@/server/government/staff';
import { useGetInstituteClassArms } from '@/server/institution/class';
import Image from 'next/image';
import Link from 'next/link';

// import Back from '@/'
// import clsxm from '@/lib/clsxm';

const AllClasses = () => {
  const institutionId = getFromLocalStorage('institutionId');
  const currentSessionId = getFromLocalStorage('currentSessionId');

  const { data: allclasses, isLoading } = useGetInstituteClassArms(
    Number(institutionId),
    Number(currentSessionId)
  );

  const { data: staffs } = useGetStaffs();
  // console.log(institutionId, currentSessionId);

  const getTeacher = (teacherId: number) => {
    const teacherInfo = (staffs ?? []).find((v: any) => v.id === teacherId);
    return `${teacherInfo?.user[0].firstName} ${teacherInfo?.user[0].lastName}`;
  };

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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>All Classes</h1>

      <div className='mb-6 flex justify-end space-x-4 items-end'>
        <Link
          href='/admin/add-class'
          className='w-max rounded border border-[#007AFF] px-6 py-3 text-center text-xs text-[#007AFF] '
        >
          Add Class Arm
        </Link>
      </div>
      <div className='flex justify-end'>
        {/* <div className='flex w-[300px] space-x-2'>
          <select name='' className='border-none bg-transparent outline-none'>
            <option value=''>Filter</option>
          </select>
          <BasicSearch handleSearch={handleSearch} />
        </div> */}
      </div>

      <div className='table-add-student mt-5 pb-4 pt-1 overflow-x-auto w-full'>
        <div className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400 bg-white py-4 px-1 text-[#8898AA] font-semibold'>
          <div className='col-span-3'>Class Arm</div>
          <div className='col-span-3'>Capacity</div>
          <div className='col-span-6'>Class Teacher</div>
        </div>
        {isLoading ? (
          <div className='py-10 text-center'>Loading...</div>
        ) : (
          <div>
            {(allclasses ?? []).map((item: any, idx: number) => (
              <div
                className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b bg-white py-4 px-1 text-[#8898AA] font-semibold'
                key={idx}
              >
                <div className='col-span-3'>
                  <Link href={`/admin/class?id=${item.id}`}>
                    {`${item.class.name} ${item.arm}`}
                  </Link>
                </div>
                <div className='col-span-3'> {item.capacity} </div>
                <div className='col-span-6'>
                  {getTeacher(item?.teacher?.id)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllClasses;
