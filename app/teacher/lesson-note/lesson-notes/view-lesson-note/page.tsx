'use client';

import BackButton from '@/components/accordions/BackButton';
import SubjectiveViewer from '@/components/cards/SubjectiveViewer';
import GenericLoader from '@/components/layout/Loader';
import CustomPDFReader from '@/components/pdfReader/Reader';
import { handleFlutterPDFReader } from '@/lib/helper';
import { useGetLessonNoteById } from '@/server/institution/lesson-note';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';

export default function Page() {
  const params = useSearchParams();
  const { data: lessonNote, isLoading } = useGetLessonNoteById(params?.get('lessonNoteId') ?? '');

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  console.log(lessonNote);

  if (isLoading) {
    return (
      <div className='flex flex-col justify-center items-center h-1/2'>
        <GenericLoader />
      </div>
    );
  }

  return (
    <div className='w-full layout pl-0 lg:pl-20'>
      <BackButton />

      <div className='text-[#D4D5D7] py-8 text-lg lg:text-2xl'>
        <Link href='/teacher/lesson-note'>Lesson Tasks</Link>

        <Link href='/teacher/lesson-note/lesson-notes'>
          {` > Lesson Notes`}
        </Link>
      </div>

      <div className='font-bold text-3xl py-8 h3'>Lesson Note</div>
      {/* <div className='flex items-center gap-2 font-bold'>
        <div className='h-10 w-10 rounded-full bg-gray-200' />
        <div>Ighosa Ahmed</div>
      </div> */}
      <div className='flex-1 mb-8 rounded-lg bg-white min-h-[50rem] overflow-hidden overflow-x-scroll mt-10'>
        <div className='flex justify-center'>
          {lessonNote?.uploadUrl ? isDesktopOrLaptop ? <CustomPDFReader url={lessonNote?.uploadUrl ?? ''} /> : handleFlutterPDFReader(lessonNote?.uploadUrl ?? '') : (
            <SubjectiveViewer content={lessonNote?.instructionalTeachingActivity ?? ''} />
          )}
        </div>
      </div>
    </div>
  );
}
