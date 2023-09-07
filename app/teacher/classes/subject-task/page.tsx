/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from '@/components/buttons/Button';
import EmptyView from '@/components/misc/EmptyView';
import BasicModal from '@/components/modal/Basic';
import CreateSubjectActivityModal from '@/components/modals/create-subject-activity-modal';
import TakeAttendanceModal from '@/components/modals/take-attendance-modal';
import { ACTIVITY_TYPES } from '@/components/views/teacher/create-class-activity-view';
import { getURL } from '@/firebase/init';
import logger from '@/lib/logger';
import { useGetPeriodById } from '@/server/institution/period';
import { LessonNoteObject } from '@/types/institute';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Page() {
  const [url, setUrl] = useState('');
  const params = useSearchParams();
  const id = params?.get('id');
  const { data: period, isLoading } = useGetPeriodById(id ? id : undefined);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

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

  if (isLoading || typeof window === 'undefined') {
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
        {` > ${period?.subject?.name}`}
      </div>

      <div className='grid grid-cols-2'>
        <div>
          {' '}
          <div className='font-bold py-8 text-xl lg:text-4xl'>
            {`${period?.subject?.name} - ${period?.class?.name}`}
          </div>
          <div className=' text-xl md:text-2xl'>
            <span className='font-bold'>Period: </span>
            <span className='text-[#746D69]'>{`${period?.day} ${period?.startTime} - ${period?.endTime}`}</span>
          </div>
          <div className='flex flex-wrap justify-start my-6 gap-3 whitespace-nowrap'>
            <TakeAttendanceModal>
              <Button variant='secondary'>Take Attendance</Button>
            </TakeAttendanceModal>

            <CreateSubjectActivityModal>
              <Button variant='secondary'>Add Lesson Tasks</Button>
            </CreateSubjectActivityModal>

            <BasicModal
              className='mt-20'
              content={
                <div className='flex items-stretch gap-10'>
                  {period?.file ? (
                    <div className='flex-1 rounded-lg bg-white min-h-[50rem] overflow-hidden'>
                      <div className='flex justify-center'>
                        {url.length > 0 && (
                          <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js'>
                            <div style={{ height: '100vh', width: '90vw' }}>
                              <Viewer
                                fileUrl={url}
                                plugins={[defaultLayoutPluginInstance]}
                              />
                            </div>
                          </Worker>
                        )}
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
              }
            >
              <Button variant='secondary'>View Scripted Lesson</Button>
            </BasicModal>
          </div>
        </div>

        {period?.classActivities && period?.classActivities.length > 0 && (
          <div className='flex flex-wrap gap-[17px] justify-end h-fit self-end mb-4'>
            {period?.classActivities.map((activity) => {
              const parsedActivityName = activity.typeOfActivity.includes('_')
                ? activity.typeOfActivity[0] +
                  activity.typeOfActivity
                    .slice(1)
                    .split('_')
                    .join(' ')
                    .toLowerCase()
                : activity.typeOfActivity[0] +
                    activity.typeOfActivity.slice(1).toLowerCase() ??
                  'Activity Name';
              return (
                <SideBarItem
                  key={activity.id}
                  period={period}
                  type={activity.typeOfActivity}
                >
                  {parsedActivityName}
                </SideBarItem>
              );
            })}
          </div>
        )}
      </div>

      <div className='flex items-stretch gap-10'>
        {period?.file ? (
          <div className='flex-1 mb-8 rounded-lg bg-white min-h-[100vh] overflow-hidden overflow-x-scroll'>
            <div className='flex justify-center'>
              {url.length > 0 && (
                <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js'>
                  <div style={{ height: '100vh', width: '100vw' }}>
                    <Viewer
                      fileUrl={url}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </div>
                </Worker>
              )}
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

function SideBarItem({
  type,
  children,
  period,
}: {
  type: (typeof ACTIVITY_TYPES)[number] | string;
  children: JSX.Element | JSX.Element[] | string;
  period: LessonNoteObject;
}) {
  if (period?.subject?.id) {
    return (
      <Link
        className='max-h-[38px]'
        href={
          type === 'ASSIGNMENT'
            ? `/teacher/lesson-note/assignment/submissions?subjectId=${period.subject.id}&type=${type}`
            : type === 'CLASS_WORK'
            ? `/teacher/lesson-note/class-work/submissions?subjectId=${period.subject.id}&type=${type}`
            : type === 'LESSON_NOTE'
            ? `/teacher/lesson-note/lesson-notes/submissions?subjectId=${period.subject.id}&type=${type}`
            : type === 'QUIZ'
            ? `/teacher/lesson-note/pop-quiz/submissions?subjectId=${period.subject.id}&type=${type}`
            : '#'
        }
      >
        <div className='flex text-xs lg:text-base font-bold whitespace-nowrap items-center rounded-md bg-[#D4D5D7] px-10 py-5 w-auto max-h-[38px] h-full'>
          {children}
        </div>
      </Link>
    );
  }

  return <div></div>;
}
