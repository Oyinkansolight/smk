'use client';

import GenericLoader from '@/components/layout/Loader';
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
import { BiChevronRight } from 'react-icons/bi';

export default function Page() {
  const [idx, setIdx] = useState(0);
  const { data: profile } = useGetProfile();
  const { data: terms } = useGetSessionTerms({
    sessionId: profile?.currentSession?.[0]?.id,
  });
  const term = terms?.data[0]?.id;
  const { data: arms, isLoading: isLoadingArms } = useGetTeacherClassArms({
    teacherId: profile?.userInfo?.staff?.id,
    sessionId: profile?.currentSession?.[0]?.id,
  });
  const { data: activities, isLoading: isLoadingActivity } = useGetClassActivity({
    typeOfActivity: 'CLASS_WORK',
    classArmId: (arms ?? [])[idx]?.id as unknown as string,
    termId: term as unknown as string,
    sessionId: profile?.currentSession?.[0]?.id,
  });

  if (isLoadingActivity || isLoadingArms) {
    return (
      <div className='flex flex-col justify-center items-center h-1/2'>
        <GenericLoader />
      </div>
    );
  }

  return (
    <div className='h-full layout'>
      <div className='font-bold text-3xl py-8 h3'>
        <div>Class Work</div>
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
      {/* <div className='flex gap-4 items-center text-[#746D69] bg-white p-4 rounded-md'>
        <input className='rounded-full border p-3' placeholder='search' />
        <div className='flex-1' />
        <div className='flex items-center'>
          Filter By
          <BiChevronDown className='w-6 h-6' />
        </div>
        <BiSortUp className='h-6 w-6' />
      </div> */}
      <div className='h-4' />

      {activities?.data &&
        activities?.data.length > 0 &&
        <div className='grid p-4 text-[#746D69] font-bold md:text-base text-sm grid-cols-6'>
          <div className='col-span-2'>Title</div>
          <div>Subject</div>
          <div>Class</div>
          <div>Date Assigned</div>
          <div>Date Due</div>
        </div>
      }

      <div className='flex flex-col gap-2'>
        {activities?.data &&
          (activities?.data.length === 0 ? (
            <EmptyView
              useStandardHeight
              label='No class work created for this class.'
            />
          ) : (
            activities?.data?.map((activity, i) => (
              <Link
                key={i}
                href={
                  activity.mode === 'OFFLINE'
                    ? `/teacher/lesson-note/class-work/offline-submissions?subjectId=${activity.subject.id
                    }&classArmId=${(arms ?? [])[idx].id}&type=${activity.typeOfActivity
                    }&format=${activity.format}`
                    : `/teacher/lesson-note/class-work/submissions?subjectId=${activity.subject.id
                    }&classArmId=${(arms ?? [])[idx].id}&type=${activity.typeOfActivity
                    }&format=${activity.format}`
                }
              >
                <LessonTaskListItem
                  isOfflineSubmission={activity.mode === 'OFFLINE'}
                  title={
                    activity.typeOfActivity
                      ? `${activity.typeOfActivity} -  ${activity.format}`
                        .replace('_', ' ')
                        .toLowerCase()
                      : '[NULL]'}
                  subject={activity.subject.name ?? '[NULL]'}
                  classString={
                    (arms ?? [])[idx].arm
                      ? `${(arms ?? [])[idx].class?.name} ${(arms ?? [])[idx].arm
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

      {activities?.data &&
        activities?.data.length > 0 &&
        <PaginatedCounter pageCount={activities?.paging.totalPage} currentPage={activities?.paging.currentPage} />
      }
    </div>
  );
}

function LessonTaskListItem({
  title,
  subject,
  isOfflineSubmission,
  classString,
  dueDate,
  dateCreated,
}: {

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
        'border rounded bg-white p-4 grid grid-cols-6 items-center font-bold text-[#746D69]',
        moment() >= moment(dueDate) && 'border-red-500'
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
      <div>{classString}</div>
      <div>{moment(dateCreated).format('MMMM DD')}</div>
      <div className='flex justify-between items-center'>
        <div className={clsxm(moment() >= moment(dueDate) && 'text-red-500')}>
          {dueDate ? moment(dueDate).format('MMMM DD') : '-'}
        </div>
        <BiChevronRight className='h-10 w-10' />
      </div>
    </div>
  );
}
