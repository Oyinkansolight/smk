import OnlineStatus from '@/components/profile/OnlineStatus';
import Avatar from '~/svg/avatar.svg';

export default function NewStudentAvatar() {
  return (
    <div className='flex min-w-max rounded-full gap-2 items-center border bg-[#FFF6E7] py-1 px-2'>
      <Avatar className='h-10 w-10' />
      <div className='font-bold flex flex-col'>
        <div className='text-[#615E83]'>Johny Makelele</div>
        <div className='text-[#E87F1E]'>Primary 1 A</div>
      </div>
      <div>
        <OnlineStatus status='online' />
        <div className='font-extrabold'>
          <span className='font-normal text-[#3361FF]'>ID no:</span> PR1-1234
        </div>
      </div>
    </div>
  );
}
