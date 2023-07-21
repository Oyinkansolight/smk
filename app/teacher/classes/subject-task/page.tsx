'use client';

import Button from '@/components/buttons/Button';
import PageCounter from '@/components/counter/PageCounter';
import EmptyView from '@/components/misc/EmptyView';
import CreateSubjectActivityModal from '@/components/modals/create-subject-activity-modal';
import TakeAttendanceModal from '@/components/modals/take-attendance-modal';
import logger from '@/lib/logger';
import { useGetPeriodById } from '@/server/institution/period';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoAddCircle } from 'react-icons/io5';
import { Page as DocPage, Document, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { getURL } from '@/firebase/init';
import { RotatingLines } from 'react-loader-spinner';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function Page() {
  const [url, setUrl] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const params = useSearchParams();
  const id = params?.get('id');
  const { data: period, isLoading } = useGetPeriodById(
    id ? id : undefined
  );

  useEffect(() => {
    if (period && period?.file?.fileUrl) {
      const getFileURL = async () => {
        const path = period?.file?.fileUrl ?? "";

        await getURL(path).then(
          (v) => setUrl(v)
        );
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
    )
  }

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
            <span className='font-bold'>Period: </span>{`${period?.day} ${period?.startTime} - ${period?.endTime}`}
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
                <DocPage pageNumber={currentPage} renderTextLayer={false} />
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