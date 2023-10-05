// import { CountCard } from '@/components/cards';
// import GenericTimetable from '@/components/tables/GenericTimetable';
// import AttendanceHistory from '@/components/views/admin/student/AttendanceHistory';
// import { useState } from 'react';
// import Calendar from 'react-widgets/Calendar';
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
// export default function SingleStudentAttendanceTracker() {
//   const [value, setValue] = useState(new Date());
//   return (
//     <div className='bg-white'>
//       <div className='flex justify-between py-4 px-2 border-b-2'>
//         <h2 className='text-2xl font-bold text-[#6B7A99]'>TimeTable</h2>
//         <div className='space-x-2'>
//           <select
//             name='terms'
//             id='terms'
//             className='border outline-none py-1 pl-2 pr-8 rounded text-xs font-thin '
//           >
//             <option value=''>First Term</option>
//             <option value=''>First Term</option>
//             <option value=''>First Term</option>
//           </select>
//           <select
//             name='terms'
//             id='terms'
//             className='border outline-none py-1 pl-2 pr-8 rounded text-xs font-thin'
//           >
//             <option value=''>Class timetable</option>
//             <option value=''>Test timetable</option>
//             <option value=''>Exam timetable</option>
//           </select>
//           <select
//             name='terms'
//             id='terms'
//             className='border outline-none py-1 pl-2 pr-8 rounded text-xs font-thin'
//           >
//             <option value=''>Subject</option>
            
//           </select>
//           <select
//             name='terms'
//             id='terms'
//             className='border outline-none py-1 pl-2 pr-8 rounded text-xs font-thin'
//           >
//             <option value=''>Class</option>
//             <option value=''>SS 1 Science A</option>
           
//           </select>
//         </div>
//       </div>
//       <div className='flex flex-col gap-10 py-4 px-6'>
//         {/* <div className='flex justify-between py-2 px-4 bg-[#F8FDFF] border-2 rounded-md items-center'>
//           <CountCard text='89%' title='Average' variant='basic' />
//           <div>
//             <div className='text-end'>Class Teacher:</div>
//             <div className='flex gap-4 items-center'>
//               <div className='bg-gray-500 rounded-full h-10 w-10' />
//               <div className='text-[#8898AA] font-bold text-lg'>
//                 James Grace
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className='flex items-start justify-between gap-10 py-8'>
//           <div className='max-w-xs'>
//             <Calendar value={value} onChange={(value) => setValue(value)} />
//           </div>
//           <AttendanceHistory />
//         </div> */}
//         <GenericTimetable classId='2345678i9' isClassTimeTable={false} />
//       </div>
//     </div>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@/components/tables/TableComponent';
import { TableColumn } from 'react-data-table-component';

/* eslint-disable @typescript-eslint/no-explicit-any */
// const report = [
//   {
//     subject: 'Mathematics',
//     attendancePerformance: '95%',
//     name: 'Ibrahim Wilson',
//   },
//   {
//     subject: 'Englsh',
//     attendancePerformance: '75%',
//     name: 'Akani Egbherve',
//   },
//   {
//     subject: 'Social Studies',
//     attendancePerformance: '51%',
//     name: 'Norman Russell',
//   },
//   {
//     subject: 'Diction',
//     attendancePerformance: '55%',
//     name: 'Regina Askiya',
//   },
// ];

const columns: TableColumn<any>[] = [
  { name: 'Subject', cell: (row) => row.subject },
  {
    name: 'Attendance Performance',
    cell: (row) => row.attendancePerformance,
  },
  { name: 'Teacher', cell: (row) => <div>{row.name} </div> },
];

export default function ExamReportView() {
  return (
    <div className='flex flex-col gap-[22px]'>
      <div className='bg-white p-6 rounded border flex flex-col gap-5'>
        <Table
          showFilter={false}
          showSearch={false}
          columns={columns}
          data={[]}
        />
      </div>
    </div>
  );
}

