'use client';

import ViewAttendanceListItem from '@/components/views/teacher/ViewAttendanceListItem';
import { useGetStudentsList } from '@/server/institution';
import { uniqueId } from 'lodash'
import moment from 'moment';

export default function Page() {
  const { data } = useGetStudentsList();

  return (
    <div className='flex flex-col layout'>
      <div className='font-bold text-3xl my-12'>Class Attendance</div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-[10px] font-bold text-xl leading-6 text-[#746D69] bg-white rounded-xl py-[18px] px-[50px]'>
          <div>Class: Primary 4 A</div>
          <div>Date: {moment().format('MMMM DD')}</div>
          <div>Time: {moment().format('LT')}</div>
        </div>

        <div className='bg-white rounded-xl py-[26px] px-[50px]'>
          <div className='mb-[18px] text-xl font-semibold text-[#262626]'>List of students</div>
          <div className='flex flex-col gap-4'>
            {data && data.length > 0 &&
              data.map((student, i) => {
                const userName = student.user[0].lastName + ', ' + student.user[0].firstName;
                const studentId = student.user[0].id;
                return (
                  <ViewAttendanceListItem key={uniqueId()} index={studentId} name={userName} />
                )
              })}
          </div>
        </div>
      </div>

    </div>
  );
}
