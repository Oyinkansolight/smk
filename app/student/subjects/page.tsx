/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import BackButton from '@/components/accordions/BackButton';
import SubjectList from '@/components/views/student.tsx/ClassSubjectList';
import { getFromSessionStorage } from '@/lib/helper';
import { useGetClassArmInfo } from '@/server/institution/class';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Page() {
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
        <BackButton />
        <div className='flex flex-row items-center justify-between w-full'>
          <div className='font-bold py-8 w-full'>
            <div className='flex flex-wrap gap-x-[52px] gap-y-10 justify-items-center w-full'>
              <SubjectList studentSubjectsList={classArmInfo?.subjects} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
