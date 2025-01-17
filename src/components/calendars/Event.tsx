import { BasicCard } from '@/components/cards';
import clsxm from '@/lib/clsxm';
import React from 'react';

interface EventCalendarProps {
  className?: string;
  children: React.ReactNode;
}

const DatePillData = [
  {
    day: 'Mo',
    time: 1,
  },
  {
    day: 'Tu',
    time: 2,
  },
  {
    day: 'We',
    time: 3,
  },
  {
    day: 'Th',
    time: 4,
  },
  {
    day: 'Fr',
    time: 5,
  },
  {
    day: 'Sa',
    time: 6,
  },
  {
    day: 'Su',
    time: 7,
  },
];

const EventCalendar = ({ className, children }: EventCalendarProps) => {
  return (
    <BasicCard className={clsxm(className, '!w-full !rounded-2xl')}>
      <div className='flex flex-col gap-y-[9px]'>
        <div className='text-lg font-bold text-[#4D5E80]'>Event/Calendar</div>

        <div className='hideScroll flex flex-row gap-x-10 overflow-x-scroll'>
          {DatePillData.map((date, i) => (
            <DatePill key={i} date={date} selected={i === 3} />
          ))}
        </div>
      </div>
      <div className='hideScroll mt-[14px] h-[75%] overflow-y-scroll'>
        {children}
      </div>
    </BasicCard>
  );
};

interface DatePillProps {
  date: {
    day: string;
    time: number;
  };
  selected: boolean;
}

const DatePill = ({ selected, date }: DatePillProps) => {
  return (
    <div
      className={clsxm(
        selected && 'bg-[#1C1C1C]',
        'flex h-[53px] cursor-pointer flex-row items-center justify-center rounded-[9px] text-center'
      )}
    >
      <div className='flex w-[32px] flex-col gap-1'>
        <div
          className={clsxm(
            selected ? 'bg-[#1C1C1C] text-white' : 'text-opacity-40'
          )}
        >
          {date.day}
        </div>
        <div
          className={clsxm(
            selected ? 'bg-[#1C1C1C] text-white' : 'text-[#1C1C1C]'
          )}
        >
          {date.time}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
