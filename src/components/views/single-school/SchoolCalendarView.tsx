import { CalendarStepper } from '@/components/calendars';
import { CountCard } from '@/components/cards';
import clsxm from '@/lib/clsxm';
import moment from 'moment';
import Calendar from 'react-widgets/Calendar';
import 'react-widgets/styles.css';

import '../../../styles/calendar.css';

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
export default function SchoolCalendarView() {
  return (
    <div className='flex flex-col gap-10'>
      <CountCard text='89%' title='Average' variant='basic' />

      <div className='flex items-start justify-between gap-10 py-8'>
        <div className='max-w-xs'>
          <Calendar />
        </div>
        <div className='flex-1 rounded-lg bg-white p-4'>
          <div className='flex items-center text-xl'>
            <div className='font-bold text-[#6B7A99]'>Calender Items</div>
            <div className='w-10' />
            <div className='text-primary'>({moment().format('D-M-yyyy')})</div>
            <div className='flex-1' />
            <button
              className={clsxm(
                'flex items-center justify-center',
                'hover:bg-primary hover:text-white',
                'h-9 w-[142px] rounded border py-2 px-6 shadow-sm',
                'active:bg-primary active:text-white active:ring-1',
                'whitespace-nowrap text-[10.8px] font-bold text-primary'
              )}
            >
              Add Item To Calender
            </button>
          </div>
          <div className='h-16' />
          <CalendarStepper timeLine={timeLineData} />
        </div>
      </div>
    </div>
  );
}
