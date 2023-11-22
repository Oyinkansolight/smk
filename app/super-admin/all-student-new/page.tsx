/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { BasicSearch } from '@/components/search';
import { INSTITUTION_TYPES } from '@/constant/institution';
import clsxm from '@/lib/clsxm';
import { useGetStudentsList } from '@/server/institution';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Castle from '~/svg/castle.svg';
import NextArrow from '~/svg/nextarrow.svg';
import PrevArrow from '~/svg/prevarrow.svg';
import Student from '~/svg/student.svg';

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

const StudentTransferList = [
  {
    id: '01ba4d90-c480-4f0e-9d73-386b8b73a762',
    from: 'Scaling Heights Institution',
    to: 'Avril College',
    profileImg: null,
    firstName: 'THERESA',
    lastName: 'DIKE  ',
    parentDetails: {
      lga: 'IKPOBA OKHA ',
      name: 'MR AND MRS DIKE',
      email: 't.dike@gmail.com',
      address: '92 SAKPONBA ROAD BENIN CITY',
      phoneNumber: 8038603378,
    },
    lga: 'IKPOBA OKHA ',
    readingProficiency: 'UNSPECIFIED',
    address: '92 SAKPONBA ROAD BENIN CITY',
    parentStatus: null,
    gender: 'FEMALE',
    dob: '40073',
    studentId: 'STD-sQ9g0LFpgP',
    parentOccupation: null,
    instituteLat: null,
    instituteLong: null,
    createdAt: '2023-11-02T11:40:56.589Z',
    updatedAt: '2023-11-02T11:40:56.589Z',
    user: [
      {
        id: 'f9064c2b-adef-491e-8cbc-ca6802533b93',
        firstName: 'THERESA',
        lastName: 'DIKE  ',
        middleName: null,
        deviceToken: null,
        batteryLevel: null,
        phoneNumber: '8038603378',
        email: 't.dike@gmail.com',
        password:
          '$2b$10$nYvmwUSEws1ledlnRQMzYO8LPtbM6GtpAOrhwONnnCjwxXtU2WOQW',
        address: '92 SAKPONBA ROAD BENIN CITY',
        resetPasswordToken: null,
        resetPasswordTokenExpires: null,
        type: 'STUDENT',
        loginCount: 0,
        suspended: false,
        createdAt: '2023-11-02T11:40:56.653Z',
        updatedAt: '2023-11-07T15:45:06.256Z',
      },
    ],
    class: {
      id: '274ed0e5-0776-4173-89f4-a57399579696',
      arm: 'ADVENTUROUS',
      capacity: 50,
      curriculum: 'DEFAULT',
      institutionType: null,
      createdAt: '2023-11-01T12:02:21.988Z',
      updatedAt: '2023-11-01T13:21:53.071Z',
      class: {
        id: 'f9f0b92c-33a8-48c9-8f46-faf9618a7632',
        name: 'SSS 1 - Art',
        startTime: null,
        endTime: null,
        curriculum: 'DEFAULT',
        institutionType: 'Secondary',
        createdAt: '2023-09-12T09:07:56.975Z',
        updatedAt: '2023-09-12T09:07:56.975Z',
        arms: [],
      },
    },
    institution: {
      id: '4e0f3fa4-7289-4013-af0f-9bf81f9c59e1',
      instituteName: 'Imaguero College',
      instituteEmail: 'imaguerocollegesenior@gmail.com',
      email: 'imaguerocollegesenior@gmail.com',
      phone: '8066313665',
      instituteLogo: null,
      zone: 'Edo South',
      instituteType: 'SECONDARY',
      instituteAddress: '94, SAPELE RD, B/C',
      instituteLat: '6.32237',
      instituteLong: '5.62796',
      clockInDistance: null,
      isOnboardingCompleted: true,
      createdAt: '2023-09-12T08:13:37.744Z',
      updatedAt: '2023-10-12T13:51:23.691Z',
    },
    lessonNoteTimeLogs: [],
    classArmId: '274ed0e5-0776-4173-89f4-a57399579696',
  },
  {
    id: '01ba4d90-c480-4f0e-9d73-386b8b73a762',
    from: 'Scaling Heights Institution',
    to: 'Avril College',
    profileImg: null,
    firstName: 'THERESA',
    lastName: 'DIKE  ',
    parentDetails: {
      lga: 'IKPOBA OKHA ',
      name: 'MR AND MRS DIKE',
      email: 't.dike@gmail.com',
      address: '92 SAKPONBA ROAD BENIN CITY',
      phoneNumber: 8038603378,
    },
    lga: 'IKPOBA OKHA ',
    readingProficiency: 'UNSPECIFIED',
    address: '92 SAKPONBA ROAD BENIN CITY',
    parentStatus: null,
    gender: 'FEMALE',
    dob: '40073',
    studentId: 'STD-sQ9g0LFpgP',
    parentOccupation: null,
    instituteLat: null,
    instituteLong: null,
    createdAt: '2023-11-02T11:40:56.589Z',
    updatedAt: '2023-11-02T11:40:56.589Z',
    user: [
      {
        id: 'f9064c2b-adef-491e-8cbc-ca6802533b93',
        firstName: 'THERESA',
        lastName: 'DIKE  ',
        middleName: null,
        deviceToken: null,
        batteryLevel: null,
        phoneNumber: '8038603378',
        email: 't.dike@gmail.com',
        password:
          '$2b$10$nYvmwUSEws1ledlnRQMzYO8LPtbM6GtpAOrhwONnnCjwxXtU2WOQW',
        address: '92 SAKPONBA ROAD BENIN CITY',
        resetPasswordToken: null,
        resetPasswordTokenExpires: null,
        type: 'STUDENT',
        loginCount: 0,
        suspended: false,
        createdAt: '2023-11-02T11:40:56.653Z',
        updatedAt: '2023-11-07T15:45:06.256Z',
      },
    ],
    class: {
      id: '274ed0e5-0776-4173-89f4-a57399579696',
      arm: 'ADVENTUROUS',
      capacity: 50,
      curriculum: 'DEFAULT',
      institutionType: null,
      createdAt: '2023-11-01T12:02:21.988Z',
      updatedAt: '2023-11-01T13:21:53.071Z',
      class: {
        id: 'f9f0b92c-33a8-48c9-8f46-faf9618a7632',
        name: 'SSS 1 - Art',
        startTime: null,
        endTime: null,
        curriculum: 'DEFAULT',
        institutionType: 'Secondary',
        createdAt: '2023-09-12T09:07:56.975Z',
        updatedAt: '2023-09-12T09:07:56.975Z',
        arms: [],
      },
    },
    institution: {
      id: '4e0f3fa4-7289-4013-af0f-9bf81f9c59e1',
      instituteName: 'Imaguero College',
      instituteEmail: 'imaguerocollegesenior@gmail.com',
      email: 'imaguerocollegesenior@gmail.com',
      phone: '8066313665',
      instituteLogo: null,
      zone: 'Edo South',
      instituteType: 'SECONDARY',
      instituteAddress: '94, SAPELE RD, B/C',
      instituteLat: '6.32237',
      instituteLong: '5.62796',
      clockInDistance: null,
      isOnboardingCompleted: true,
      createdAt: '2023-09-12T08:13:37.744Z',
      updatedAt: '2023-10-12T13:51:23.691Z',
    },
    lessonNoteTimeLogs: [],
    classArmId: '274ed0e5-0776-4173-89f4-a57399579696',
  },
];
const AllStudent = () => {
  const [lastName, setLastName] = useState('');
  const [currentTab, setCurrentTab] = useState('regular');
  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    lastName,
  });
  const {
    data: students,
    error,
    isLoading,

    refetch,
  } = useGetStudentsList({ ...pagingData });

  const handleSearch = (value: string) => {
    setLastName(value);
    setPagingData({ ...pagingData, lastName: value });
  };

  useEffect(() => {
    refetch();
  }, [pagingData, refetch]);

  const InstituteTypeCard = ({ type, title, count }) => {
    return (
      <div
        className={clsxm(
          type === 'ECCDE' && 'bg-[#FFFEF5] border-[#FFE664]',
          type === 'Primary' && 'bg-[#FFF8F4] border-[#FFCAAB]',
          type === 'Tertiary' && 'bg-[#F9FFFA] border-[#73ED95]',
          type === 'Secondary' && 'bg-[#FAFDFF] border-[#A4DEFF]',
          'p-4 space-y-2 rounded-lg  border-[0.5px] '
        )}
      >
        <h4
          className={clsxm(
            type === 'ECCDE' && ' text-[#D9B80E]',
            type === 'Primary' && ' text-[#AC4407]',
            type === 'Tertiary' && ' text-[#008F28]',
            type === 'Secondary' && ' text-[#6699B6]',
            'text-sm font-normal '
          )}
        >
          {title}
        </h4>
        <h1 className='text-4xl'>{count}</h1>
      </div>
    );
  };

  return (
    <section className='py-6'>
      <div className='rounded-2xl p-4 bg-[#FFF4DF]'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-4xl'>Student</h1>
            <h2 className='text-[#8C8C8C] text-base font-normal'>
              An overview of all students
            </h2>
          </div>
          <Link
            href='/super-admin/add-school'
            className='w-max h-fit py-3 rounded-3xl border bg-[#5754F7] px-3  text-center text-xs text-white '
          >
            Add Student
          </Link>
        </div>

        <div className='space-y-4 my-4 pt-4'>
          <InstituteTypeCard
            type='ECCDE'
            title='Total ECCDE Students'
            count={0}
          />
          <InstituteTypeCard
            type='Primary'
            title='Total Primary Students'
            count={0}
          />
          <InstituteTypeCard
            type='Secondary'
            title='Total Secondary Students'
            count={0}
          />
          <InstituteTypeCard
            type='Tertiary'
            title='Total Tertiary Students'
            count={0}
          />
        </div>
      </div>
      <div className='flex space-x-2 py-4 mt-8'>
        <button
          onClick={() => {
            setCurrentTab('regular');
          }}
          className={`${currentTab === 'regular'
              ? 'bg-[#5754F7] text-white'
              : 'bg-[#fff] text-gray-500'
            } w-max h-fit py-2 rounded-3xl border  px-3  text-center text-xs `}
        >
          All Student List
        </button>
        <button
          onClick={() => {
            setCurrentTab('transfer');
          }}
          className={`${currentTab === 'transfer'
              ? 'bg-[#5754F7] text-white'
              : 'bg-[#fff] text-gray-500'
            } w-max h-fit py-2 rounded-3xl border  px-3  text-center text-xs `}
        >
          Transfer Student List
        </button>
      </div>
      <div className='rounded-2xl p-4 mt-2 bg-[#FFF]'>
        <div className='flex sm:flex-row flex-col sm:justify-between justify-start sm:items-end'>
          <div className='space-y-3'>
            <h2 className='text-[#8C8C8C] text-base font-normal'>
              List of all the Students in the state
            </h2>
            <BasicSearch />
          </div>
          <div className='flex space-x-2 mt-2 sm:mt-0 pb-4'>
            <button className='bg-black  rounded-lg flex space-x-2 p-2 text-white'>
              <span>Filter by institution</span>
              <span>
                <svg
                  width='17'
                  height='16'
                  viewBox='0 0 17 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M4.2651 5.65967C4.46036 5.44678 4.77694 5.44678 4.97221 5.65967L8.2651 9.25C8.46036 9.4629 8.77694 9.4629 8.97221 9.25L12.2651 5.65968C12.4604 5.44678 12.7769 5.44678 12.9722 5.65968C13.1675 5.87257 13.1675 6.21775 12.9722 6.43065L9.67931 10.021C9.09353 10.6597 8.14378 10.6597 7.55799 10.021L4.2651 6.43065C4.06984 6.21775 4.06984 5.87257 4.2651 5.65967Z'
                    fill='#D9D9D9'
                  />
                </svg>
              </span>
            </button>
            <button className='bg-black  rounded-lg flex space-x-2 p-2 text-white'>
              <span>Filter by location</span>
              <span>
                <svg
                  width='17'
                  height='16'
                  viewBox='0 0 17 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M4.2651 5.65967C4.46036 5.44678 4.77694 5.44678 4.97221 5.65967L8.2651 9.25C8.46036 9.4629 8.77694 9.4629 8.97221 9.25L12.2651 5.65968C12.4604 5.44678 12.7769 5.44678 12.9722 5.65968C13.1675 5.87257 13.1675 6.21775 12.9722 6.43065L9.67931 10.021C9.09353 10.6597 8.14378 10.6597 7.55799 10.021L4.2651 6.43065C4.06984 6.21775 4.06984 5.87257 4.2651 5.65967Z'
                    fill='#D9D9D9'
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div>
          {currentTab === 'transfer' ? (
            <div>
              <div className='space-y-2 mt-4'>
                {StudentTransferList.map((item, idx) => (
                  <InstitutionCard
                    data={item}
                    currentTab={currentTab}
                    key={idx}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div>
              {students?.data && (
                <div className='space-y-2 mt-4'>
                  {students?.data.map((item, idx) => (
                    <InstitutionCard
                      data={item}
                      currentTab={currentTab}
                      key={idx}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className='flex justify-between py-4 border-t mt-5'>
          <div>Page 1 of 30</div>
          <div className='flex space-x-2 items-center'>
            <button className='bg-[#f7f7f7]   shadow-[2px] border px-3 py-1 rounded-3xl font-bold flex items-center space-x-2'>
              {' '}
              <PrevArrow /> <span>Previous</span>
            </button>
            <button className='bg-[#f7f7f7] shadow-[2px] border px-3 py-1 rounded-3xl font-bold flex items-center space-x-2'>
              {' '}
              <span>Next</span> <NextArrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const InstitutionCard = ({ data, currentTab }) => {
  const isECCDE =
    data.institution.instituteType.toLowerCase() ===
    INSTITUTION_TYPES.ECCDE.toLowerCase();
  const isTertiary =
    data.institution.instituteType.toLowerCase() ===
    INSTITUTION_TYPES.TERTIARY.toLowerCase();
  const isSecondary =
    data.institution.instituteType.toLowerCase() ===
    INSTITUTION_TYPES.SECONDARY.toLowerCase();
  const isPrimary =
    data.institution.instituteType.toLowerCase() ===
    INSTITUTION_TYPES.PRIMARY.toLowerCase() ||
    data.institution.instituteType.toLowerCase() === 'basic';

  return (
    <div
      className={clsxm(
        isECCDE && 'bg-[#FFFEF9] border-[#FFE664]',
        isPrimary && 'bg-[#FFF8F4] border-[#FFCAAB]',
        isTertiary && 'bg-[#F9FFFA] border-[#73ED95]',
        isSecondary && 'bg-[#FAFDFF] border-[#A4DEFF]',
        'flex flex-row justify-between border-[0.25px] border-l-2 rounded-lg p-2 h-fit'
      )}
    >
      <div className='text-sm flex flex-col items-start capitalize gap-2 font-medium whitespace-nowrap overflow-hidden'>
        <div className=' text-ellipsis overflow-hidden'>
          {`${data.firstName} ${data.lastName}`}
        </div>
        <div
          className={clsxm(
            isECCDE && 'bg-[#FFE664]',
            isPrimary && 'bg-[#FFCAAB]',
            isTertiary && 'bg-[#73ED95]',
            isSecondary && 'bg-[#6699B6]',
            'flex items-center text-[10px] px-[5px] h-5 font-normal text-white rounded-full capitalize'
          )}
        >
          {data?.institution.instituteType ?? ''}
        </div>

        {currentTab === 'regular' ? (
          <div className='text-xs font-light text-[#8B8B8B] flex space-x-2'>
            <Castle className='h-4 w-4 self-end opacity-50' />
            <span>{data?.institution.instituteName ?? ''}</span>
          </div>
        ) : (
          <div>
            <div className='text-xs font-light text-[#8B8B8B] flex space-x-2'>
              <p>From:</p>
              <Castle className='h-4 w-4 self-end opacity-50' />
              <span>{data?.from ?? ''}</span>
            </div>

            <div className='text-xs font-light text-[#8B8B8B] flex space-x-2'>
              <p>To:</p>
              <Castle className='h-4 w-4 self-end opacity-50' />
              <span>{data?.to ?? ''}</span>
            </div>
          </div>
        )}
        <div className='text-xs font-light text-[#98988E]'>
          Class: <span className='font-medium'>{data?.class?.class?.name}</span>
        </div>
      </div>

      <div className='flex  flex-col-reverse gap-3'>
        <Student className='h-8 w-8 self-end opacity-50' />
      </div>
    </div>
  );
};

export default AllStudent;
