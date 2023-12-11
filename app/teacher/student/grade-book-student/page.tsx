'use client';

import AccordionAlt from '@/components/accordions/AccordionAlt';
import BackButton from '@/components/accordions/BackButton';
import Button from '@/components/buttons/Button';
import Result from '@/components/cards/Result';
import GenericLoader from '@/components/layout/Loader';
import EmptyView from '@/components/misc/EmptyView';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import { useUpdateStudent } from '@/server/government/student';
import { useGetStudentById } from '@/server/institution';
import {
  useGetStudentReportCard,
  useUpdateStudentDomain,
} from '@/server/student';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';
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
// const proficiency = ['POOR', 'EMERGING', 'INTERMEDIATE', 'GOOD', 'UNSPECIFIED'];
const proficiency = [
  { label: 'UNSPECIFIED', value: 'UNSPECIFIED' },
  { label: 'POOR', value: 'POOR' },
  { label: 'EMERGING', value: 'EMERGING' },
  { label: 'INTERMEDIATE', value: 'INTERMEDIATE' },
  { label: 'GOOD', value: 'GOOD' },
];

const rating: { value: number; label: string }[] = [
  { label: 'Excellent', value: 5 },
  { label: 'Very Good', value: 4 },
  { label: 'Good', value: 3 },
  { label: 'Normal', value: 2 },
  { label: 'Fair', value: 1 },
];

export default function Page() {
  // const { data } = useGetProfienciencies();

  const p = useSearchParams();
  const studentId = p?.get('studentid');
  const update = useUpdateStudent();
  const handleUpdateStudentDomain = useUpdateStudentDomain();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: student } = useGetStudentById({ id: studentId });
  const { data: profile } = useGetProfile();

  const { data } = useGetStudentReportCard({
    sessionId: (profile?.currentSession ?? [])[0]?.id,
    termId: profile?.currentTerm?.id,
    classArmId: student?.class.id,
    studentId: studentId ?? undefined,
  });

  // const { data: totalData } = useGetStudentTotalScoreAndTotalAttendance({
  //   sessionId: (profile?.currentSession ?? [])[0]?.id,
  //   termId: profile?.currentTerm?.id,
  //   classArmId: student?.class.id,
  // })

  const updateStudentProficiencyLevel = async (value) => {
    try {
      const response = await update.mutateAsync({
        id: studentId ?? '',
        readingProficiency: value.value,
      });
      response && toast.success('Student reading proficiency updated');
    } catch (error) {
      toast.error(getErrMsg(error));
    }
  };
  const updateStudentDomain = async (
    { value, label }: any,
    type: string,
    behavior: string
  ) => {
    console.log(value);
    try {
      setLoading(true);

      const response = await handleUpdateStudentDomain.mutateAsync({
        behavior,
        rating: value,
        remark: label,
        type,
        sessionId: (profile?.currentSession ?? [])[0]?.id,
        termId: profile?.currentTerm?.id,
        teacherId: profile?.userInfo?.staff?.id,
        studentId: studentId ?? undefined,
      });
      response && toast.success('Student domain updated');
      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast.error(getErrMsg(error));
    }
  };

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

  return (
    <div className='h-full layout flex flex-col gap-6 pl-0 lg:pl-20'>
      <BackButton />
      <div className='text-black font-bold pb-8 mt-2 text-2xl'>Grade Book</div>
      <div className='flex md:flex-row flex-col gap-4'>
        <div className='flex w-max py-8 px-2 flex-row space-x-4 justify-center items-center bg-white rounded-lg'>
          <div className='h-20 rounded-full w-20 bg-slate-300' />
          <div className='text-lg font-bold'>
            <div>
              Name:{' '}
              <span className='text-[#746D69]'>
                {student?.firstName} {student?.lastName}
              </span>
            </div>
            <div>
              Sex: <span className='text-[#746D69]'>{student?.gender}</span>
            </div>
            <div>
              Age:{' '}
              <span className='text-[#746D69]'>
                {student?.dob
                  ? moment().diff(moment(student.dob, 'DD-MM-YYYY'), 'years')
                  : ''}
              </span>
            </div>
            <div>
              Class:{' '}
              <span className='text-[#746D69]'>{student?.class.arm}</span>
            </div>
          </div>
        </div>
        <div className='flex-1' />
        {/* <div className='grid md:grid-cols-2 gap-4'>
          <FlashCard
            title={
              <div>
                1/<span className='text-[#C8C8C8]'>50</span>
              </div>
            }
            subtitle='Position in class'
          />
          <FlashCard
            title={
              <div>
                1/<span className='text-[#C8C8C8]'>50</span>
              </div>
            }
            subtitle='Position in class'
          />
          <FlashCard
            title={
              <div>
                1/<span className='text-[#C8C8C8]'>50</span>
              </div>
            }
            subtitle='Position in class'
          />
          <FlashCard
            title={
              <div>
                1/<span className='text-[#C8C8C8]'>50</span>
              </div>
            }
            subtitle='Position in class'
          />
        </div> */}
      </div>
      <div className='rounded-lg bg-white p-6'>
        <div className='mb-5 font-bold text-xl'>Cognitive Domain</div>
        <div className='bg-[#EFF7F6] p-6 overflow-y-auto w-full'>
          {!data ? (
            <GenericLoader />
          ) : (
            <div>
              <div className='grid sm:grid-cols-2 md:grid-cols-3 p-2 gap-8  bg-[#F9F9F9] rounded '>
                <Result
                  Icon={Lightup}
                  upperLimit={`${
                    data ? data?.agregates.studentPositionInClass : 'N/A'
                  }`}
                  lowerLimit={`${data ? data?.agregates.totalStudents : 'N/A'}`}
                  subtitle='Position in class'
                />
                <Result
                  Icon={Lightupyellow}
                  upperLimit={`${
                    data ? data?.agregates?.studentTotalExamScore : 'N/A'
                  }`}
                  lowerLimit={`${
                    data ? data?.agregates?.classTotalExamScore : 'N/A'
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
                    data ? data?.agregates.studentTotalExamScore : 'N/A'
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
                        {data?.subjectResults.subjectsGrades.map(
                          (item, idx) => (
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
                              <div className='col-span-1'>
                                {item?.total ?? 'N/A'}{' '}
                              </div>
                              <div className='col-span-1'>
                                {item?.grade ?? 'N/A'}{' '}
                              </div>
                              <div className='col-span-1 text-secondary-300'>
                                {item?.position ?? 'N/A'}
                              </div>
                              <div className='col-span-1'>
                                {item?.remark ?? 'N/A'}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <EmptyView label='No Result Recorded' useStandardHeight />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {!data ? (
        <GenericLoader />
      ) : (
        <div className='px-8 pt-8 pb-40 flex flex-col gap-5 bg-white rounded-lg'>
          <AccordionAlt
            titleClassName='bg-[#EFF7F6]'
            title={<div> Reading Proficiency </div>}
            length={500}
          >
            <div className='flex justify-center mt-4'>
              <div className='flex-1 flex flex-col gap-6 max-w-3xl'>
                <h2 className='font-medium'>Proficiency Level</h2>
                <div className='grid  items-center'>
                  <ReactSelect
                    options={proficiency}
                    onChange={updateStudentProficiencyLevel}
                    className='min-w-[20rem]'
                  />
                </div>
              </div>
            </div>
          </AccordionAlt>
          <AccordionAlt
            titleClassName='bg-[#EFF7F6]'
            title={<div>Affective Domain</div>}
            length={500}
          >
            <div className='flex justify-center mt-4'>
              <div className='flex-1 flex flex-col gap-6 max-w-3xl'>
                <div className='grid grid-cols-2 font-bold'>
                  <div>Behavior</div>
                  <div>Rating</div>
                </div>
                {affective.map((v, i) => (
                  <div key={i} className='grid grid-cols-2 items-center'>
                    <div>{v}</div>
                    <ReactSelect
                      className='min-w-[20rem]'
                      onChange={(e) => {
                        updateStudentDomain(e, 'AFFECTIVE', v);
                      }}
                      defaultValue={getDomainValue(v)}
                      options={rating}
                    />
                  </div>
                ))}
              </div>
            </div>
          </AccordionAlt>
          <AccordionAlt
            titleClassName='bg-[#EFF7F6]'
            title={<div>Psychomotor Domain</div>}
            length={420}
          >
            <div className='flex justify-center mt-4'>
              <div className='flex-1 flex flex-col gap-6 max-w-3xl'>
                <div className='grid grid-cols-2 font-bold'>
                  <div>Skills</div>
                  <div>Rating</div>
                </div>
                {psychomotor.map((v, i) => (
                  <div key={i} className='grid grid-cols-2 items-center'>
                    <div>{v}</div>
                    <ReactSelect
                      className='min-w-[20rem]'
                      onChange={(e) => {
                        updateStudentDomain(e, 'PSYCHOMOTOR', v);
                      }}
                      options={rating}
                    />
                  </div>
                ))}
              </div>
            </div>
          </AccordionAlt>
          <AccordionAlt
            titleClassName='bg-[#EFF7F6]'
            title={<div>Comments/Observation</div>}
            length={340}
          >
            <div className='flex flex-col items-center gap-5 pb-10 pt-5'>
              <textarea
                className='h-64 rounded-lg border w-full max-w-3xl'
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                defaultValue={getDomainValue('comment')?.label ?? ' '}
              />
              <div className='flex justify-end w-full mx-auto max-w-3xl'>
                <Button
                  variant='secondary'
                  onClickHandler={() => {
                    const e = {
                      label: comment,
                      value: 5,
                    };
                    updateStudentDomain(e, 'COMMENT', 'comment');
                  }}
                >
                  {loading ? <ImSpinner2 /> : 'Submit'}
                </Button>
              </div>
            </div>
          </AccordionAlt>
        </div>
      )}
    </div>
  );
}

function FlashCard({
  title,
  subtitle,
}: {
  title: JSX.Element;
  subtitle: string;
}) {
  return (
    <div className='flex justify-between items-start p-4 rounded-lg bg-white h-[117px] w-[312px]'>
      <div className=''>
        <div className='text-4xl font-bold'>{title}</div>
        <div className=' font-bold text-[#746D69] text-lg mt-2'>{subtitle}</div>
      </div>
      <div className='rounded-full bg-[#F3F4FB] p-4'>
        <FiTrendingUp className='h-6 w-6' />
      </div>
    </div>
  );
}
