import QuickActionButton from '@/components/buttons/QuickAction';
import CountDown from '@/components/counter/Coundown';
import { BigAvatar } from '@/components/profile/BigAvatar';

export default function TeacherClassCard({ call }: { call?: JSX.Element }) {
  return (
    <div>
      <div className='flex flex-col items-center px-10 pt-5 border rounded-lg border-[#3361FF] bg-[#F6F8FF]'>
        <div className='text-center text-[#6B7A99] font-bold text-lg'>
          Teacher
        </div>
        <BigAvatar src='/images/teacher_1.png' />
        <div className='h-10' />
        <div className='mb-1 text-xl font-bold'>Staff Name</div>
        <div className='rounded-full py-2 px-6 bg-[#F7D7FF]'>Math Teacher</div>
        <div className='h-4' />
        <div className='text-lg'>Time Spent:</div>
        <CountDown />
        {call}
        <div className='h-8' />
      </div>
      <div className='my-10 font-bold text-lg text-[#6B7A99]'>
        Quick Actions
      </div>
      <div className='flex gap-4'>
        <QuickActionButton title='Ask a Question' />
        <QuickActionButton title='Ask a Question' />
      </div>
    </div>
  );
}
