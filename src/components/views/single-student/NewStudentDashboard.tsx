import StudentActionCard from '@/components/cards/StudentActionCard';
import NextPeriod from '@/components/views/single-student/NextPeriod';

export default function NewStudentDashboard() {
  return (
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
  );
}
