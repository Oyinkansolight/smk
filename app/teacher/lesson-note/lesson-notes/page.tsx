'use client';

import GenericLoader from '@/components/layout/Loader';
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
import { BiChevronRight } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: profile } = useGetProfile();
  const { data: terms } = useGetSessionTerms({
    sessionId: profile?.currentSession?.[0]?.id,
  });
  const term = terms?.data[0]?.id;
  const { data: arms, isLoading: isLoadingArms } = useGetTeacherClassArms({
    teacherId: profile?.userInfo?.staff?.id,
    sessionId: profile?.currentSession?.[0]?.id,
  });
  const { data: lessonNotes, isLoading: isLoadingActivity } = useGetAllLessonNotes({
    page: currentPage,
    sessionId: profile?.currentSession?.[0]?.id,
    termId: term,
  });

  if (isLoadingActivity || isLoadingArms) {
    return (
      <div className='flex flex-col justify-center items-center h-1/2'>
        <GenericLoader />
      </div>
    );
  }

  return (
    <div className='h-full layout pl-0 lg:pl-20 pb-20'>
      <div
        onClick={() => router.push("/teacher/lesson-note")}
        className='flex items-center space-x-4 pt-4 cursor-pointer w-10'>
        <Image
          src='/svg/back.svg'
          width={10}
          height={10}
          alt='back'
          className='h-4 w-4'
        />
        <h3 className='text-[10px] font-medium'>Back</h3>
      </div>

      <div className='font-bold text-3xl py-8 h3'>
        <div>Lesson Note</div>
      </div>
      <TextTabBar
        tabs={[
          ...(arms ?? []).map((arm) =>
            arm.arm ? `${arm.class?.name}` : '[NULL]'
          ),
        ]}
        onChange={setIdx}
        selectedIdx={idx}
        callback={() => setCurrentPage(1)}
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

      {lessonNotes?.data &&
        lessonNotes?.data.length > 0 &&
        <div className='grid p-4 text-[#746D69] font-bold md:text-base text-sm grid-cols-6'>
          <div className='col-span-2'>Title</div>
          <div>Subject</div>
          <div>Class</div>
          <div>Date Assigned</div>
          <div></div>
        </div>
      }

      <div className='flex flex-col gap-2'>
        {lessonNotes?.data &&
          (lessonNotes?.data.length === 0 ? (
            <EmptyView label='No submissions' useStandardHeight />
          ) : (
            lessonNotes.data?.map((lessonNote, i) => (
              <Link
                key={lessonNote.id}
                href={`/teacher/lesson-note/lesson-notes/view-lesson-note?lessonNoteId=${lessonNote.id}`}
              >
                <AssignmentListItem
                  title={`${lessonNote?.title}`}
                  key={i}
                  subject={lessonNote?.subject?.name ?? 'NULL'}
                  nameOfClass={arms?.[i]?.class?.name}
                  date={lessonNote?.createdAt}
                />
              </Link>
            ))
          ))}
      </div>

      {lessonNotes?.data &&
        lessonNotes?.data.length > 0 &&
        <PaginatedCounter
          currentPage={currentPage}
          onChange={setCurrentPage}
          pageCount={lessonNotes?.paging?.totalPage ?? 1}
        />
      }
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
