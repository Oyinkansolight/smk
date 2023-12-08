'use client';

import Result from '@/components/cards/Result';
import EmptyView from '@/components/misc/EmptyView';
import { getFromLocalStorage, getFromSessionStorage } from '@/lib/helper';
import logger from '@/lib/logger';
import { useGetStudentReportCard } from '@/server/student';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Lightupyellow from '~/svg/lightup-yellow.svg';
import Lightup from '~/svg/lightup.svg';
import Lightupblue from '~/svg/lightupblue.svg';

const affective = [
  'Attentiveness',
  'Honesty',
  'Neatness',
  'Politeness',
  'Punctuality',
  'Confidence',
  'Attitude',
];

const psychomotor = [
  'Learning Skills',
  'Handwriting',
  'Spoken English',
  'Reading Skills',
  'Outdoor Games',
  'Vocational Skills',
];
const Page = () => {
  const getDomainValue = (value: string) => {
    const result = data?.domains.find((v) => v.behavior === value);
    console.log(result);
    return result
      ? {
          label: result.remark,
          value: result.rating,
        }
      : null;
  };
  const userData = getFromSessionStorage('user');
  const currentTerm = getFromSessionStorage('currentTerm') ?? '';
  const currentSessionId = getFromLocalStorage('currentSessionId') ?? '';

  let user;
  let currentTermInfo;

  if (userData && currentTerm) {
    user = JSON.parse(userData);
    currentTermInfo = JSON.parse(currentTerm);
  }
  const { data } = useGetStudentReportCard({
    studentId: user?.currentStudentInfo?.id ?? '',
    termId: currentTermInfo?.id ?? '',
    sessionId: currentSessionId,
    classArmId: user?.currentStudentInfo?.class?.id,
  });

  const reportCardURL = `/view-report-card?sessionId=${currentSessionId}&termId=${currentTermInfo?.id}&studentId=${user?.currentStudentInfo?.id}&classArmId=${user?.currentStudentInfo?.class?.id}`;

  return (
    <div className='flex gapx-4 gap-y-10'>
      <div className='w-full px-4'>
        <h1 className='text-lg font-bold'>Grade Book</h1>

        <div className='flex justify-end py-4 border-b-2 mb-5  text-gray-500'>
          <select
            name=''
            id=''
            className='p-2 bg-[#FFF6E7] border !text-xs rounded'
          >
            <option value=''> Session & Term</option>
            <option value=''>2023/2024 First</option>
            <option value=''>2023/2024 Secomd</option>
            <option value=''>2023/2024 Third</option>
          </select>
        </div>
        <div className='flex justify-end p-2  bg-[#F9F9F9] rounded'>
          <Link href={reportCardURL}>
            <button className='bg-[#3361FF] text-white p-1 rounded'>
              Download Report Card
            </button>
          </Link>
        </div>
        <h1 className='my-4 text-[#B1B1B1] font-bold text-lg'>Status</h1>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 p-2 gap-8  bg-[#F9F9F9] rounded '>
          <Result
            Icon={Lightup}
            upperLimit={`${
              data ? data?.agregates?.studentPositionInClass || 'N/A' : 'N/A'
            }`}
            lowerLimit={`${
              data ? data?.agregates?.totalStudents || 'N/A' : 'N/A'
            }`}
            subtitle='Position in class'
          />
          <Result
            Icon={Lightupyellow}
            upperLimit={`${
              data ? data?.agregates?.studentTotalExamScore || 'N/A' : 'N/A'
            }`}
            lowerLimit={`${
              data ? data?.agregates?.classTotalExamScore || 'N/A' : 'N/A'
            }`}
            subtitle='Total Exam Score'
          />
          <Result
            Icon={Lightupblue}
            upperLimit={`${
              data
                ? data?.agregates?.studentAverageExamScore
                  ? data?.agregates?.studentAverageExamScore.toFixed(2)
                  : 'N/A'
                : 'N/A'
            }`}
            subtitle='Average Exam Score'
          />
          <Result
            Icon={Lightup}
            upperLimit={`${
              data ? data?.agregates.studentTotalExamScore || 'N/A' : 'N/A'
            }`}
            subtitle='Average Exam grade'
          />

          <Result
            Icon={Lightupblue}
            upperLimit='0%'
            subtitle='Attendance Rate'
          />
        </div>

        <div className='p-3  bg-[#F9F9F9] rounded '>
          <h1 className='text-lg font-bold my-2'>Subjects Performance</h1>
          <div className='bg-white rounded-lg p-3'>
            <div className='w-full overflow-x-auto '>
              <div className='min-w-[1000px] grid grid-cols-12 mb-4 text-gray-500 text-xs'>
                <div className='col-span-3'>
                  <p className=''>Subjects</p>
                </div>
                <div className='col-span-1 '>
                  {' '}
                  <div className=' '> Assessment 1</div>
                </div>
                <div className='col-span-1'>Assessment 2</div>
                <div className='col-span-1'>Examination</div>
                <div className='col-span-1'>Total</div>
                <div className='col-span-1'>Grade</div>
                <div className='col-span-1'>Position</div>
                <div className='col-span-1'>Remark</div>
              </div>

              {data && data.subjectResults.subjectsGrades.length > 0 ? (
                <div>
                  {data?.subjectResults.subjectsGrades.map((item, idx) => (
                    <div
                      key={idx}
                      className='min-w-[1000px] grid grid-cols-12 mb-4 font-medium text-xs'
                    >
                      <div className='col-span-3'>
                        <p className=''>
                          {item?.subject?.name ?? 'Subject_Name'}
                        </p>
                      </div>
                      <div className='col-span-1'>
                        {' '}
                        {item?.ca1_score ?? 'N/A'}{' '}
                      </div>
                      <div className='col-span-1'>
                        {item?.ca2_score ?? 'N/A'}
                      </div>
                      <div className='col-span-1'>
                        {item?.exams_score ?? 'N/A'}
                      </div>
                      <div className='col-span-1'>{item?.total ?? 'N/A'} </div>
                      <div className='col-span-1'>{item?.grade ?? 'N/A'} </div>
                      <div className='col-span-1 text-secondary-300'>
                        {item?.position ?? 'N/A'}
                      </div>
                      <div className='col-span-1'>{item?.remark ?? 'N/A'}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyView label='No Result Recorded' useStandardHeight />
              )}
            </div>
          </div>

          <h1 className='my-4 text-[#B1B1B1] font-bold text-lg'>Keys</h1>
          <div className='bg-white rounded-lg p-3 flex space-x-5 items-center'>
            <div className='text-[#B1B1B1] '>
              Excellent: 80-100 <span className='text-gray-800'>(A+)</span>
            </div>
            <div className='text-[#B1B1B1] '>
              Very Good: 70-79<span className='text-gray-800'>(A)</span>
            </div>
            <div className='text-[#B1B1B1] '>
              Good: 60-69<span className='text-gray-800'>(B)</span>
            </div>
            <div className='text-[#B1B1B1] '>
              Fair: 50-59<span className='text-gray-800'>(C)</span>
            </div>
            <div className='text-[#B1B1B1] '>
              Poor: 40-49<span className='text-gray-800'>(D)</span>
            </div>
            <div className='text-[#B1B1B1] '>
              Fail: 0-39<span className='text-gray-800'>(E)</span>
            </div>
          </div>

          <h1 className='text-lg font-bold my-2'>Affective Domain</h1>
          <div className='bg-white rounded-lg p-3'>
            <div className='flex justify-between mt-5 mb-6 pr-6'>
              <div className='text-black font-medium'>Behaviour</div>
              <div className='text-black font-medium'>Rating</div>
            </div>
            {affective.map((v, idx) => (
              <div key={idx} className='grid grid-cols-12 gap-4 items-center'>
                <div className='col-span-1'>{v}</div>
                <div className='col-span-10 h-[1px] bg-[#DEDEDE] w-full'></div>
                <div className='col-span-1'>
                  {getDomainValue(v)?.label ?? 'N/A'}
                </div>
              </div>
            ))}
          </div>

          <h1 className='text-lg font-bold my-2'>Psychomotor Domain</h1>
          <div className='bg-white rounded-lg p-3'>
            <div className='flex justify-between mt-5 mb-6 pr-6'>
              <div className='text-black font-medium'>Skills</div>
              <div className='text-black font-medium'>Rating</div>
            </div>

            {psychomotor.map((v, idx) => (
              <div key={idx} className='grid grid-cols-12 gap-4 items-center'>
                <div className='col-span-1'>{v}</div>
                <div className='col-span-10 h-[1px] bg-[#DEDEDE] w-full'></div>
                <div className='col-span-1'>
                  {getDomainValue(v)?.label ?? 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
