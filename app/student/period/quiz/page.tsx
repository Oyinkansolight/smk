'use client';

import AssignmentQuestionView from '@/components/cards/AssignmentQuestionView';
import { useGetPeriodById } from '@/server/institution/period';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Page = () => {
  const router = useRouter();
  // Get the URL query string
  const queryString = useSearchParams();
  const periodId = queryString?.get('name');

  const { data, isLoading } = useGetPeriodById(periodId ? periodId : '');
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const qadata = {
    typeOfActivity: 'CLASS_WORK',
    format: 'MULTIPLE_CHOICE',
    timeLimit: '40 minutes',
    questionsV2: [
      {
        question: 'Food with protien nutrient',
        options: ['egg', 'rice', 'mango', 'none'],
        correctOption: 0,
        correctText: null,
        id: '0e6b9f0e-b273-42fe-a588-b885e5b04f92',
        createdAt: '2023-09-08T19:08:50.225Z',
        updatedAt: '2023-09-08T19:08:50.225Z',
      },
      {
        question: 'Food with carbohydrate nutrient',
        options: ['egg', 'rice', 'mango', 'none'],
        correctOption: 1,
        correctText: null,
        id: '9299bdac-5cf7-43d1-b10c-567b4cadf3f7',
        createdAt: '2023-09-08T19:08:50.225Z',
        updatedAt: '2023-09-08T19:08:50.225Z',
      },
      {
        question: 'Food with Vitamin-C nutrient',
        options: ['egg', 'rice', 'mango', 'none'],
        correctOption: 2,
        correctText: null,
        id: '976564e5-abea-4bc0-8d9f-78a536b81343',
        createdAt: '2023-09-08T19:08:50.225Z',
        updatedAt: '2023-09-08T19:08:50.225Z',
      },
    ],
    addToGradeList: false,
    dueDate: '2023-06-09T07:48:00',
    teacher: {
      id: '0f01463e-4bc2-4d31-af6e-2260cead6f2b',
      firstName: 'OGIE',
      lastName: 'CATHERINE',
      deviceToken: null,
      batteryLevel: null,
      phoneNumber: '9510278930',
      email: 'jim.parker@xyz.com',
      address: null,
      resetPasswordToken: null,
      resetPasswordTokenExpires: null,
      type: 'DEFAULT',
      loginCount: 95,
      suspended: false,
      createdAt: '2023-07-26T12:34:36.551Z',
      updatedAt: '2023-09-08T18:27:57.501Z',
    },
    lessonNote: null,
    classes: {
      id: '14a4ebbd-5280-4934-a6d2-e371b3cbe594',
      arm: 'A',
      capacity: 20,
      curriculum: 'DEFAULT',
      institutionType: null,
      createdAt: '2023-08-03T09:21:32.772Z',
      updatedAt: '2023-08-28T19:54:13.101Z',
    },
    subject: {
      id: '2133d2a1-8da7-4513-aaba-7a0d04784335',
      name: 'Biology ',
      description: 'All About Body',
      createdBy: null,
      createdAt: '2023-08-02T06:50:29.756Z',
      updatedAt: '2023-08-28T20:36:16.664Z',
    },
    period: {
      id: '1ac06957-4085-42aa-b41e-158c87946f0a',
      title: 'Protein',
      theme: 'Protein',
      subTheme: null,
      instructionalObjective: null,
      teachingMethod: null,
      teachingTheme: null,
      teacherPreparationForLesson: null,
      instructionalMaterial: null,
      lessonProcedure: null,
      startTime: '11:00',
      endTime: '12:00',
      day: 'Friday',
      eventName: null,
      institutionType: 'SECONDARY',
      teacherActivity: null,
      lessonInstructionalObjective: null,
      lessonTopic: null,
      createdAt: '2023-08-18T09:56:30.710Z',
      updatedAt: '2023-09-08T18:40:08.824Z',
      classActivities: [
        {
          id: '0a192873-d600-4624-8e36-e2627e785d40',
          typeOfActivity: 'ASSIGNMENT',
          status: 'PENDING',
          latePenalty: null,
          mode: 'ONLINE',
          format: 'MULTIPLE_CHOICE',
          timeLimit: '40 minutes',
          questions: null,
          dueDate: '2023-06-09T07:48:00.000Z',
          createdAt: '2023-09-08T19:06:20.626Z',
          updatedAt: '2023-09-08T19:06:20.626Z',
          questionsV2: [
            {
              id: 'a446109f-bec0-47e0-8bfe-7ab4d624e7c3',
              question: 'Food with protien nutrient',
              options: ['egg', 'rice', 'mango', 'none'],
              correctOption: 0,
              correctText: null,
              createdAt: '2023-09-08T19:06:20.626Z',
              updatedAt: '2023-09-08T19:06:20.626Z',
            },
            {
              id: '9319afda-5922-47b4-b9b4-d294b0ff1f94',
              question: 'Food with carbohydrate nutrient',
              options: ['egg', 'rice', 'mango', 'none'],
              correctOption: 1,
              correctText: null,
              createdAt: '2023-09-08T19:06:20.626Z',
              updatedAt: '2023-09-08T19:06:20.626Z',
            },
            {
              id: '64260906-6a19-4b9b-b54a-0cd38e27efae',
              question: 'Food with Vitamin-C nutrient',
              options: ['egg', 'rice', 'mango', 'none'],
              correctOption: 2,
              correctText: null,
              createdAt: '2023-09-08T19:06:20.626Z',
              updatedAt: '2023-09-08T19:06:20.626Z',
            },
          ],
        },
      ],
      subject: {
        id: '2133d2a1-8da7-4513-aaba-7a0d04784335',
        name: 'Biology ',
        description: 'All About Body',
        createdBy: null,
        createdAt: '2023-08-02T06:50:29.756Z',
        updatedAt: '2023-08-28T20:36:16.664Z',
      },
      session: {
        id: '8c089e47-ebe2-48ae-843d-9979621d4f69',
        session: 'Academic Year 2023/2024',
        institutionType: 'SECONDARY',
        NumberOfWeeks: 56,
        NumberOfTerms: 3,
        isCurrent: true,
        startDate: '2023-07-20T13:52:06.950Z',
        endDate: '2024-08-15T20:21:28.051Z',
        createdAt: '2023-08-17T11:36:06.766Z',
        updatedAt: '2023-09-08T14:42:35.368Z',
      },
      term: {
        id: 'c42523e7-b0cd-40d4-9833-865fd2fff3e7',
        name: '1',
        noOfWeeks: 12,
        startDate: '2023-07-20T13:52:06.950Z',
        endDate: '2023-10-15T20:21:28.051Z',
        createdAt: '2023-08-17T11:36:06.777Z',
        updatedAt: '2023-08-17T11:36:06.777Z',
      },
    },
    session: {
      id: '8c089e47-ebe2-48ae-843d-9979621d4f69',
      session: 'Academic Year 2023/2024',
      institutionType: 'SECONDARY',
      NumberOfWeeks: 56,
      NumberOfTerms: 3,
      isCurrent: true,
      startDate: '2023-07-20T13:52:06.950Z',
      endDate: '2024-08-15T20:21:28.051Z',
      createdAt: '2023-08-17T11:36:06.766Z',
      updatedAt: '2023-09-08T14:42:35.368Z',
    },
    term: {
      id: 'c42523e7-b0cd-40d4-9833-865fd2fff3e7',
      name: '1',
      noOfWeeks: 12,
      startDate: '2023-07-20T13:52:06.950Z',
      endDate: '2023-10-15T20:21:28.051Z',
      createdAt: '2023-08-17T11:36:06.777Z',
      updatedAt: '2023-08-17T11:36:06.777Z',
    },
    mode: 'ONLINE',
    latePenalty: null,
    questions: null,
    id: 'e65885f0-441a-4727-bf5f-5b12654170cb',
    status: 'PENDING',
    createdAt: '2023-09-08T19:08:50.225Z',
    updatedAt: '2023-09-08T19:08:50.225Z',
  };

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

            <div className='flex flex-col gap-[14px] bg-[#FAFAFA] py-[14px] px-5 rounded-[5px]'>
              <div className='h3'>Pop Quiz</div>
              <div className='flex flex-col gap-[14px]'>
                {qadata.questionsV2.map((item, idx) => (
                  <AssignmentQuestionView
                    key={idx}
                    question={item.question}
                    options={item.options}
                    correctOption={item.correctOption}
                  />
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

export default Page;
