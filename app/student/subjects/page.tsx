/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import SearchInput from '@/components/input/SearchInput';
import SubjectList from '@/components/views/student.tsx/ClassSubjectList';
import SmallStudentSubjectCard from '@/components/views/student.tsx/SmallStudentSubjectCard';
import { getFromSessionStorage } from '@/lib/helper';
import { useGetStudentSubjectList } from '@/server/institution';
import { useGetClassArmInfo } from '@/server/institution/class';
import { useRouter } from 'next/navigation';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Page() {
  const colors = [
    'bg-[#EFF7F6]',
    'bg-[#F3EFF7]',
    'bg-[#F7EFEF]',
    'bg-[#F7F7EF]',
  ];

  const router = useRouter();
  const userData = getFromSessionStorage('user');
  let user;
  if (userData) {
    user = JSON.parse(userData);
  }

  const { data: classArmInfo } = useGetClassArmInfo(
    user?.currentStudentInfo?.class?.id
  );
  return (
    <div className='layout h-full'>
      <div className='flex flex-col bg-white h-screen'>
        <div className='flex flex-row items-center justify-between'>
          <div className='font-bold py-8 text-4xl'>
            <div className='flex flex-wrap gap-x-[52px] gap-y-10 justify-items-center w-full'>
              <SubjectList studentSubjectsList={classArmInfo?.subjects} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
