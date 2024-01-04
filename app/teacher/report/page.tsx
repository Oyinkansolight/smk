'use client';

import IncidentReport from '@/components/views/teacher/IncidentReport';
import { useRouter } from 'next/navigation';
import { MdArrowBackIos } from 'react-icons/md';

export default function Page() {
  const router = useRouter();

  return (
    <div className='flex flex-col layout pl-0 lg:pl-20'>
      <div
        onClick={() => router.back()}
        className='cursor-pointer flex items-center mt-6'
      >
        <MdArrowBackIos className='text-[#42BBFF]' />
        <div>Back</div>
      </div>
      <IncidentReport />
    </div>
  );
}
