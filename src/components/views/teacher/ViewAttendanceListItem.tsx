import clsxm from '@/lib/clsxm';
import { useState } from 'react';

export default function ViewAttendanceListItem({
  index,
  name,
}: {
  index: number;
  name: string;
}) {
  return (
    <div
      className={clsxm(
        'flex py-2 px-6 rounded-md border bg-white items-center gap-8'
      )}
    >
      <div className='font-bold text-lg'>{index + 1}</div>
      <div className='h-16 w-16 rounded-full bg-gray-300'></div>
      <div className='font-bold'>{name}</div>
      <div className='flex-1' />
      {
        <button className='py-3 px-12 rounded-sm bg-green-500 font-bold text-white'>
          Present
        </button>
      }
      {
        <button className='py-3 px-12 rounded-sm bg-red-500 font-bold text-white'>
          Absent
        </button>
      }
      <button className='py-3 px-12 rounded-sm bg-[#E5A500] font-bold text-white'>
        Late
      </button>
    </div>
  );
}
