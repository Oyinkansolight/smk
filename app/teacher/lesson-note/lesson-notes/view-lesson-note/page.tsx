'use client';

import BackButton from '@/components/accordions/BackButton';
import GenericLoader from '@/components/layout/Loader';
import CustomPDFReader from '@/components/pdfReader/Reader';
import { getURL } from '@/firebase/init';
import { handleFlutterPDFReader } from '@/lib/helper';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function Page() {
  const params = useSearchParams();
  const [fileDownloadURL, setFileDownloadURL] = useState<string>('');

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  useEffect(() => {
    const run = async () => {
      setFileDownloadURL(await getURL(params?.get('uploadUrl') ?? ''));
    };
    run();
  }, [params]);

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
          {fileDownloadURL === '' ? <GenericLoader /> : (
            isDesktopOrLaptop ? <CustomPDFReader url={fileDownloadURL} /> : handleFlutterPDFReader(fileDownloadURL)
          )}
        </div>
      </div>
    </div>
  );
}
