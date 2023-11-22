'use client';

import ExamTimetable from '@/components/views/student.tsx/Examtimetable';

const Periods = () => {
  return (
    <div className='rounded-xl bg-white'>
      <div className='p-4 border-b'>
        <h2 className='text-xl'>Timetable</h2>
      </div>

      <ExamTimetable
        isClassTimeTable={true}
        classId='ac117ebe-510c-4646-a5c0-da9934fc025c'
      />
    </div>
  );
};

export default Periods;
