import moment from 'moment';
import { useState } from 'react';
import { AiTwotoneFlag } from 'react-icons/ai';
import { BiPaperclip } from 'react-icons/bi';
import { BsArrowDownCircle, BsListTask } from 'react-icons/bs';
import { TbClockHour4 } from 'react-icons/tb';

import clsxm from '@/lib/clsxm';

import LessonsTable from '@/components/tables/LessonsTable';

export default function TaskAccordion({
  taskName,
  lessons,
  nextClass,
  endDate,
}: {
  taskName: string;
  lessons: { topic: string; progress: number }[];
  nextClass: Date;
  endDate: Date;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div
        onClick={() => setExpanded(!expanded)}
        className='flex cursor-pointer items-center rounded-md bg-white p-4 shadow-sm'
      >
        <BsArrowDownCircle
          className={clsxm(
            'h-[27px] w-[27px] text-[#7F9CFF] transition-transform duration-300',
            expanded ? 'rotate-180' : 'text-[#C3CAD9]'
          )}
        />
        <div className='w-4' />
        <div className='text-[#6B7A99]'>{taskName}</div>
        <div className='w-8' />
        <div className='text-[#ADB8CC]'>{`${lessons.length} Lesson${
          lessons.length > 1 ? 's' : ''
        }`}</div>
        <div className='w-3' />
        <BsListTask className='h-5 w-5 text-[#C3CAD9]' />
        <div className='w-3' />
        <BiPaperclip className='h-5 w-5 text-[#C3CAD9]' />
        <div className='flex-1' />
        <AiTwotoneFlag className='h-5 w-5 text-[#C3CAD9]' />
        <div className='w-2' />
        <div className='text-[#6B7A99]'>
          Next Class: {moment(nextClass).format('MMM D, h:ma')}
        </div>
        <div className='w-10' />
        <TbClockHour4 className='h-5 w-5 text-[#C3CAD9]' />
        <div className='w-2' />
        <div className='text-[#6B7A99]'>
          End Date: {moment(endDate).format('MMM D, h:ma')}
        </div>
      </div>
      <div
        style={{
          height: expanded ? `${40 + 72 + 52.4 * lessons.length}px` : '0px',
        }}
        className={clsxm(
          'overflow-hidden transition-all duration-300',
          expanded ? '' : ''
        )}
      >
        <LessonsTable lessons={lessons} />
        <div className='flex cursor-pointer justify-start py-5'>
          <div className='rounded-md bg-white py-2 px-4 text-center font-bold text-[#3361FF]'>
            Add To Lesson
          </div>
        </div>
      </div>
    </div>
  );
}
