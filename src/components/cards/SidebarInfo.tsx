/* eslint-disable @typescript-eslint/no-explicit-any */
import BasicCard from '@/components/cards/Basic';
import PrimaryLink from '@/components/links/PrimaryLink';
import clsxm from '@/lib/clsxm';
import { DashboardOverview } from '@/types';
import commaNumber from 'comma-number';
import React from 'react';
import Jpg from '~/svg/jpg.svg';
import Pdf from '~/svg/pdf.svg';
import Xls from '~/svg/xls.svg';
import Zip from '~/svg/zip.svg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons: any = {
  pdf: <Pdf className='h-6 w-6' />,
  jpg: <Jpg className='h-6 w-6' />,
  zip: <Zip className='h-6 w-6' />,
  xls: <Xls className='h-6 w-6' />,
};

const assignmentData = [
  {
    title: 'Multiplication Table',
    type: 'pdf',
    size: '11 MB',
    info: '2 days ago Karina Ojo',
  },
  {
    title: '1.2.3 Counting',
    type: 'jpg',
    size: '11 MB',
    info: '1 day ago Bolanle Banke',
  },
  {
    title: 'Addition',
    type: 'zip',
    size: '11 MB',
    info: '2 days ago Karina Ojo',
  },
  {
    title: 'Subtraction',
    type: 'xls',
    size: '11 MB',
    info: '2 days ago Karina Ojo',
  },
  {
    title: 'Division',
    type: 'pdf',
    size: '11 MB',
    info: '2 days ago Karina Ojo',
  },
];

const randomData = [
  {
    time: '11:32',
    text: 'Ibrahim Logged in early to school.',
  },
  {
    time: '11:21',
    text: 'James sent in his assessment early.',
  },
  {
    time: '10:54',
    text: [
      'Mr. Samson arrived early to class.',
      'Abdulahi logged in late to class.',
    ],
  },
  {
    time: '09:45',
    text: 'Abdulahi logged in late to class.',
  },
  {
    time: '09:45',
    text: 'Jude is currently offline.',
  },
  {
    time: '09:45',
    text: 'Victoria sent in his assessment late.',
  },
  {
    time: '09:45',
    text: 'Mrs. Asamoah arrived at class for a specific reason.',
  },
  {
    time: '10:54',
    text: [
      'Abdulahi logged in late to class.',
      'Mrs. Asamoah arrived at class for a specific reason.',
      'Mr. Samson arrived early to class.',
    ],
  },
];

export const SidebarInfoCardOne = () => {
  return (
    <BasicCard
      className={clsxm(
        'hideScroll max-h-[433px] !w-[320px] !overflow-y-scroll border-2 !px-[22.5px] !pt-[22.5px] !pb-0'
      )}
    >
      <div className='mx-auto flex max-w-[260px] flex-col items-center justify-center gap-y-7'>
        <div className='flex w-full flex-row justify-between'>
          <div className='whitespace-nowrap text-[18px] font-bold text-[#4D5E80]'>
            Recent Actions
          </div>
          <PrimaryLink href='#' className='whitespace-nowrap text-xs'>
            View all
          </PrimaryLink>
        </div>

        <div className='flex w-full items-center justify-center'>
          <ol className='relative border-l border-gray-200 text-gray-500'>
            {randomData.map((data, i) => (
              <React.Fragment key={i}>
                <li className='mb-8 ml-10'>
                  <span className='absolute -left-6 flex h-7 w-[51px] items-center justify-center rounded-full bg-white text-[9px] font-[900] ring-2 ring-gray-300'>
                    {data.time}
                  </span>
                </li>
                {data.text instanceof Array ? (
                  <div
                    className={clsxm(
                      'flex flex-col gap-1 divide-y divide-solid',
                      'ml-10 -mt-2 max-w-[173px] overflow-hidden text-ellipsis whitespace-nowrap text-[10px] font-bold'
                    )}
                  >
                    {data.text.map((text, i) => (
                      <p className={clsxm(i > 0 && 'pt-2')} key={i}>
                        {text}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className='ml-10 -mt-2 max-w-[173px] overflow-hidden text-ellipsis whitespace-nowrap text-[10px] font-bold'>
                    {data.text}
                  </p>
                )}
              </React.Fragment>
            ))}
          </ol>
        </div>
      </div>
    </BasicCard>
  );
};

export const SidebarInfoCardTwo = () => {
  return (
    <BasicCard
      className={clsxm(
        'hideScroll max-h-[433px] !w-[320px] !overflow-y-scroll border-2 !px-[22.5px] !pt-[22.5px] !pb-0'
      )}
    >
      <div className='mx-auto flex max-w-[260px] flex-col items-center justify-center gap-y-7'>
        <div className='flex w-full flex-row justify-between'>
          <div className='whitespace-nowrap text-[18px] font-bold text-[#4D5E80]'>
            Latest Assignment
          </div>
          <PrimaryLink href='#' className='whitespace-nowrap text-xs'>
            View all
          </PrimaryLink>
        </div>

        <div className='flex w-full flex-col justify-center gap-y-6'>
          {assignmentData.map((data, i) => (
            <div className='flex flex-col' key={i}>
              <div className='flex flex-row gap-x-2'>
                <div className='flex h-[24px] w-[24px] items-center justify-center rounded-[4px] bg-[#F2F2F2]'>
                  {icons[data.type]}
                </div>

                <div className='flex flex-col'>
                  <div className='whitespace-nowrap text-[14px] font-semibold text-[#1C1C1C]'>
                    {data.title}
                  </div>

                  <div className='whitespace-nowrap text-[12px] text-opacity-40'>
                    {data.size} / {data.info}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BasicCard>
  );
};

export const SidebarInfoCardThree = () => {
  return (
    <BasicCard
      className={clsxm(
        'hideScroll min-h-[171px] !w-[320px] !overflow-y-scroll border-2 !pb-[18px] !pt-[27px]'
      )}
    >
      <div className='mx-auto flex flex-col justify-center gap-y-7'>
        <div className='flex flex-row justify-between px-[18px]'>
          <div className='text-xs font-bold text-[#6B7A99]'>Total</div>
          <div>
            {/* <LineGraphComponent width={95.5} height={27} /> */}
          </div>
        </div>

        <div className='px-[18px] text-[21px] font-bold text-[#4D5E80]'>0</div>

        <hr className='border-b' />

        <div className='px-[18px] text-right text-[11px] font-bold text-[#6B7A99]'>
          View report
        </div>
      </div>
    </BasicCard>
  );
};

export const AdminSidebarInfoCardOne = () => {
  return (
    <BasicCard
      className={clsxm(
        'hideScroll min-h-[171px] !w-[320px] !overflow-y-scroll border-2 !pb-[18px] !pt-[27px]'
      )}
    >
      <div className='mx-auto flex flex-col justify-center gap-y-7'>
        <div className='flex flex-row justify-between px-[18px]'>
          <div className='text-xs font-bold text-[#6B7A99]'>Total Revenue</div>
          <div>
            {/* <LineGraphComponent width={95.5} height={27} /> */}
          </div>
        </div>

        <div className='px-[18px] text-[21px] font-bold text-[#4D5E80]'>
          ₦{commaNumber(0)}
        </div>

        <hr className='border-b' />

        <div className='px-[18px] text-right text-[11px] font-bold text-[#6B7A99]'>
          View report
        </div>
      </div>
    </BasicCard>
  );
};

export const AdminSidebarInfoCardTwo = () => {
  return (
    <BasicCard
      className={clsxm(
        'hideScroll min-h-[171px] !w-[320px] !overflow-y-scroll border-2 !pb-[18px] !pt-[27px]'
      )}
    >
      <div className='mx-auto flex flex-col justify-center gap-y-7'>
        <div className='flex flex-row justify-between px-[18px]'>
          <div className='text-xs font-bold text-[#6B7A99]'>Total Budget</div>
          <div>
            {/* <LineGraphComponent width={95.5} height={27} /> */}
          </div>
        </div>

        <div className='px-[18px] text-[21px] font-bold text-[#4D5E80]'>
          ₦{commaNumber(0)}
        </div>

        <hr className='border-b' />

        <div className='px-[18px] text-right text-[11px] font-bold text-[#6B7A99]'>
          View report
        </div>
      </div>
    </BasicCard>
  );
};

export const AdminSidebarInfoCardThree = (data: DashboardOverview | any) => {
  return (
    <BasicCard
      className={clsxm(
        'hideScroll min-h-[171px] !w-[320px] !overflow-y-scroll border-2 !pb-[18px] !pt-[27px]'
      )}
    >
      <div className='mx-auto flex flex-col justify-center gap-y-7'>
        <div className='flex flex-row justify-between px-[18px]'>
          <div className='text-xs font-bold text-[#6B7A99]'>Total Staffs</div>
          <div>
            {/* <LineGraphComponent width={95.5} height={27} /> */}
          </div>
        </div>

        <div className='px-[18px] text-[21px] font-bold text-[#4D5E80]'>
          {commaNumber(data?.data?.Total_Staff ?? 0)}
        </div>

        <hr className='border-b' />

        <div className='flex flex-row items-center gap-7'>
          <div className='flex flex-row items-center gap-x-3'>
            <div className='h-[9px] w-[9px] rounded-full bg-[#8833FF80] bg-opacity-50' />
            <div className='text-[10.8px] font-bold text-[#6B7A99]'>
              First Time
            </div>
          </div>

          <div className='flex flex-row items-center gap-x-3'>
            <div className='h-[9px] w-[9px] rounded-full bg-[#FF663380] bg-opacity-50' />
            <div className='text-[10.8px] font-bold text-[#6B7A99]'>
              Returning
            </div>
          </div>
        </div>
      </div>
    </BasicCard>
  );
};
