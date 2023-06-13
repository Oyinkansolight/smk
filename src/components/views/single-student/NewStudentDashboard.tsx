import StudentActionCard from '@/components/cards/StudentActionCard';
import NewStudentClock from '@/components/views/single-student/NewStudentClock';
import NewStudentSmallTimetable from '@/components/views/single-student/NewStudentSmallTimetable';
import NextPeriod from '@/components/views/single-student/NextPeriod';

export default function NewStudentDashboard() {
  return (
    <div className='flex justify-between gap-8'>
      <div className='w-full flex flex-col gap-8 mt-8 px-7'>
        <div className='flex flex-col gap-2'>
          <div className='h3'>Hello, Johnny</div>
          <div className='text-sm text-[#888]'>
            Monitor your Periodroom and activities here
          </div>
          <div className='bg-black h-px mt-3' />
        </div>

        <div className='p-4 rounded-xl border bg-[#FAFAFA]'>
          <div className='font-bold text-xl text-[#746D69] mb-[14px]'>
            Next Period
          </div>
          <NextPeriod />
        </div>

        <div className='p-4 rounded-xl border bg-[#FAFAFA]'>
          <div className='h4 text-[#746D69]'>Your Actions</div>
          <div className='flex flex-wrap gap-4 mt-2'>
            {Array(5)
              .fill(0)
              .map((v, i) => (
                <StudentActionCard
                  key={i}
                  ongoing={i === 0}
                  img='/images/sidebar-icons/Dashboard.png'
                  type='assignment'
                />
              ))}
          </div>
        </div>
      </div>

      <div className='max-w-sm flex flex-col gap-8 pr-11 pt-[35px]'>
        <NewStudentClock />
        <div className='flex flex-col gap-y-[14px] p-4 rounded-xl border bg-[#FAFAFA] w-full max-w-[296px]'>
          <div className='font-bold text-xl '>Today's Timetable</div>
          <NewStudentSmallTimetable />
        </div>
      </div>
    </div>
  );
}
