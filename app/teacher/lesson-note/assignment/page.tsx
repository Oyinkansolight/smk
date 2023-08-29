'use client';

import PaginatedCounter from '@/components/layout/PaginatedCounter';
import TextTabBar from '@/components/layout/TextTabBar';
import EmptyView from '@/components/misc/EmptyView';
import clsxm from '@/lib/clsxm';
import { useGetProfile } from '@/server/auth';
import { useGetSessionTerms } from '@/server/government/terms';
import { useGetTeacherClassArms } from '@/server/institution/class-arm';
import { useGetClassActivity } from '@/server/institution/lesson-note';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiChevronDown, BiChevronRight, BiSortUp } from 'react-icons/bi';

export default function Page() {
  const [idx, setIdx] = useState(0);
  const { data: profile } = useGetProfile();
  const { data: terms } = useGetSessionTerms({
    sessionId: profile?.currentSession?.[0]?.id,
  });
  const term = terms?.data[0]?.id;
  const { data: arms } = useGetTeacherClassArms({
    teacherId: profile?.userInfo?.staff?.id,
    sessionId: profile?.currentSession?.[0]?.id,
  });
  const { data: activities } = useGetClassActivity({
    typeOfActivity: 'ASSIGNMENT',
    classArmId: (arms ?? [])[idx]?.id as unknown as string,
    termId: term as unknown as string,
    sessionId: profile?.currentSession?.[0]?.id,
  });

  return (
    <div className='h-full layout'>
      <div className='font-bold text-3xl py-8 h3'>
        <div>Assignment</div>
      </div>
      <TextTabBar
        tabs={[
          ...(arms ?? []).map((arm) =>
            arm.arm ? `${arm.class?.name} ${arm.arm}` : '[NULL]'
          ),
        ]}
        onChange={setIdx}
        selectedIdx={idx}
      />
      <div className='flex gap-4 items-center text-[#746D69] bg-white p-4 rounded-md'>
        <input className='rounded-full border p-3' placeholder='search' />
        <div className='flex-1' />
        <div className='flex items-center'>
          Filter By
          <BiChevronDown className='w-6 h-6' />
        </div>
        <BiSortUp className='h-6 w-6' />
      </div>
      <div className='h-4' />
      <div className='grid p-4 text-[#746D69] font-bold md:text-base text-sm grid-cols-5 md:grid-cols-6'>
        <div className='col-span-2'>Title</div>
        <div>Subject</div>
        <div className='hidden md:block'>Class</div>
        <div>Date Assigned</div>
        <div>Date Due</div>
      </div>
      <div className='flex flex-col gap-2'>
        {activities?.data &&
          (activities?.data.length === 0 ? (
            <EmptyView
              useStandardHeight
              label='No assignments created for this class.'
            />
          ) : (
            activities?.data?.map((activity, i) => (
              <Link
                key={i}
                href={
                  activity.format === 'MULTIPLE_CHOICE'
                    ? `/teacher/lesson-note/assignment/offline-submissions?subjectId=${
                        activity.subject.id
                      }&classArmId=${(arms ?? [])[idx].id}&type=${
                        activity.typeOfActivity
                      }`
                    : `/teacher/lesson-note/assignment/submissions?subjectId=${
                        activity.subject.id
                      }&classArmId=${(arms ?? [])[idx].id}&type=${
                        activity.typeOfActivity
                      }`
                }
              >
                <LessonTaskListItem
                  isDue={false}
                  isOfflineSubmission={false}
                  title={
                    activity.typeOfActivity
                      ? `${activity.typeOfActivity} -  ${activity.format}`
                          .replace('_', ' ')
                          .toLowerCase()
                      : '[NULL]'
                  }
                  subject={activity.subject.name ?? '[NULL]'}
                  classString={
                    (arms ?? [])[idx].arm
                      ? `${(arms ?? [])[idx].class?.name} ${
                          (arms ?? [])[idx].arm
                        }`
                      : '[NULL]'
                  }
                  dueDate={activity.dueDate}
                  dateCreated={activity.createdAt}
                  key={i}
                />
              </Link>
            ))
          ))}
      </div>
      <PaginatedCounter pageCount={5} currentPage={0} />
    </div>
  );
}

function LessonTaskListItem({
  isDue,
  title,
  subject,
  isOfflineSubmission,
  classString,
  dueDate,
  dateCreated,
}: {
  isDue: boolean;
  isOfflineSubmission?: boolean;
  title: string;
  subject: string;
  classString: string;
  dueDate: Date;
  dateCreated: Date;
}) {
  return (
    <div
      className={clsxm(
        'border rounded bg-white p-4 grid grid-cols-5 md:grid-cols-6 items-center font-bold text-[#746D69]',
        isDue && 'border-red-500'
      )}
    >
      <div className='flex items-center col-span-2 gap-4'>
        <div className='relative rounded-full border md:block hidden h-16 w-16 '>
          <Image
            alt='book-stack'
            className='absolute inset-2'
            src='/images/book_stack.png'
            fill
          />
        </div>
        <div className='capitalize'>{title}</div>
        {isOfflineSubmission && (
          <div className='font-normal bg-[#A5A5A5] text-white text-sm py-[1px] px-3 rounded'>
            Offline
          </div>
        )}
      </div>
      <div>{subject}</div>
      <div className='hidden md:block'>{classString}</div>
      <div>{moment(dateCreated).format('MMMM DD')}</div>
      <div className='flex justify-between items-center'>
        <div className={clsxm(isDue && 'text-red-500')}>
          {moment(dueDate).format('MMMM DD')}
        </div>
        <BiChevronRight className='h-10 w-10' />
      </div>
    </div>
  );
}
