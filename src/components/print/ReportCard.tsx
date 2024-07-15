/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import BackButton from '@/components/accordions/BackButton';
import Button from '@/components/buttons/Button';
import EmptyView from '@/components/misc/EmptyView';
import clsxm from '@/lib/clsxm';
import { getFromLocalStorage, getFromSessionStorage } from '@/lib/helper';
import { useGetProfile } from '@/server/auth';
import {
  Agregates,
  StudentResult,
  SubjectResults,
  Term,
} from '@/types/classes-and-subjects';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';

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
const PrintedReportCard = ({
  domains,
  subjectResults,
  agregates,
  attendanceReport,
  termInfo,
}: {
  domains: any[] | undefined;
  subjectResults: SubjectResults | undefined;
  agregates: Agregates | undefined;
  attendanceReport: StudentResult['attendanceReport'] | undefined;
  termInfo: Term;
}) => {
  const handlePrint = () => {
    window.print();
  };
  const { data: studentProfile } = useGetProfile();

  const userData = getFromSessionStorage('user');
  // const term = getFromSessionStorage('currentTerm');
  const session = getFromLocalStorage('currentSession');
  let user;
  // let termInfo;
  let sessionInfo;

  if (userData) {
    user = JSON.parse(userData);
    // termInfo = JSON.parse(term ?? '{}');
    sessionInfo = JSON.parse(session ?? '{}');
  }

  return (
    <div className='flex flex-col py-10 max-w-[750px] mx-auto gap-8'>
      <div className='print:hidden flex items-center justify-between'>
        <BackButton />
        <Button onClick={handlePrint}>Print Report</Button>
      </div>

      {/* PRINTED SECTION */}
      <div className='bg-white flex flex-col w-full max-w-[750px] mx-auto h-full overflow-hidden px-[6px]'>
        <Header
          term={
            termInfo?.currentTerm.name === '1'
              ? 'First'
              : termInfo?.currentTerm.name === '2'
              ? 'Second'
              : 'Third'
          }
          session={sessionInfo[0]?.session ?? 'N/A'}
          name={user?.currentStudentInfo?.institution?.instituteName ?? 'N/A'}
          address={
            user?.currentStudentInfo?.institution?.instituteAddress ?? 'N/A'
          }
          email={user?.currentStudentInfo?.institution?.instituteEmail ?? 'N/A'}
        />

        <span className='mt-[3px] mb-1'>
          <BioData
            user={user}
            agregates={agregates}
            attendanceReport={attendanceReport}
          />
        </span>

        <div className='grid grid-cols-2 grid-flow-col gap-[6px]'>
          <div className='flex flex-col col-span-9 w-full min-w-[434px]'>
            <Cognitive subjectResults={subjectResults} />
            <CommentObservation domains={domains} />
            <CognitiveKeys termInfo={termInfo} user={studentProfile} />
          </div>

          <div className='flex flex-col col-span-3 w-full gap-[6px]'>
            <AffectiveDomain domains={domains} />
            <PsychomotorDomain domains={domains} />
            <Overview subjectResults={subjectResults} agregates={agregates} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface HeaderProps {
  term: string;
  logo?: string;
  name?: string;
  address?: string;
  session: string;
  passport?: string;
  email?: string;
}

interface RowItemProps {
  title: string;
  value: string | number;
  capitalizeValue?: boolean;
}

const Header = (props: HeaderProps) => {
  const PlaceholderImage = ({ title }) => {
    return (
      <div className='w-[85px] h-[85px] rounded-lg bg-gray-200 flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center '>
          <Image
            alt='Logo'
            width={70}
            height={70}
            src='/images/SSEB_LOGO.png'
            className='rounded-lg'
          />
          {/* <span className='font-medium text-[7px] -mt-1'>{title}</span> */}
        </div>
      </div>
    );
  };

  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-[10px]'>
        {props?.name ? (
          <Image
            alt='Logo'
            width={85}
            height={85}
            src='/images/SSEB_LOGO.png'
            className='rounded-lg'
          />
        ) : (
          <PlaceholderImage title='Logo' />
        )}
      </div>

      <div className='grid grid-rows-4 items-center text-center justify-center max-h-[85px]'>
        <span className='font-extrabold text-4 leading-4'>
          {props?.name ?? 'N/A'}
        </span>

        <span className='font-bold text-[10px]'>{props?.address ?? 'N/A'}</span>

        <span className='font-bold text-[10px] mt-[6px]'>
          {props?.email ?? 'N/A'}
        </span>

        <span className='font-bold text-[10px]'>SSEB.EDOSTATE.GOV.NG</span>

        <span className='font-medium text-[13px] mt-[6px]'>
          {props?.term ?? 'N/A'} Term Report Sheet for {props?.session ?? 'N/A'}
          Session
        </span>
      </div>

      <div className='flex items-center gap-[10px]'>
        {props.passport ? (
          <Image
            alt='Logo'
            width={85}
            height={85}
            src={props.passport}
            className='rounded-lg'
          />
        ) : (
          <div>
            {
              // <PlaceholderImage title='Student Passport' />
            }
          </div>
        )}
      </div>
    </div>
  );
};

const RowItem = ({ title, value, capitalizeValue }: RowItemProps) => (
  <div className='flex flex-row justify-between items-center'>
    <div className='uppercase font-semibold text-[7px] leading-3'>{title}</div>
    <div
      className={clsxm('text-[10px] leading-3', capitalizeValue && 'uppercase')}
    >
      {value}
    </div>
  </div>
);

const BioData = ({
  user,
  agregates,
  attendanceReport,
}: {
  user: any;
  agregates: Agregates | undefined;
  attendanceReport: StudentResult['attendanceReport'] | undefined;
}) => {
  return (
    <div className='table rounded-[2px] border-2 border-black w-full'>
      <tr>
        <th>
          <div className='flex flex-col gap-[2px] w-full p-[6px]'>
            <RowItem title='Name' value={user?.name ?? 'N/A'} />
            <RowItem
              title='Sex'
              value={user?.currentStudentInfo?.gender ?? 'N/A'}
            />
            <RowItem
              title='Class'
              value={user?.currentStudentInfo?.class?.class?.name ?? 'N/A'}
              capitalizeValue
            />
            <RowItem
              title='Reg No'
              value={user?.currentStudentInfo?.uniqueId ?? 'N/A'}
              capitalizeValue
            />
          </div>
        </th>

        <th className='border-x-2 border-black'>
          <div className='flex flex-col gap-[2px] w-full p-[6px]'>
            <RowItem
              title='CLASS POPULATION'
              value={agregates?.totalStudents ?? 'N/A'}
            />
            <RowItem
              title='MARKS OBTAINABLE'
              value={agregates?.classTotalExamScore ?? 'N/A'}
            />
            <RowItem
              title='MARKS OBTAINED'
              value={agregates?.studentTotalExamScore ?? 'N/A'}
            />
            <RowItem
              title='STUDENT AVERAGE'
              value={`${
                agregates?.classTotalExamScore &&
                agregates?.studentTotalExamScore
                  ? (agregates.classTotalExamScore /
                      agregates.studentTotalExamScore) *
                    100
                  : 'N/A'
              }%`}
            />
          </div>
        </th>

        <th>
          <div className='flex flex-col gap-[2px] w-full p-[6px]'>
            <RowItem
              title='NO OF TIMES SCHOOL OPENED'
              value={attendanceReport?.totalClassOpened ?? 'N/A'}
            />
            <RowItem
              title='NO OF TIMES PRESENT'
              value={attendanceReport?.PRESENT ?? 'N/A'}
            />
            <RowItem
              title='NO OF TIMES ABSENT'
              value={attendanceReport?.ABSENT ?? 'N/A'}
            />
            <RowItem
              title='ATTENDANCE AVERAGE'
              value={`${attendanceReport?.average}%` ?? 'N/A'}
            />
          </div>
        </th>
      </tr>
    </div>
  );
};

const Cognitive = ({ subjectResults }: any) => {
  return (
    <div className='table rounded-[2px] border-2 border-black w-full'>
      <thead>
        <tr>
          <td className='border-r-2 border-b-2 border-black p-1'>
            <div className='flex items-center gap-1'>
              <Image alt='Logo' width={10} height={10} src='/images/cube.png' />
              <span className='font-extrabold text-[10px] whitespace-nowrap'>
                COGNITIVE DOMAIN
              </span>
            </div>
          </td>
          <td className='border-r-2 border-b-2 border-black p-1'></td>
          <td className='border-r-2 border-b-2 border-black p-1'></td>
          <td className='border-r-2 border-b-2 border-black p-1'></td>
          {/* <td className='border-r-2 border-b-2 border-black p-1'></td>
          <td className='border-r-2 border-b-2 border-black p-1'></td> */}
          <td className='border-r-2 border-b-2 border-black p-1'></td>
          <td className='border-r-2 border-b-2 border-black p-1'></td>
          <td className='border-r-2 border-b-2 border-black p-1'></td>
          <td className='border-b-2 border-black p-1'></td>
        </tr>
      </thead>

      <tbody>
        <tr className='h-32'>
          <td
            rowSpan={6}
            className='relative text-[10px] font-extrabold border-r-2 border-b-2 border-black p-1'
          >
            <div className='absolute bottom-[7px] flex justify-start w-full whitespace-nowrap'>
              SUBJECTS
            </div>
          </td>
          <td
            rowSpan={1}
            className='relative max-w-[30px] border-r-2 border-b-2 border-black p-1'
          >
            <div className='absolute text-[7px] left-0 bottom-[7px] flex transform -rotate-90 justify-start w-full whitespace-nowrap'>
              CA 1 (15%)
            </div>
          </td>

          <td
            rowSpan={1}
            className='relative max-w-[30px] border-r-2 border-b-2 border-black p-1'
          >
            <div className='absolute text-[7px] left-0 bottom-[7px] flex transform -rotate-90 justify-start w-full whitespace-nowrap'>
              CA 2 (15%)
            </div>
          </td>

          <td
            rowSpan={1}
            className='relative max-w-[30px] border-r-2 border-b-2 border-black p-1'
          >
            <div className='absolute text-[7px] left-0 bottom-[7px] flex transform -rotate-90 justify-start w-full whitespace-nowrap'>
              EXAM (70%)
            </div>
          </td>

          <td
            rowSpan={1}
            className='relative max-w-[30px] border-r-2 border-b-2 border-black p-1'
          >
            <div className='absolute text-[7px] left-0 bottom-[7px] flex transform -rotate-90 justify-start w-full whitespace-nowrap'>
              TOTAL (100%)
            </div>
          </td>

          {/* <td
            rowSpan={1}
            className='relative max-w-[30px] border-r-2 border-b-2 border-black p-1'
          >
            <div className='absolute text-[7px] left-0 bottom-[7px] flex transform -rotate-90 justify-start w-full whitespace-nowrap'>
              HIGHEST CLASS SCORE
            </div>
          </td>

          <td
            rowSpan={1}
            className='relative max-w-[30px] border-r-2 border-b-2 border-black p-1'
          >
            <div className='absolute text-[7px] left-0 bottom-[7px] flex transform -rotate-90 justify-start w-full whitespace-nowrap'>
              LOWEST CLASS SCORE
            </div>
          </td> */}

          <td
            rowSpan={1}
            className='relative max-w-[30px] border-r-2 border-b-2 border-black p-1'
          >
            <div className='absolute text-[7px] left-0 bottom-[7px] flex transform -rotate-90 justify-start w-full whitespace-nowrap'>
              SUBJECT POSITION
            </div>
          </td>

          <td
            rowSpan={1}
            className='relative max-w-[30px] border-r-2 border-b-2 border-black p-1'
          >
            <div className='absolute text-[7px] left-0 bottom-5\ flex transform -rotate-90 justify-start w-full whitespace-nowrap'>
              GRADE
            </div>
          </td>

          <td
            rowSpan={1}
            className='relative text-[10px] font-extrabold border-b-2 border-black p-1 w-[55px]'
          >
            <div className='absolute bottom-[7px] flex justify-start w-full whitespace-nowrap'>
              REMARK
            </div>
          </td>
        </tr>
      </tbody>

      <tbody className='text-[10px] font-black leading-3 text-[#3222EF]'>
        {subjectResults && subjectResults.subjectsGrades.length > 0 ? (
          subjectResults.subjectsGrades.map((result, i) => (
            <tr key={i}>
              <td
                className={clsxm(
                  i !== 8 && 'border-b-2',
                  'border-r-2 border-black p-1 font-semibold text-black'
                )}
              >
                {result?.subject?.name ?? 'Subject Name'}
              </td>
              <td
                className={clsxm(
                  i !== 8 && 'border-b-2',
                  'border-r-2 border-black p-1'
                )}
              >
                {result?.ca1_score ?? 'N/A'}
              </td>
              <td
                className={clsxm(
                  i !== 8 && 'border-b-2',
                  'border-r-2 border-black p-1'
                )}
              >
                {result?.ca2_score ?? 'N/A'}
              </td>
              <td
                className={clsxm(
                  i !== 8 && 'border-b-2',
                  'border-r-2 border-black p-1'
                )}
              >
                {result?.exams_score ?? 'N/A'}
              </td>
              <td
                className={clsxm(
                  i !== 8 && 'border-b-2',
                  'border-r-2 border-black p-1'
                )}
              >
                {result?.total ?? 'N/A'}
              </td>
              {/* <td
                className={clsxm(
                  i !== 8 && 'border-b-2',
                  'border-r-2 border-black p-1'
                )}
              >
                N/A
              </td>
              <td
                className={clsxm(
                  i !== 8 && 'border-b-2',
                  'border-r-2 border-black p-1'
                )}
              >
                N/A
              </td> */}
              <td
                className={clsxm(
                  i !== 8 && 'border-b-2',
                  'border-r-2 border-black p-1'
                )}
              >
                {result?.grade ?? 'N/A'}
              </td>
              <td
                className={clsxm(
                  i !== 8 && 'border-b-2',
                  'border-r-2 border-black p-1'
                )}
              >
                {result?.position ?? 'N/A'}
              </td>
              <td
                className={clsxm(
                  i !== 8 && 'border-b-2',
                  'border-black p-1 font-bold leading-[10px] text-black'
                )}
              >
                {result?.remark ?? 'N/A'}
              </td>
            </tr>
          ))
        ) : (
          <tr className=' w-full'>
            <div className=' ml-20 w-full'>
              <EmptyView label='No Result Recorded Yet' useStandardHeight />
            </div>
          </tr>
        )}
      </tbody>
    </div>
  );
};

const CommentObservation = ({ user, domains }: any) => {
  const getDomainValue = (value: string) => {
    const result = domains && domains.find((v) => v.behavior === value);
    return result
      ? {
          label: result.remark,
          value: result.rating,
        }
      : null;
  };

  return (
    <div className='table rounded-[2px] border-2 border-black w-full mt-[5px]'>
      <thead>
        <tr>
          <th className='border-b-2 border-black p-1'>
            <div className='flex items-center gap-1'>
              <Image alt='Logo' width={10} height={10} src='/images/cube.png' />
              <span className='font-extrabold text-[10px] whitespace-nowrap'>
                COMMENT / OBSERVATION
              </span>
            </div>
          </th>
        </tr>
      </thead>

      <div className='flex flex-col gap-1 p-1'>
        <div className='uppercase text-[9px] font-bold leading-[10px]'></div>
        {getDomainValue('comment')?.label ?? 'N/A'}
      </div>
    </div>
  );
};

const CognitiveKeys = ({ termInfo, user }: { termInfo: Term; user: any }) => {
  return (
    <div className='flex flex-row mt-[6px] gap-4'>
      <div className='table rounded-[2px] border-2 border-black w-full min-w-[215px]'>
        <div className='flex items-center gap-1 border-b-2 border-black p-1'>
          <Image alt='Logo' width={10} height={10} src='/images/cube.png' />
          <span className='font-extrabold text-[10px] whitespace-nowrap'>
            COGNITIVE DOMAIN
          </span>
        </div>

        <div className='flex flex-wrap uppercase font-bold text-[9px] leading-[10px] p-1 whitespace-break-spaces'>
          <div>excellent: 80-100: A+, </div>
          <div>very good: 70-79: A, </div>
          <div>good: 60-69: B, </div>
          <div>fair: 50-59: C, </div>
          <div>poor: 40-49: D, </div>
          <div>fail: 0-39: F </div>
        </div>

        <div className='flex items-center gap-1 border-y-2 border-black p-1'>
          <Image alt='Logo' width={10} height={10} src='/images/cube.png' />
          <span className='font-extrabold text-[10px] whitespace-nowrap uppercase'>
            affective/psychomotor keys
          </span>
        </div>

        <div className='flex flex-wrap uppercase font-bold text-[9px] leading-[10px] p-1 whitespace-break-spaces'>
          <div>excellent: 5, </div>
          <div>very good: 4, </div>
          <div>good: 3, </div>
          <div>normal: 1, </div>
          <div>fair: 2, </div>
          <div>
            no tick: <span className='lowercase'>not recorded</span>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-[13px] rounded-[2px] border-2 border-black w-full p-[9px] uppercase font-bold text-[8px] leading-[10px] h-[98px]'>
        <div className='flex flex-row justify-between items-center'>
          <div>principal:</div>
          <div>
            {`${
              user?.userInfo?.student?.institution?.principal?.firstName ??
              'N/A'
            } ${
              user?.userInfo?.student?.institution?.principal?.lastName ?? 'N/A'
            }`}
          </div>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <div>signature:</div>
          <div>
            <Image
              alt='Logo'
              width={75}
              height={10}
              src='/images/principal_signature.png'
            />
          </div>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <div>this term ends:</div>
          <div>{moment(termInfo?.currentTerm?.endDate).format('ll')}</div>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <div>next term begins:</div>
          <div>{moment(termInfo?.nextTerm?.startDate).format('ll')}</div>
        </div>
      </div>
    </div>
  );
};

//*Sub-component of AffectiveDomain and PsychomotorDomain
const SingleDomain = ({ title, value, domains, noBottomBorder = false }) => {
  const getDomainValue = (value: string) => {
    const result = domains && domains.find((v) => v.behavior === value);

    return result
      ? {
          label: result.remark,
          value: result.rating,
        }
      : null;
  };
  return (
    <tr>
      <td
        className={clsxm(
          noBottomBorder ? '' : 'border-b-2',
          'border-r-2 border-black p-1 font-semibold text-black'
        )}
      >
        {title}
      </td>
      <td
        className={clsxm(
          noBottomBorder ? '' : 'border-b-2',
          'border-r-2 border-black p-1'
        )}
      >
        {getDomainValue(title)?.value === 5 && (
          <Image
            alt='Logo'
            width={11}
            height={11}
            src='/images/check_mark.png'
          />
        )}
      </td>
      <td
        className={clsxm(
          noBottomBorder ? '' : 'border-b-2',
          'border-r-2 border-black p-1'
        )}
      >
        {getDomainValue(title)?.value === 4 && (
          <Image
            alt='Logo'
            width={11}
            height={11}
            src='/images/check_mark.png'
          />
        )}
      </td>
      <td
        className={clsxm(
          noBottomBorder ? '' : 'border-b-2',
          'border-r-2 border-black p-1'
        )}
      >
        {getDomainValue(title)?.value === 3 && (
          <Image
            alt='Logo'
            width={11}
            height={11}
            src='/images/check_mark.png'
          />
        )}
      </td>
      <td
        className={clsxm(
          noBottomBorder ? '' : 'border-b-2',
          'border-r-2 border-black p-1'
        )}
      >
        {getDomainValue(title)?.value === 2 && (
          <Image
            alt='Logo'
            width={11}
            height={11}
            src='/images/check_mark.png'
          />
        )}
      </td>
      <td
        className={clsxm(
          noBottomBorder ? '' : 'border-b-2',
          'border-black p-1'
        )}
      >
        {getDomainValue(title)?.value === 1 && (
          <Image
            alt='Logo'
            width={11}
            height={11}
            src='/images/check_mark.png'
          />
        )}
      </td>
    </tr>
  );
};
const AffectiveDomain = ({ domains }: any) => {
  return (
    <div className='table rounded-[2px] border-2 border-black w-full'>
      <thead>
        <tr>
          <th className='p-1'>
            <div className='flex items-center gap-1'>
              <Image alt='Logo' width={10} height={10} src='/images/cube.png' />
              <span className='font-extrabold text-[10px] whitespace-nowrap leading-3'>
                AFFECTIVE DOMAIN
              </span>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className=''>
          <td className='relative text-[10px] font-extrabold border-r-2 border-t-2 border-b-2 border-black p-1'>
            BEHAVIORS
          </td>

          <td className='relative max-w-[18px] border-r-2 border-b-2 border-t-2 border-black p-1'>
            5
          </td>

          <td className='relative max-w-[18px] border-r-2 border-b-2 border-t-2 border-black p-1'>
            4
          </td>

          <td className='relative max-w-[18px] border-r-2 border-b-2 border-t-2 border-black p-1'>
            3
          </td>

          <td className='relative max-w-[18px] border-r-2 border-b-2 border-t-2 border-black p-1'>
            2
          </td>

          <td className='relative max-w-[18px] border-b-2 border-t-2 border-black p-1'>
            1
          </td>
        </tr>
      </tbody>

      <tbody className='text-[10px] font-black leading-3 text-[#3222EF]'>
        {affective.map((item, key) => (
          <SingleDomain
            domains={domains}
            key={key}
            title={item}
            value='5'
            noBottomBorder={affective.length - 1 === key}
          />
        ))}
      </tbody>
    </div>
  );
};

const PsychomotorDomain = ({ domains }: any) => {
  return (
    <div className='table rounded-[2px] border-2 border-black w-full'>
      <thead>
        <tr>
          <th className='p-1'>
            <div className='flex items-center gap-1'>
              <Image alt='Logo' width={10} height={10} src='/images/cube.png' />
              <span className='font-extrabold text-[10px] whitespace-nowrap leading-3'>
                PSYCHOMOTOR DOMAIN
              </span>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className=''>
          <td className='relative text-[10px] font-extrabold border-r-2 border-t-2 border-b-2 border-black p-1'>
            SKILLS
          </td>

          <td className='relative max-w-[18px] border-r-2 border-b-2 border-t-2 border-black p-1'>
            5
          </td>

          <td className='relative max-w-[18px] border-r-2 border-b-2 border-t-2 border-black p-1'>
            4
          </td>

          <td className='relative max-w-[18px] border-r-2 border-b-2 border-t-2 border-black p-1'>
            3
          </td>

          <td className='relative max-w-[18px] border-r-2 border-b-2 border-t-2 border-black p-1'>
            2
          </td>

          <td className='relative max-w-[18px] border-b-2 border-t-2 border-black p-1'>
            1
          </td>
        </tr>
      </tbody>

      <tbody className='text-[10px] font-black leading-3 text-[#3222EF]'>
        {psychomotor.map((item, key) => (
          <SingleDomain
            domains={domains}
            key={key}
            title={item}
            value='5'
            noBottomBorder={psychomotor.length - 1 === key}
          />
        ))}
      </tbody>
    </div>
  );
};

const Overview = ({
  subjectResults,
  agregates,
}: {
  subjectResults: SubjectResults | undefined;
  agregates: Agregates | undefined;
}) => {
  const SingleItem = ({ title, value }) => (
    <div className='flex flex-col gap-1 p-[6px]'>
      <div className='text-[7px] uppercase font-bold leading-[9px]'>
        {title}
      </div>
      <div className='text-[12px] font-bold text-[#2E9CF5] leading-[14px]'>
        {value}
      </div>
    </div>
  );

  return (
    <div className='rounded-[2px] border-2 border-black w-full p-[5px] divide-black divide-y-2 gap-[6px]'>
      <SingleItem
        title='total score:'
        value={agregates?.studentTotalExamScore ?? 'N/A'}
      />
      <SingleItem
        title='position in class:'
        value={`${subjectResults && (subjectResults?.classPosition ?? 'N/A')}`}
      />
      <SingleItem
        title='passes/failed:'
        value={`${agregates?.noOfSubjectsPassed ?? 'N/A'}/${
          agregates?.noOfSubjectsFailed ?? 'N/A'
        }`}
      />
    </div>
  );
};

export default PrintedReportCard;
