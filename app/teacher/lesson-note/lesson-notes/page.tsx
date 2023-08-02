'use client';

import PaginatedCounter from '@/components/layout/PaginatedCounter';
import TextTabBar from '@/components/layout/TextTabBar';
import EmptyView from '@/components/misc/EmptyView';
import clsxm from '@/lib/clsxm';
import { useGetProfile } from '@/server/auth';
import { useGetSessionTerms } from '@/server/government/terms';
import { useGetTeacherClassArms } from '@/server/institution/class-arm';
import { useGetAllLessonNotes } from '@/server/institution/lesson-note';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiChevronDown, BiChevronRight, BiSortUp } from 'react-icons/bi';


export default function Page() {
  const [idx, setIdx] = useState(0);
  const { data: profile } = useGetProfile();
  const { data: terms } = useGetSessionTerms({
    sessionId: profile?.currentSession?.id,
  });
  const term = terms?.data[0]?.id;
  const { data: arms } = useGetTeacherClassArms({
    teacherId: profile?.userInfo?.staff?.id,
    sessionId: profile?.currentSession?.id,
  });
  const { data: lessonNotes } = useGetAllLessonNotes({
    sessionId: profile?.currentSession?.id,
    termId: term,
  });

  return (
    <div className='h-full layout'>
      <div className='font-bold text-3xl py-8 h3'>
        <div>Lesson Note</div>
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
      <div className='grid p-4 text-[#746D69] font-bold md:text-base text-sm grid-cols-6'>
        <div className='col-span-2'>Title</div>
        <div>Subject</div>
        <div>Class</div>
        <div>Date Assigned</div>
        <div></div>
      </div>
      <div className='flex flex-col gap-2'>
        {lessonNotes?.data &&
          (lessonNotes?.data.length === 0 ? (
            <EmptyView label='No submissions' useStandardHeight />
          ) : (
            lessonNotes.data?.map((lessonNote, i) => (
              <Link
                href={`/teacher/lesson-note/lesson-notes/view-lesson-note?lessonNoteId=${lessonNote.id}&uploadUrl=${lessonNote.uploadUrl}`}
                key={i}
              >
                <AssignmentListItem
                  title={`${lessonNote?.title}`}
                  key={i}
                  subject={lessonNote?.subject?.name ?? 'NULL'}
                  nameOfClass={lessonNote?.class.name}
                  date={lessonNote?.createdAt}
                />
              </Link>
            ))
          ))}
      </div>
      <PaginatedCounter pageCount={5} currentPage={2} />
    </div>
  );
}

function AssignmentListItem({
  title,
  subject,
  nameOfClass,
  date,
}: {
  title: string;
  subject: string;
  nameOfClass?: string;
  date?: Date;
}) {
  return (
    <div
      className={clsxm(
        'border rounded bg-white p-4 grid grid-cols-6 items-center font-bold text-[#746D69]'
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
        <div>{title}</div>
      </div>
      <div>{subject}</div>
      <div>{nameOfClass}</div>
      <div>{moment(date).format('MMMM DD')}</div>
      <div className='flex justify-end w-full items-center'>
        <BiChevronRight className='h-10 w-10' />
      </div>
    </div>
  );
}