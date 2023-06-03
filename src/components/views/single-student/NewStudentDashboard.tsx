import StudentActionCard from '@/components/cards/StudentActionCard';
import NewStudentClock from '@/components/views/single-student/NewStudentClock';
import NewStudentSmallTimetable from '@/components/views/single-student/NewStudentSmallTimetable';
import NextPeriod from '@/components/views/single-student/NextPeriod';

export default function NewStudentDashboard() {
  return (
    <div className='flex gap-8'>
      <div className='w-full flex flex-col gap-8'>
        <div className='p-4 rounded-xl border bg-[#FAFAFA]'>
          <div className='font-bold text-xl'>Next Period</div>
          <NextPeriod />
        </div>
        <div className='p-4 rounded-xl border bg-[#FAFAFA]'>
          <div className='font-bold text-xl'>Your Actions</div>
          <div className='flex gap-4'>
            {Array(3)
              .fill(0)
              .map((v, i) => (
                <StudentActionCard
                  key={i}
                  img='/images/sidebar-icons/Dashboard.png'
                  type='assignment'
                />
              ))}
          </div>
        </div>
      </div>

      <div className='max-w-sm w-full flex flex-col gap-8'>
        <NewStudentClock />
        <div className='p-4 rounded-xl border bg-[#FAFAFA]'>
          <div className='font-bold text-xl '>Today's Timetable</div>
          <NewStudentSmallTimetable />
        </div>
      </div>
    </div>
  );
}