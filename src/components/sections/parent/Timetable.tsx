'use client';

import ExamTimetable from '@/components/views/student.tsx/Examtimetable';

const Timetable = ({ classId }) => {
  return (
    <div className='rounded-xl bg-white'>
      <div className='p-4 border-b'>
        <h2 className='text-xl'>Timetable</h2>
      </div>

      <ExamTimetable isClassTimeTable={true} classId={classId} />
    </div>
  );
};

export default Timetable;
