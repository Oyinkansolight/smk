/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import TaskAccordion from '@/components/accordions/TaskAccordion';
import CustomPDFReader from '@/components/pdfReader/Reader';
import { SAMPLE_ASSETS } from '@/constant/assets';
import { getURL } from '@/firebase/init';
import { handleFlutterPDFReader } from '@/lib/helper';
import logger from '@/lib/logger';
import {
  useGetPeriodById,
  useGetPeriodLessonById,
} from '@/server/institution/period';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import ReactPlayer from 'react-player';
import { useMediaQuery } from 'react-responsive';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const Page = () => {
  const router = useRouter();
  const queryString = useSearchParams();
  const periodId = queryString?.get('name');

  const { data, isLoading } = useGetPeriodById(periodId ? periodId : '');
  const { data: LessonNote, isLoading: LessonNoteLoading } =
    useGetPeriodLessonById(periodId ? periodId : '');

  const [url, setUrl] = useState<string | any>('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const getFileURL = async () => {
      const path = SAMPLE_ASSETS.SAMPLE_VIDEOS.SCRIPTED_LESSONS.BIOLOGY;
      await getURL(path).then((v) => setVideoUrl(v));
    };
    getFileURL();
  }, [videoUrl]);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let path;
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
    logger(subjectName);
    // settitle(subjectName);
    const getFileURL = async () => {
      const url = await getURL(path);
      setUrl(url);
    };
    getFileURL();
  }, [path, queryString, url]);

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
                <div className='flex flex-col items-center justify-between md:min-w-[260px] w-full bg-[#F9F9F9] rounded border py-3'>
                  <div className='text-[#818181] text-[14px] font-semibold leading-5'>
                    Teacher
                  </div>
                  <div className='flex'>
                    {/* <BigAvatar src='/images/teacher_1.png' /> */}
                    <div className='h4 font-semibold'>
                      {' '}
                      {data?.teacher
                        ? data?.teacher[0]?.user?.firstName
                        : 'No_name'}{' '}
                    </div>
                  </div>
                </div>

                <div className='flex flex-col items-center justify-between md:min-w-[260px] w-full bg-[#F9F9F9] rounded border py-3'>
                  <div className='text-[#818181] text-[14px] font-semibold leading-5'>
                    Attendance Status
                  </div>
                  <div className='h4 font-semibold text-[#9FE2C3]'>Present</div>
                </div>
              </div>
            </div>

            <div className='flex-1 mb-8 rounded-lg bg-white w-full'>
              <div className='w-full'>
                {/* {url.length > 0 ? (
                  <CustomPDFReader url={url} />
                ) : (
                  <video
                    controls
                    title='Scripted lesson video player'
                    className='w-full h-[60vh] md:h-[70vh] lg:h-[80vh]'
                    src={videoUrl}
                  ></video>
                )} */}
                {!LessonNoteLoading &&
                  LessonNote?.data &&
                  LessonNote?.data.map((v: any, i: number) => (
                    <TaskAccordion
                      key={i}
                      taskName={`Lesson Note ${i + 1} - ${v.title}`}
                      onClick={() => {
                        logger(v);
                      }}
                    >
                      <div className='flex flex-wrap mt-4 gap-[27px] px-6'>
                        {v?.uploadUrl ? (
                          <div>
                            {v?.fileType === 'pdf' ? (
                              //Displays Uploaded PDF lessonNote
                              <LessonNoteGenerator noteUrl={v.uploadUrl} />
                            ) : (
                              //Displays additional Media(picture, uploadVid and VideoUrl) Material
                              <LessonMediaGenerator
                                noteUrl={v.uploadUrl}
                                type={v?.fileType}
                              />
                            )}
                          </div>
                        ) : (
                          //Displays handwritten lessonNote
                          <div
                            className='font-bold text-xl'
                            dangerouslySetInnerHTML={{
                              __html: v?.instructionalTeachingActivity,
                            }}
                          />
                        )}
                      </div>
                    </TaskAccordion>
                  ))}
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

function LessonNoteGenerator({ noteUrl }: { noteUrl: string }) {
  const [url, setUrl] = useState<string | any>('');
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });

  let path;
  if (noteUrl) {
    path = noteUrl;
    getURL(path).then((v) => setUrl(v));
  }
  return (
    <div>
      {isDesktopOrLaptop ? (
        <CustomPDFReader url={url} />
      ) : (
        handleFlutterPDFReader(url)
      )}
    </div>
  );
}
function LessonMediaGenerator({
  noteUrl,
  type,
}: {
  noteUrl: string;
  type: string;
}) {
  const [url, setUrl] = useState<string | any>('');

  useEffect(() => {
    //for video or picture filetype, there's need to get them from firebase first then,
    // plug the url in appropriate to html element.
    let path = '';
    if ((noteUrl && type === 'video') || type === 'picture') {
      path = noteUrl;
      getURL(path).then((v) => setUrl(v));
    } else {
      setUrl(noteUrl);
    }
  });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleLoad = (event) => {
    setDimensions({
      width: event.naturalWidth,
      height: event.naturalHeight,
    });
  };

  return (
    <div>
      {url ? (
        <div>
          {type !== 'picture' ? (
            <div
              style={{ position: 'relative', width: '100%', height: 'auto' }}
            >
              <ReactPlayer
                url={url}
                width='80vw'
                height='80vh'
                controls
                config={{
                  youtube: {
                    playerVars: {
                      modestbranding: 1, // Attempt to hide branding
                      rel: 0, // Hide related videos
                      showinfo: 0, // Hide video info
                      iv_load_policy: 3, // Hide annotations
                    },
                  },
                }}
              />
            </div>
          ) : (
            <div
              style={{ position: 'relative', width: '100%', height: 'auto' }}
            >
              <Image
                src={url}
                alt={url}
                layout='responsive'
                width={dimensions.width}
                height={dimensions.height}
                onLoadingComplete={handleLoad}
              />
            </div>
          )}
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
}

export default Page;
