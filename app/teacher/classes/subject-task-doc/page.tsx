/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from '@/components/buttons/Button';
import CreateSubjectActivityModal from '@/components/modals/create-subject-activity-modal';
import TakeAttendanceModal from '@/components/modals/take-attendance-modal';
import CustomPDFReader from '@/components/pdfReader/Reader';
import { SAMPLE_ASSETS } from '@/constant/assets';
import { getURL } from '@/firebase/init';
import { handleFlutterPDFReader } from '@/lib/helper';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useMediaQuery } from 'react-responsive';

export default function Page() {
  const [url, setUrl] = useState('');
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  useEffect(() => {
    const getFileURL = async () => {
      const path = SAMPLE_ASSETS.SAMPLE_PDFS.SCRIPTED_LESSONS.BIOLOGY;

      await getURL(path).then((v) => setUrl(v));
    };
    getFileURL();
  }, [url]);

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
            {url.length > 0 && (
              isDesktopOrLaptop ? <CustomPDFReader url={url} /> : handleFlutterPDFReader(url)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
