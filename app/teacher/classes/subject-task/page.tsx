'use client';

import Button from '@/components/buttons/Button';
import PageCounter from '@/components/counter/PageCounter';
import CreateSubjectActivityModal from '@/components/modals/create-subject-activity-modal';
import TakeAttendanceModal from '@/components/modals/take-attendance-modal';
import { useState } from 'react';
import { IoAddCircle } from 'react-icons/io5';
import { Page as DocPage, Document, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function Page() {
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className='layout'>
      <div className='text-[#D4D5D7] py-8 text-2xl'>
        {'Classes > Mathematics'}
      </div>

      <div className='font-bold py-8 text-4xl'>Mathematics - Primary 1</div>

      <div className='text-2xl'>
        <span className='font-bold'>Period: </span>October 16, 12:00 PM - 1:00
        PM
      </div>

      <div className='flex justify-start my-6'>
        <TakeAttendanceModal>
          <Button variant='secondary'>Take Attendance</Button>
        </TakeAttendanceModal>
      </div>

      <div className='flex items-start gap-10'>
        <div className='flex-1 mb-8 rounded-lg bg-white'>
          <div className='flex justify-center p-8'>
            <PageCounter
              page={currentPage}
              maxPage={numberOfPages}
              onChange={setCurrentPage}
            />
          </div>
          <Document
            className='mx-auto'
            file='/pdfs/EDO LANGUAGE SS2 3RD TERM WEEK 3.pdf'
            onLoadSuccess={(v) => {
              setNumberOfPages(v.numPages);
            }}
          >
            <DocPage pageNumber={currentPage} />
          </Document>
        </div>

        <div className='bg-white p-4 flex flex-col max-w-[280px] items-center gap-4 rounded-lg w-full mb-6 whitespace-nowrap'>
          <div className='text-xl self-start font-bold'>Lesson Tasks</div>
          <div className='flex justify-between rounded-md bg-[#F7F8FA] p-5 w-full'>
            <div className=''>Home Work</div>
            <div className='w-16' />
            <div>Due: October 24</div>
          </div>
          <div className='rounded-md bg-[#F7F8FA] p-5 w-full'>Class Work</div>
          <div className='rounded-md bg-[#F7F8FA] p-5 w-full'>Pop Quiz</div>
          <CreateSubjectActivityModal>
            <div className='flex justify-end'>
              <IoAddCircle className='h-8 w-8 text-blue-500' />
            </div>
          </CreateSubjectActivityModal>
        </div>
      </div>
    </div>
  );
}
