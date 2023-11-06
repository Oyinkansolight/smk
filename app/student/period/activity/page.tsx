/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import NextImage from '@/components/NextImage';
import AssignmentQuestionView from '@/components/cards/AssignmentQuestionView';
import TaskTimer from '@/components/counter/TaskTimer';
import useCustomEditor from '@/hooks/useEditor';
import {
  extractMinutesFromString,
  getDueDate,
  getFromLocalStorage,
  getFromSessionStorage,
} from '@/lib/helper';
import { getErrMsg } from '@/server';
import {
  useGetPeriodActivity,
  useGetPeriodById,
} from '@/server/institution/period';
import { useSubmitActivity } from '@/server/student';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { BsPlay } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import { IoChevronBack } from 'react-icons/io5';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';

export interface answers {
  questionId?: string;
  answerOption?: number;
  answerText?: string;
}
const Page = () => {
  const router = useRouter();
  // Get the URL query string
  const queryString = useSearchParams();
  const userData = getFromSessionStorage('user');
  const [answers, setAnswers] = useState([]);
  const [loading, setloading] = useState(false);
  const [startActivity, setStartActivity] = useState(false);
  const [currentView, setCurrentView] = useState(0);
  const [activity, setActivity] = useState<any>();

  let user;
  if (userData) {
    user = JSON.parse(userData);
  }
  const periodId = queryString?.get('name');
  const activityType = queryString?.get('activityType');
  const currentTerm = getFromSessionStorage('currentTerm') ?? '';
  const currentSessionId = getFromLocalStorage('currentSessionId') ?? '';
  let currentTermInfo;
  if (currentTerm) {
    currentTermInfo = JSON.parse(currentTerm);
  }

  const { data, isLoading } = useGetPeriodById(periodId ? periodId : '');
  const { data: activities } =
    useGetPeriodActivity({
      sessionId: currentSessionId,
      typeOfActivity: activityType,
      periodId,
      termId: currentTermInfo?.id,
    });

  const editor = useCustomEditor();

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleSubmitActivity = useSubmitActivity();

  const submissionData = {
    activityId: activity?.id,
    classArmId: activity?.classes.id,
    answers,
    studentId: user?.currentStudentInfo.id ?? '',
    subjectId: activity?.subject.id,
  };

  async function handleSubmitTask() {
    try {
      setloading(true);
      const response = await handleSubmitActivity.mutateAsync(submissionData);

      if (response) {
        toast.success(`${activityType} Submitted successfully`);
        router.back();
        setloading(false);

        //2 Second - Open Success Modal
      }
    } catch (error) {
      setloading(false);
      toast.error(getErrMsg(error));
    }
  }
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
                    <div className='h4 font-semibold'>
                      {' '}
                      {data?.teacher
                        ? data?.teacher[0]?.user.firstName
                        : 'No_name'}
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

            <div className='flex flex-col gap-[14px] bg-[#FAFAFA] py-[14px] px-5 rounded-[5px]'>
              <div className='h3'>
                {' '}
                {activityType === 'CLASS_WORK' && 'Classwork'}
                {activityType === 'QUIZ' && 'Pop Quiz'}
                {activityType === 'ASSIGNMENT' && 'Assignment'}
              </div>
              <div className='flex flex-col gap-[14px] pb-32'>
                {currentView === 0 && (
                  <div>
                    <div className='border border-[#D5D7D8] rounded-md p-3 bg-[#FAFAFA]'>
                      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
                        {activities && activities?.data.length > 0 ? (
                          activities?.data.map((item, i) => (
                            <div
                              key={i}
                              className='cursor-pointer rounded-xl bg-white border p-3 flex space-x-4'
                              onClick={() => {
                                setActivity(item);
                                setCurrentView(1);
                              }}
                            >
                              <NextImage
                                width={57}
                                height={54}
                                alt='Assignment Icon'
                                src='/images/sidebar-icons/Assignment.png'
                              />
                              <div className='flex-1 flex flex-col'>
                                <p className='text-xs text-blue-500'>
                                  {item?.subject?.name}
                                </p>
                                <p className='text-xs text-[#615E83]'>
                                  Format: {item?.format}
                                </p>
                                <div className='mt-4 text-[10px] flex justify-between items-center'>
                                  <div>
                                    <span>Due Date:</span>
                                    {moment(item?.duedate).format('ll')}
                                  </div>
                                  {getDueDate(item?.dueDate) && (
                                    <div className='rounded bg-[#E5A500] text-white p-1'>
                                      Overdue
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div>No Activity yet</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {currentView === 1 && (
                  <div>
                    <div className='my-4 px-4 flex justify-between items-center'>
                      <button
                        className='bg-gray-200 rounded-md text-lg font-medium px-3 py-2 flex items-center space-x-2'
                        onClick={() => {
                          setCurrentView(0);
                        }}
                      >
                        <IoChevronBack size={20} />
                        <span>Back</span>
                      </button>
                      {!startActivity && (
                        <button
                          className='bg-green-500 rounded-md text-lg text-white font-medium px-3 py-2 flex items-center space-x-2'
                          onClick={() => {
                            setStartActivity(!startActivity);
                          }}
                        >
                          <BsPlay size={20} />
                          <span>Start</span>
                        </button>
                      )}
                      {startActivity && (
                        <TaskTimer
                          timeLimit={
                            Number(
                              extractMinutesFromString(
                                activity?.timeLimit ?? '30 Mins'
                              )
                            ) * 60000
                          }
                        />
                      )}
                      {/* MULTIPLE_CHOICE */}
                    </div>
                    {startActivity && (
                      <div>
                        {activity?.questionsV2?.map((item, idx) => (
                          <div key={idx}>
                            <AssignmentQuestionView
                              question={item.question}
                              options={item.options}
                              correctOption={item.correctOption}
                              answers={answers}
                              setAnswers={setAnswers}
                              qId={item.id}
                              format={activity?.format}
                              editor={editor}
                            />
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            handleSubmitTask();
                          }}
                          className='my-5 w-max mx-auto flex items-center rounded border border-secondary px-6 py-3 text-center text-xs font-medium text-secondary '
                        >
                          {loading ? (
                            <ImSpinner2 className='animate-spin' />
                          ) : (
                            ' Submit Activity'
                          )}
                        </button>
                      </div>
                    )}
                  </div>
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

export default Page;
