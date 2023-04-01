import moment from 'moment';

import { CalendarStepper } from '@/components/calendars';
import CalenderView from '@/components/calendars/CalenderView';
const timeLineData = [
  {
    image: '/images/teacher_step_1.png',
    title: 'MR. Gbadamosi’s Class',
    details: '1:32 AM',
  },
  {
    image: '/images/teacher_step_2.png',
    title: 'Mrs. Erhveba’s Class',
    details: '1:32 AM',
  },
  {
    image: '/images/teacher_step_3.png',
    title: 'Submitted a bug',
    details: 'Yesterday 12:39 AM',
  },
  {
    image: '/images/teacher_step_4.png',
    title: 'Modified A data in Page X',
    details: 'Aug 11',
  },
  {
    image: '/images/teacher_step_2.png',
    title: 'Mrs. Erhveba’s Class',
    details: '3:30 PM',
  },
];
export default function TeacherTimeTableView() {
  return (
    <div className='flex items-start justify-between gap-10 py-8'>
      <CalenderView />
      <div className='flex-1 rounded-lg bg-white p-4'>
        <div className='flex items-center text-xl'>
          <div className='font-bold text-[#6B7A99]'>Calender Items</div>
          <div className='w-10' />
          <div className='text-blue-500'>({moment().format('D-M-yyyy')})</div>
          <div className='flex-1' />
          <button className='rounded border py-2 px-6 text-base font-bold text-blue-500'>
            Add Item To Calender
          </button>
        </div>
        <div className='h-16' />
        <CalendarStepper timeLine={timeLineData} />
      </div>
    </div>
  );
}
