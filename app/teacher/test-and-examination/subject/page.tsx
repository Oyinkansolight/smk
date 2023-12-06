'use client';

import TextTabBar from '@/components/layout/TextTabBar';
import EmptyView from '@/components/misc/EmptyView';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import { useGetSessionTerms } from '@/server/government/terms';
import { useGetTeacherClassArms } from '@/server/institution/class-arm';
import { useGetSubjectTestExam } from '@/server/test-and-exam';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { toast } from 'react-toastify';

export default function Page() {
  const params = useSearchParams();
  const [idx, setIdx] = useState(0);
  const { data: profile } = useGetProfile();
  const { data: terms } = useGetSessionTerms({
    sessionId: profile?.currentSession?.[0]?.id,
  });
  const { data, error } = useGetSubjectTestExam({
    sessionId: profile?.currentSession?.[0]?.id,
    termId: (terms?.data ?? [])[0].id,
    subjectId: params?.get('id'),
  });

  const { data: arms } = useGetTeacherClassArms({
    teacherId: profile?.userInfo?.staff?.id,
    sessionId: profile?.currentSession?.[0]?.id,
  });

  useEffect(() => {
    if (error) {
      toast.error(getErrMsg(error));
    }
  }, [error]);

  return (
    <div className='h-full layout pl-0 lg:pl-20'>
      <div className='text-[#D4D5D7] text-xl mt-6'>
        {'Test & Exam > Mathematics'}
      </div>
      <div className='font-bold py-8 h2'>
        <div>Mathematics</div>
      </div>
      {arms && arms.length > 0 && (
        <TextTabBar
          tabs={[
            ...(arms ?? []).map((arm) =>
              arm.arm ? `${arm.class?.name}` : '[NULL]'
            ),
          ]}
          onChange={setIdx}
          selectedIdx={idx}
        />
      )}
      {/* <div className='flex justify-between'>
        <ReactSelect
          classNames={{
            control: () =>
              'bg-transparent border-none font-bold active:border-none',
          }}
          className='min-w-[15rem]'
          options={[{ label: 'Academic Calendar 2022/2023 ' }]}
        />
        <div className='flex items-center font-bold'>
          <BiChevronLeft className='h-6 w-6 text-blue-500' />
          <div>First Term</div>
          <BiChevronRight className='h-6 w-6 text-blue-500' />
        </div>
      </div> */}
      <div className='flex gap-4 items-center text-[#746D69] bg-white p-4 rounded-md'>
        <input onChange={(e) => logger(e.target.value)} className='rounded-full border p-3' placeholder='Search activity' />
        <div className='flex-1' />
        {/* <div className='flex items-center'>
          Filter By
          <BiChevronDown className='w-6 h-6' />
        </div> */}

        {/* {dir === 'DESC' && <div onClick={() => handleSort('ASC')} className='flex items-center'>
          ASC
          <BiSortUp className='h-6 w-6 cursor-pointer' />
        </div>}

        {dir === 'ASC' && <div onClick={() => handleSort('DESC')} className='flex items-center'>
          DESC
          <BiSortDown className='w-6 h-6 cursor-pointer' />
        </div>} */}

      </div>
      <div className='h-4' />
      <div className='flex flex-col gap-2'>
        {data?.data && data.data.length === 0 ? (
          <EmptyView
            label='Tests and Exams haven’t been added for this term'
            useStandardHeight
          />
        ) : (
          data?.data.map((v, i) => (
            <Link
              href='/teacher/test-and-examination/subject/assessment'
              key={i}
            >
              <div className='border rounded bg-white p-4 flex gap-4 items-center'>
                <div className='relative rounded-full border h-16 w-16'>
                  <Image
                    alt='book-stack'
                    className='absolute inset-2'
                    src='/images/book_stack.png'
                    fill
                  />
                </div>
                <div className='font-bold text-[#746D69] text-base flex gap-5 items-center'>
                  <div className='text-xs font-normal'>Assessment: </div>
                  <div>{v.title}</div>
                </div>
                <div className='flex-1' />
                <BiChevronRight className='h-16 w-16 text-[#D4D5D7]' />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
