'use client';

import NextImage from '@/components/NextImage';
import PageCounter from '@/components/counter/PageCounter';
import { getURL } from '@/firebase/init';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';
import { useGetPeriodById } from '@/server/institution/period';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { RotatingLines } from 'react-loader-spinner';
import { Page as DocPage, Document, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Page = () => {
  const router = useRouter();
  const queryString = useSearchParams();
  const periodId = queryString?.get('name');

  const { data, isLoading } = useGetPeriodById(periodId ? periodId : '');
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [url, setUrl] = useState<string | any>('');
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let path
  if (data && !isLoading) {
     path = data?.file?.fileUrl ?? '';

    getURL(path).then((v) => setUrl(v));
    logger(data);
  }

  useEffect(() => {
    // Create a URLSearchParams object with the query string
    const searchParams = new URLSearchParams(queryString ?? '');

    // Extract the values of subject name parameters
    const subjectName = searchParams.get('name');
    // settitle(subjectName);
    const getFileURL = async () => {
      const url = await getURL(path);
      setUrl(url);
      logger(url);
    };
    getFileURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  return (
    <div className='layout flex flex-col gap-5'>
      {!isLoading ? (
        <div className='flex flex-row gap-8 justify-between'>
          <div className='flex flex-col gap-5 w-full'>
            <button
              onClick={() => router.back()}
              className='flex items-center space-x-4'
            >
              <Image
                src='/svg/back_yellow.svg'
                width={10}
                height={10}
                alt='back'
                className='h-3 w-3'
              />
              <h3 className='text-[14px] font-bold'>Back</h3>
            </button>

            <div className='flex gap-x-4 font-semibold items-center text-lg leading-5 border border-[#eee] px-[10px] py-[3.5px] rounded w-fit text-[#C4C4C4]'>
              <div>Period</div>

              <Image
                src='/svg/back_yellow.svg'
                width={10}
                height={10}
                alt='back'
                className='h-3 w-3 rotate-180'
              />

              <div className='text-[#3361FF]'>
                {data?.subject?.name ?? 'No_name'}
              </div>
            </div>

            <div className='text-xl font-bold '>
              {data?.subject?.name ?? 'No_name'}
            </div>

            <div className='flex flex-col md:flex-row gap-6'>
              <div className='md:order-first order-last flex flex-col gap-[14px] bg-[#F9F9F9] rounded-[5px] px-5 pb-5 pt-[14px] md:w-[817px] w-full'>
                <div className='flex justify-end'>
                  <div className='bg-[#FFF6E7] mb-3 p-1 border border-[#EE9D50]'>
                    {formattedDate}
                  </div>
                </div>
                <div className='text-[#818181] font-semibold text-[14px] leading-5'>
                  Topic
                </div>
                <div className='text-[#746D69] font-bold text-2xl'>
                  {data?.title ?? 'No topic'}
                </div>
              </div>
              <div className='flex  md:flex-col flex-row gap-6 '>
                <div className='flex flex-col items-center justify-between min-w-[220px] w-full bg-[#F9F9F9] rounded border py-3'>
                  <div className='text-[#818181] text-[14px] font-semibold leading-5'>
                    Teacher
                  </div>
                  <div className='flex'>
                    {/* <BigAvatar src='/images/teacher_1.png' /> */}
                    <div className='h4 font-semibold'>
                      {' '}
                      {data?.teacher
                        ? data?.teacher?.user[0].firstName
                        : 'No_name'}{' '}
                    </div>
                  </div>
                </div>

                <div className='flex flex-col items-center justify-between min-w-[220px] w-full bg-[#F9F9F9] rounded border py-3'>
                  <div className='text-[#818181] text-[14px] font-semibold leading-5'>
                    Attendance Status
                  </div>
                  <div className='h4 font-semibold text-[#9FE2C3]'>Present</div>
                </div>
              </div>
            </div>

            <div className='flex-1 mb-8 rounded-lg bg-white w-full'>
              <div className='w-full'>
                {url.length > 0 && (
                  <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js'>
                    <div style={{ height: '100vh', width: '100%' }}>
                      <Viewer
                        fileUrl={url}
                        plugins={[defaultLayoutPluginInstance]}
                      />
                    </div>
                  </Worker>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center py-20'>
          <RotatingLines
            width='100'
            visible={true}
            strokeWidth='5'
            strokeColor='#3361FF'
            animationDuration='0.75'
          />
        </div>
      )}
    </div>
  );
};

// interface AssignmentCardProps {
//   title: string;
//   status?: 'completed' | 'pending' | 'overdue';
// }

// function AssignmentCard({ title, status = 'pending' }: AssignmentCardProps) {
//   return (
//     <div className='w-full bg-white rounded-[10px] h-[93px] max-w-[775px] px-[22px] py-5 cursor-pointer'>
//       <div className='flex flex-row items-center justify-between w-full'>
//         <div className='flex flex-row gap-6'>
//           <NextImage
//             width={57}
//             height={54}
//             alt='Assignment Icon'
//             src='/images/sidebar-icons/Assignment.png'
//           />

//           <div className='flex flex-col gap-1'>
//             <div className='text-[#615E83] font-bold text-2xl leading-7'>
//               {title}
//             </div>
//             <div
//               className={clsxm(
//                 status === 'completed' && 'bg-[#08643A]',
//                 status === 'pending' && 'bg-[#E0A03B]',
//                 'flex items-center justify-center w-[109px] h-[24px] rounded text-white text-[10px] font-semibold capitalize'
//               )}
//             >
//               {status}
//             </div>
//           </div>
//         </div>

//         <div>
//           <BiChevronRight className='w-[50px] h-[50px]' />
//         </div>
//       </div>
//     </div>
//   );
// }

export default Page;
