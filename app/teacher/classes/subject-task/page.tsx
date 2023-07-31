/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from '@/components/buttons/Button';
import PageCounter from '@/components/counter/PageCounter';
import EmptyView from '@/components/misc/EmptyView';
import CreateSubjectActivityModal from '@/components/modals/create-subject-activity-modal';
import TakeAttendanceModal from '@/components/modals/take-attendance-modal';
import { ACTIVITY_TYPES } from '@/components/views/teacher/create-class-activity-view';
import { getURL } from '@/firebase/init';
import logger from '@/lib/logger';
import { useGetPeriodById } from '@/server/institution/period';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoAddCircle } from 'react-icons/io5';
import { RotatingLines } from 'react-loader-spinner';
import { Page as DocPage, Document, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function Page() {
  // const DELAY = 300; // Set the delay for detecting double-click
  // const [clicks, setClicks] = useState(0);
  // const timerRef = useRef<any>(null);
  const [url, setUrl] = useState('');
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const params = useSearchParams();
  const id = params?.get('id');
  const { data: period, isLoading } = useGetPeriodById(id ? id : undefined);

  useEffect(() => {
    if (period && period?.file?.fileUrl) {
      const getFileURL = async () => {
        const path = period?.file?.fileUrl ?? '';

        await getURL(path).then((v) => setUrl(v));
        logger(url);
      };
      getFileURL();
    }
  }, [period, url]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-[40vh]'>
        <RotatingLines
          width='100'
          visible={true}
          strokeWidth='5'
          strokeColor='#4fa94d'
          animationDuration='0.75'
        />
      </div>
    );
  }

  // const handleClick = () => {
  //   setClicks((prevClicks) => prevClicks + 1);

  //   if (clicks === 0) {
  //     timerRef.current = setTimeout(() => {
  //       // Perform single-click action
  //       if (numberOfPages === currentPage) return;
  //       setCurrentPage((page) => page + 1);
  //       setClicks(0); // After action performed, reset counter
  //     }, DELAY);
  //   } else {
  //     clearTimeout(timerRef.current); // Prevent single-click action
  //     // Perform double-click action
  //     if (currentPage === 1) return;
  //     setCurrentPage((page) => page - 1);
  //     setClicks(0); // After action performed, reset counter
  //   }
  // };

  const handleTouchStart = (e: any) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: any) => {
    e.preventDefault(); // Prevent scrolling while swiping
  };

  const handleTouchEnd = (e: any) => {
    setTouchEndX(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50; // Minimum distance for swipe detection

    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) >= swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe Right
        if (currentPage === 1) return;
        setCurrentPage((page) => page - 1);
      } else {
        // Swipe Left
        if (numberOfPages === currentPage) return;
        setCurrentPage((page) => page + 1);
      }
    }
  };

  return (
    <div className='layout'>
      <div className='text-[#D4D5D7] py-8 text-2xl'>
        {`Classes > ${period?.subject?.name}`}
      </div>

      <div className='grid grid-cols-2'>
        <div>
          {' '}
          <div className='font-bold py-8 text-2xl md:text-4xl'>
            {`${period?.subject?.name} - ${period?.class?.name}`}
          </div>
          <div className=' text-xl md:text-2xl'>
            <span className='font-bold'>Period: </span>
            {`${period?.day} ${period?.startTime} - ${period?.endTime}`}
          </div>
          <div className='flex justify-start my-6'>
            <TakeAttendanceModal>
              <Button variant='secondary'>Take Attendance</Button>
            </TakeAttendanceModal>
          </div>
        </div>

        <div className='flex justify-end'>
          <div className='bg-white p-4 flex flex-col max-w-[280px] items-center gap-4 rounded-lg w-full mb-6 whitespace-nowrap'>
            <div className='text-xl self-start font-bold'>Lesson Tasks</div>
            <SideBarItem type='ASSIGNMENT'>
              <div className=''>Home Work</div>
              <div className='w-16' />
              <div>Due: October 24</div>
            </SideBarItem>
            <SideBarItem type='CLASS_WORK'>Class Work</SideBarItem>
            <SideBarItem type='QUIZ'>Pop Quiz</SideBarItem>
            <SideBarItem type='LESSON_NOTE'>Lesson Note</SideBarItem>
            <CreateSubjectActivityModal>
              <div className='flex justify-end'>
                <IoAddCircle className='h-8 w-8 text-blue-500' />
              </div>
            </CreateSubjectActivityModal>
          </div>
        </div>
      </div>

      <div className='flex items-stretch gap-10'>
        {period?.file ? (
          <div className='flex-1 mb-8 rounded-lg bg-white min-h-[50rem] overflow-hidden overflow-x-scroll'>
            <div className='flex justify-center p-8'>
              <PageCounter
                page={currentPage}
                maxPage={numberOfPages}
                onChange={setCurrentPage}
              />
            </div>
            <div className='flex justify-center'>
              {' '}
              <Document
                file={url}
                className='mx-auto'
                onLoadSuccess={(v) => {
                  setNumberOfPages(v.numPages);
                }}
              >
                <DocPage
                  renderTextLayer={false}
                  pageNumber={currentPage}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                />
              </Document>
            </div>
          </div>
        ) : (
          <div className='w-full'>
            <EmptyView
              label='No scripted lesson note for this period'
              useStandardHeight
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function SideBarItem({
  type,
  children,
}: {
  type: (typeof ACTIVITY_TYPES)[number];
  children: JSX.Element | JSX.Element[] | string;
}) {
  return (
    <Link
      href={
        type === 'ASSIGNMENT'
          ? '/teacher/lesson-note/assignment'
          : type === 'CLASS_WORK'
          ? '/teacher/lesson-note/class-work'
          : type === 'LESSON_NOTE'
          ? '/teacher/lesson-note/lesson-notes'
          : type === 'QUIZ'
          ? '/teacher/lesson-note/pop-quiz'
          : '#'
      }
    >
      <div className='flex justify-between rounded-md bg-[#F7F8FA] p-5 w-full'>
        {children}
      </div>
    </Link>
  );
}
