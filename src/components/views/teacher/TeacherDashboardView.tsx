/* eslint-disable @typescript-eslint/no-explicit-any */
import NextImage from '@/components/NextImage';
import { BasicCard } from '@/components/cards';
import GenericLoader from '@/components/layout/Loader';
import EmptyView from '@/components/misc/EmptyView';
import AcademicCalendar from '@/components/views/teacher/AcademicCalendar';
import SmallTeacherCard from '@/components/views/teacher/SmallTeacherCard';
import clsxm from '@/lib/clsxm';
import { getFromLocalStorage, getFromSessionStorage } from '@/lib/helper';
import { useGetProfile } from '@/server/auth';
import { useGetStaffDashboardOverview } from '@/server/dashboard';
import { useGetSenderUnreadMessages } from '@/server/government/communication';
import {
  GetTeacherNextClassParams,
  useGetTeacherNextClass,
} from '@/server/teacher';
import { TeacherNextClass } from '@/types/classes-and-subjects';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
import { BiUser } from 'react-icons/bi';

export default function TeacherDashboardView() {
  const sessionId: string = getFromLocalStorage('currentSessionId') ?? '';
  const term: any = getFromSessionStorage('currentTerm');
  const week: any = getFromSessionStorage('currentWeek');

  const { data: userUnreadMessage, isLoading: userUnreadMessageLoading } =
    useGetSenderUnreadMessages();
  const { data: profileData } = useGetProfile();
  const { data: overviewData } = useGetStaffDashboardOverview();
  const { data: nextClassData, isLoading: isLoadingNextClass } =
    useGetTeacherNextClass({
      day: moment().format('dddd') as GetTeacherNextClassParams['day'],
      sessionId,
      teacherId: profileData?.userInfo?.staff?.id,
      termId: JSON.parse(term)?.id,
      weekId: JSON.parse(week)?.id,
    });
  // const { data: sessionCalendarData } = useGetSessionCalendar(1);

  console.log(userUnreadMessage);

  const isWithinTime = (startTime: string, endTime: string) => {
    const currentTime = moment().format('HH:mm');
    return moment(currentTime, 'HH:mm').isBetween(
      moment(startTime, 'HH:mm'),
      moment(endTime, 'HH:mm')
    );
  };

  return (
    <div className='flex flex-col layout'>
      {profileData?.userInfo?.staff?.managedClassArm && (
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 py-4 px-6 bg-white rounded-lg mt-4 w-full'>
          <SmallTeacherCard
            icon={<BiUser className='h-16 w-16 text-[#008146]' />}
            subtitle='Total Students'
            title={`${overviewData?.Total_Students ?? 0}`}
            className='bg-[#E3FFF5]'
          />
          <SmallTeacherCard
            icon={<BiUser className='h-16 w-16 text-[#7D8FB3]' />}
            subtitle='Present today'
            title={`${overviewData?.Total_Present_Today ?? 0}`}
            className='bg-[#F4F9FF]'
          />
          <SmallTeacherCard
            icon={<BiUser className='h-16 w-16 text-[#D794C8]' />}
            subtitle='Absent today'
            title={`${overviewData?.Total_Absent_Today ?? 0}`}
            className='bg-[#F9F3FF]'
          />
          <SmallTeacherCard
            icon={<BiUser className='h-16 w-16 text-[#D794C8]' />}
            subtitle='Late Students'
            title={`${overviewData?.Total_Late_Today ?? 0}`}
            className='bg-[#FFF3F3]'
          />
        </div>
      )}
      <div className='grid lg:grid-cols-2 gap-10 w-full mt-4'>
        <div className='grid grid-rows-2 gap-6 w-full'>
          <BasicCard className='flex flex-col gap-4 min-w-[476px] !rounded-2xl'>
            <div className='h4'>Next Class</div>
            {isLoadingNextClass && <GenericLoader />}

            {nextClassData &&
              nextClassData?.length > 0 &&
              nextClassData.slice(0, 5).map((nextClass) => {
                // if (!nextClass) return null;

                return (
                  <NextClassCard
                    key={nextClass?.id}
                    nextClass={nextClass}
                    isActive={isWithinTime(
                      nextClass?.startTime ?? '',
                      nextClass?.endTime ?? ''
                    )}
                  />
                );
              })}

            {!nextClassData ||
              (nextClassData?.length === 0 && <EmptyView label='No Data' />)}

            {nextClassData && nextClassData?.length > 0 && (
              <Link href='/teacher/timetable' className='font-bold text-right'>
                See all
              </Link>
            )}
          </BasicCard>

          <BasicCard className='flex flex-col gap-4 min-w-[476px] !rounded-2xl'>
            <div className='relative'>
              <div className='h4'>Unread Messages</div>
              <div className='absolute w-[6px] h-[6px] bg-[#E5002B] rounded-full top-0 ml-40' />
            </div>
            {userUnreadMessage && userUnreadMessageLoading && <GenericLoader />}
            {userUnreadMessage &&
              userUnreadMessage.length > 0 &&
              userUnreadMessage
                .slice(0, 2)
                .map((msg, key) => <MessageCard msg={msg} key={key} />)}

            {userUnreadMessage && userUnreadMessage?.length > 2 && (
              <Link href='/teacher/messages' className='font-bold text-right'>
                See all
              </Link>
            )}
            {userUnreadMessage && userUnreadMessage?.length === 0 && (
              <EmptyView label='No Data' useStandardHeight />
            )}
          </BasicCard>
        </div>

        <BasicCard className='flex flex-col gap-4 min-w-[476px] !rounded-2xl'>
          <div className='h4'>Assignments</div>
          <EmptyView label='No Data' useStandardHeight />
          {/* <AssignmentsCard />
          <AssignmentsCard today isActive />
          <AssignmentsCard />
          <AssignmentsCard />
          <AssignmentsCard />
          <div className='font-bold text-right'>View all</div> */}
        </BasicCard>
      </div>

      <div className='mt-[23px]'>
        <AcademicCalendar sessionCalendarData={[]} />
      </div>
    </div>
  );
}

interface NextClassCardProps {
  isActive?: boolean;
  nextClass: TeacherNextClass;
}

const NextClassCard = ({ isActive = false, nextClass }: NextClassCardProps) => {
  const [active] = useState(isActive);
  return (
    <BasicCard
      className={clsxm(
        active ? '!bg-[#6A2B56] text-[#EFF7F6]' : '!bg-[#EFF7F6]',
        '!rounded-[5px] h-24 !px-4 !py-6'
      )}
    >
      <div className='flex flex-row gap-6'>
        <NextImage
          width={50}
          height={50}
          alt='Stacked Books'
          src='/images/book_stack.png'
          className={clsxm(
            active ? 'ring-white' : 'ring-[#DADEE6]',
            'ring-[0.1px] ring-offset-1 p-1 rounded-full h-fit'
          )}
        />

        <div className='flex flex-row gap-3 items-center'>
          <div className='flex flex-col gap-1'>
            <div className='text-[10px] leading-[12px]'>Subject:</div>
            <div className='text-[10px] leading-[12px]'>Class:</div>
            <div className='text-[10px] leading-[12px]'>Time:</div>
          </div>

          <div className='flex flex-col gap-1'>
            <div className='text-xs font-bold leading-[14px]'>
              {nextClass?.subject?.name}
            </div>
            <div className='text-xs font-bold leading-[14px]'>
              {nextClass?.class?.name}
            </div>
            <div className='text-xs font-bold leading-[14px]'>
              {nextClass?.startTime} - {nextClass?.endTime}
            </div>
          </div>

          <div className='flex gap-3'></div>
        </div>
      </div>
    </BasicCard>
  );
};

const AssignmentsCard = ({ isActive = false, today = false }) => {
  const [active] = useState(isActive);
  return (
    <BasicCard
      className={clsxm(
        active ? 'border !border-[#E5002B] text-[#E5002B]' : 'text-[#746D69]',
        '!rounded-[5px] h-24 !px-4 !py-6 !bg-[#EFF7F6]'
      )}
    >
      <div className='flex flex-row gap-6'>
        <NextImage
          width={50}
          height={50}
          alt='Stacked Books'
          src='/images/book_stack.png'
          className={clsxm(
            active ? 'ring-white' : 'ring-[#DADEE6]',
            'ring-[0.1px] ring-offset-1 p-1 rounded-full h-fit'
          )}
        />

        <div className='flex flex-row gap-3 items-center'>
          <div className='flex flex-col gap-1'>
            <div className='text-[10px] leading-[12px]'>Subject:</div>
            <div className='text-[10px] leading-[12px]'>Class:</div>
            <div className='text-[10px] leading-[12px]'>Time:</div>
          </div>

          <div className='flex flex-col gap-1'>
            <div className='text-xs font-bold leading-[14px]'>Mathematics</div>
            <div className='text-xs font-bold leading-[14px]'>Primary 1A</div>
            <div className='text-xs font-bold leading-[14px]'>
              12:00 PM - 01:00 PM
            </div>
          </div>

          <div className='flex gap-3'></div>
        </div>

        {today ? (
          <div className='text-[#E5002B] ml-6 flex justify-center items-center font-bold'>
            Today
          </div>
        ) : (
          <div className='flex flex-col text-white bg-[#6A2B56] items-center justify-center p-1 rounded-[9px] w-12 h-12 ml-6'>
            <div className='text-[14px]'>Tue</div>
            <div className='font-semibold'>29</div>
          </div>
        )}
      </div>
    </BasicCard>
  );
};

const MessageCard = ({
  msg,
}: {
  msg: {
    messageTitle: string;
    messageBody: string;
    sender: {
      firstName: string;
      lastName: string;
    };
    createdAt: Date;
  };
}) => {
  return (
    <BasicCard
      className={clsxm('!rounded-[5px] h-24 !px-4 !py-6 !bg-[#EFF7F6]')}
    >
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col gap-2'>
          <div className='text-sm leading-[12px] font-bold'>
            <div> {`${msg?.sender.firstName}  ${msg?.sender.lastName}`} </div>
          </div>
          <Link href='/teacher/messages' className='font-medium text-xs'>
            {msg?.messageTitle}
          </Link>
          <div className='text-[10px] leading-[12px]'>
            {msg.messageBody.substring(0, 50)}...
          </div>
        </div>

        <div>{moment(msg.createdAt).add(1, 'h').startOf('hour').fromNow()}</div>
      </div>
    </BasicCard>
  );
};
