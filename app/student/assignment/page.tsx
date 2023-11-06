/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import NextImage from '@/components/NextImage';
import AssignmentQuestionView from '@/components/cards/AssignmentQuestionView';
import TaskTimer from '@/components/counter/TaskTimer';
import useCustomEditor from '@/hooks/useEditor';
import {
  extractMinutesFromString,
  getDueDate,
  getFromSessionStorage,
} from '@/lib/helper';
import request, { getErrMsg } from '@/server';
import { useGetAcademicSessions } from '@/server/dashboard';
import { useGetSubjectList } from '@/server/institution';
import { useSubmitActivity } from '@/server/student';
import moment from 'moment';
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsPlay } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import { IoChevronBack } from 'react-icons/io5';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const Page = () => {
  const { data: allSession } = useGetAcademicSessions();
  const { data: allSubject } = useGetSubjectList();
  // const [subjectId, setSubjectId] = useState('');
  const [myPendingAssignment, setMyPendingAssignment] = useState<any>([]);
  const [myCompletedAssignment, setMyCompletedAssignment] = useState<any>([]);
  const [activity, setActivity] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [loadingSubmission, setLoadingSubmission] = useState(false);
  const editor = useCustomEditor();

  const [startActivity, setStartActivity] = useState(false);
  const [currentView, setCurrentView] = useState(0);
  const [answers, setAnswers] = useState<any>([]);
  // const currentTerm = getFromSessionStorage('currentTerm') ?? '';

  const userData = getFromSessionStorage('user');
  // allSubject && setSubjectId(allSubject[0]);

  let user;
  if (userData) {
    user = JSON.parse(userData);
  }

  function handleFetchAssignment(subjectId: string) {
    const params = {
      subjectId,
      name: 'Mathematics',
      typeOfActivity: 'ASSIGNMENT',
      classArmId: user?.currentStudentInfo?.class.id ?? '',
    };
    setLoading(true);
    request
      .get(`v1/institutions/lessons/get-class-activty`, {
        params,
      })
      .then((res) => {
        setLoading(false);

        setMyPendingAssignment(
          res.data.data.data.data.filter(
            (item) =>
              item.typeOfActivity === 'ASSIGNMENT' &&
              item.status.toLowerCase() === 'pending'
          )
        );
        setMyCompletedAssignment(
          res.data.data.data.data.filter(
            (item) =>
              item.typeOfActivity === 'ASSIGNMENT' &&
              item.status.toLowerCase() === 'completed'
          )
        );
      })
      .catch((err) => {
        setLoading(false);
        getErrMsg(err);
      });
  }

  const handleSubmitActivity = useSubmitActivity();

  const submissionData = {
    activityId: activity?.id,
    classArmId: activity?.classes.id,
    answers,
    studentId: user?.currentStudentInfo.id ?? '',
    subjectId: activity?.subject.id,
  };

  async function handleSubmitTask() {
    if (activity.format === 'SUBJECTIVE') {
      const subjectiveAnswer = {
        questionId: answers[0]?.questionId,
        answerText: editor?.getHTML(),
      };
      submissionData.answers = subjectiveAnswer;
    }

    try {
      setLoadingSubmission(true);
      const response = await handleSubmitActivity.mutateAsync(submissionData);

      if (response) {
        toast.success(`Activity Submitted successfully`);
        setLoadingSubmission(false);
      }
    } catch (error) {
      setLoadingSubmission(false);
      toast.error(getErrMsg(error));
    }
  }

  return (
    <div className='flex flex-col w-full px-4 gap-y-10'>
      <div className=''>
        <h1 className='text-xl font-medium mb-3 mt-6'>Assignments</h1>
        <div className='flex justify-end'>
          <div className='flex justify-end   text-gray-500'>
            <select
              name=''
              id=''
              className='p-2 bg-[#FFF6E7] border !text-xs rounded'
            >
              <option value=''> Session & Term</option>
              {(allSession?.data ?? []).map((v: any) => (
                <option key={v.id} value={v.id}>
                  {v.session}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='my-4 flex justify-between items-center border-y py-4 border-black'>
          <div className='w-[250px] h-9 rounded-full border px-3 py-1 flex justify-center items-center'>
            <AiOutlineSearch size={20} />
            <input
              type='text'
              placeholder='Search....'
              className='w-full h-7 !outline-none border-none'
            />
          </div>
          <div className='flex justify-end   text-gray-500'>
            <select
              onChange={(e) => {
                handleFetchAssignment(e.target.value);
                // console.log(e.target.value);
              }}
              name=''
              id=''
              className='p-2 bg-[#FFF6E7] border !text-xs rounded'
            >
              <option value=''>Subject</option>
              {(allSubject ?? []).map((v: any, i: number) => (
                <option key={i} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {currentView === 0 && (
        <div>
          <div className='border border-[#D5D7D8] rounded-md p-3 bg-[#FAFAFA]'>
            <h1 className='text-xl font-medium mb-3'>Pending Assignments</h1>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
              {myPendingAssignment.map((item, i) => (
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
              ))}
              {!loading && myPendingAssignment.length === 0 && (
                <div>No pending assignment currently</div>
              )}
              {loading && (
                <div className='w-full flex justify-center items-center py-20'>
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
          </div>

          <div className='mt-5 border border-[#D5D7D8] rounded-md p-3 bg-[#FAFAFA]'>
            <h1 className='text-xl font-medium mb-3'>Completed Assignments</h1>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
              {myCompletedAssignment.map((item, i) => (
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
                      {item?.subject?.name} - {item.classes.arm}
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
              ))}
              {myCompletedAssignment.length === 0 && (
                <div>No completed assignment currently</div>
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
                    extractMinutesFromString(activity?.timeLimit ?? '30 Mins')
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
                    format={activity.format}
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
                {loadingSubmission ? (
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
  );
};

export default Page;
