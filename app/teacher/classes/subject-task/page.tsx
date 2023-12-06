/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from '@/components/buttons/Button';
import EmptyView from '@/components/misc/EmptyView';
import BasicModal from '@/components/modal/Basic';
import CreateSubjectActivityModal from '@/components/modals/create-subject-activity-modal';
import TakeAttendanceModal from '@/components/modals/take-attendance-modal';
import CustomPDFReader from '@/components/pdfReader/Reader';
import { ACTIVITY_TYPES } from '@/components/views/teacher/create-class-activity-view';
import { getURL } from '@/firebase/init';
import logger from '@/lib/logger';
import { useGetPeriodById } from '@/server/institution/period';
import { LessonNoteObject } from '@/types/institute';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';
import { handleFlutterPDFReader } from '@/lib/helper';
import { useMediaQuery } from 'react-responsive';

export default function Page() {
  const router = useRouter();
  const [url, setUrl] = useState('');

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const params = useSearchParams();
  const id = params?.get('id');
  const classArmId = params?.get('classArmId');
  const classArmName = params?.get('armName');
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

  const backButtonLink = `/teacher/classes/subject?id=${period?.subject?.id}&classArmId=${classArmId}&classId=${period?.class?.id}&armName=${classArmName}`;

  return (
    <div className='layout pl-0 lg:pl-20'>
      <div
        onClick={() => router.push(backButtonLink)}
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
              showContent={isDesktopOrLaptop}
              content={
                <div className='flex items-stretch gap-10'>
                  {period?.file ? (
                    <div className='flex-1 rounded-lg bg-white min-h-[50rem] overflow-hidden'>
                      <div className='flex justify-center'>
                        {url.length > 0 && (
                          <CustomPDFReader url={url} />
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
              <Button
                variant='secondary'
                onClick={() => {
                  if (!isDesktopOrLaptop) {
                    url.length > 0 && handleFlutterPDFReader(url)
                  }
                }}>
                View Scripted Lesson
              </Button>
            </BasicModal>
          </div>
        </div>

        {period?.classActivities && period?.classActivities.length > 0 && (
          <div className='flex flex-wrap gap-[17px] justify-end h-fit self-end mb-4'>
            {period?.classActivities.filter(activity => activity?.typeOfActivity).map((activity) => {
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
                  classArmId={classArmId ?? ""}
                  key={activity.id}
                  period={period}
                  type={activity.typeOfActivity}
                >
                  {parsedActivityName}
                </SideBarItem>
              );
            })}

            {period?.classActivities.filter(activity => !activity?.typeOfActivity).map((activity) => {
              return (
                <SideBarItem
                  period={period}
                  key={activity.id}
                  type="LESSON_NOTE"
                  classArmId={classArmId ?? ""}
                >
                  Lesson Note
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
                period?.file?.fileType === 'video' ? (
                  <video
                    src={url}
                    controls
                    title='Scripted lesson video player'
                    className='w-full h-[60vh] md:h-[70vh] lg:h-[80vh]'
                  ></video>
                ) : (
                  <CustomPDFReader url={url} />
                )
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
  classArmId
}: {
  type: (typeof ACTIVITY_TYPES)[number] | string;
  children: JSX.Element | JSX.Element[] | string;
  period: LessonNoteObject;
  classArmId?: string;
}) {
  if (period?.subject?.id) {
    return (
      <Link
        className='max-h-[38px]'
        href={
          type === 'ASSIGNMENT'
            ? `/teacher/lesson-note/assignment/submissions?subjectId=${period.subject.id}&type=${type}&classArmId=${classArmId}`
            : type === 'CLASS_WORK'
              ? `/teacher/lesson-note/class-work/submissions?subjectId=${period.subject.id}&type=${type}&classArmId=${classArmId}`
              : type === 'LESSON_NOTE'
                ? `/teacher/lesson-note/lesson-notes/submissions?subjectId=${period.subject.id}&type=${type}&classArmId=${classArmId}`
                : type === 'QUIZ'
                  ? `/teacher/lesson-note/pop-quiz/submissions?subjectId=${period.subject.id}&type=${type}&classArmId=${classArmId}`
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
