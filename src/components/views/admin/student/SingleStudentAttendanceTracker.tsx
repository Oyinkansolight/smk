import { CountCard } from '@/components/cards';
import AttendanceHistory from '@/components/views/admin/student/AttendanceHistory';
import Calendar from 'react-widgets/Calendar';
import 'react-widgets/styles.css';

import '../../../../styles/calendar.css';

// const timeLineData = [
//   {
//     image: '/images/teacher_step_1.png',
//     title: 'MR. Gbadamosi’s Class',
//     details: '1:32 AM',
//   },
//   {
//     image: '/images/teacher_step_2.png',
//     title: 'Mrs. Erhveba’s Class',
//     details: '1:32 AM',
//   },
//   {
//     image: '/images/teacher_step_3.png',
//     title: 'Submitted a bug',
//     details: 'Yesterday 12:39 AM',
//   },
//   {
//     image: '/images/teacher_step_4.png',
//     title: 'Modified A data in Page X',
//     details: 'Aug 11',
//   },
//   {
//     image: '/images/teacher_step_2.png',
//     title: 'Mrs. Erhveba’s Class',
//     details: '3:30 PM',
//   },
// ];
export default function SingleStudentAttendanceTracker() {
  return (
    <div className='bg-white'>
      <div className='text-2xl font-bold text-[#6B7A99] py-4 px-2 border-b-2'>
        Attendance
      </div>
      <div className='flex flex-col gap-10 py-4 px-6'>
        <div className='flex justify-between py-2 px-4 bg-[#F8FDFF] border-2 rounded-md items-center'>
          <CountCard text='89%' title='Average' variant='basic' />
          <div>
            <div className='text-end'>Class Teacher:</div>
            <div className='flex gap-4 items-center'>
              <div className='bg-gray-500 rounded-full h-10 w-10' />
              <div className='text-[#8898AA] font-bold text-lg'>
                James Grace
              </div>
            </div>
          </div>
        </div>

        <div className='flex items-start justify-between gap-10 py-8'>
          <div className='max-w-xs'>
            <Calendar />
          </div>
          <AttendanceHistory />
        </div>
      </div>
    </div>
  );
}
