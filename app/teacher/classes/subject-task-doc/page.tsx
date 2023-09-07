/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from '@/components/buttons/Button';
import CreateSubjectActivityModal from '@/components/modals/create-subject-activity-modal';
import TakeAttendanceModal from '@/components/modals/take-attendance-modal';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import Link from 'next/link';
import { RotatingLines } from 'react-loader-spinner';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Page() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  if (typeof window === 'undefined') {
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

  return (
    <div className='layout'>
      <div className='text-[#D4D5D7] py-8 text-lg lg:text-2xl'>
        <Link href='/teacher/classes'>Classes</Link>
        {` > Subject Name`}
      </div>

      <div className='grid grid-cols-2'>
        <div>
          {' '}
          <div className='font-bold py-8 text-xl lg:text-4xl'>Biology</div>
          <div className=' text-xl md:text-2xl'>
            <span className='font-bold'>Period: </span>
            <span className='text-[#746D69]'>Wednesday 10:00am - 11:00am</span>
          </div>
          <div className='flex flex-wrap justify-start my-6 gap-3 whitespace-nowrap'>
            <TakeAttendanceModal>
              <Button variant='secondary'>Take Attendance</Button>
            </TakeAttendanceModal>

            <CreateSubjectActivityModal>
              <Button variant='secondary'>Add Lesson Tasks</Button>
            </CreateSubjectActivityModal>
          </div>
        </div>
      </div>

      <div className='flex items-stretch gap-10'>
        <div className='flex-1 mb-8 rounded-lg bg-white min-h-[100vh] overflow-hidden overflow-x-scroll'>
          <div className='flex justify-center'>
            <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js'>
              <div style={{ height: '100vh', width: '100vw' }}>
                <Viewer
                  initialPage={1}
                  fileUrl='/pdfs/BIOLOGY SS2 3RD TERM WEEK 3.pdf'
                  plugins={[defaultLayoutPluginInstance]}
                />
              </div>
            </Worker>
          </div>
        </div>
      </div>
    </div>
  );
}
