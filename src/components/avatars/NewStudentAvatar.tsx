import OnlineStatus from '@/components/profile/OnlineStatus';
import { getFromSessionStorage } from '@/lib/helper';
import Avatar from '~/svg/avatar.svg';

export default function NewStudentAvatar() {
  const userData = getFromSessionStorage('user');
  let user;

  if (userData) {
    user = JSON.parse(userData);
  }

  return (
    <div className='flex min-w-max text-xs rounded-full gap-2 items-center border bg-[#FFF6E7] py-1 px-1 pr-8'>
      <Avatar className='h-10 w-10' />
      <div className='font-bold flex flex-col'>
        <div className='text-[#615E83]'>{user?.name ?? 'N/A'} </div>
        <div className='text-[#E87F1E]'>
          {user?.currentStudentInfo?.class?.class?.name}
        </div>
      </div>
      <div>
        <OnlineStatus status='online' />
        <div className='font-extrabold'>
          <span className='font-normal text-[#3361FF]'>ID no:</span>{' '}
          {user?.currentStudentInfo.studentId}
        </div>
      </div>
    </div>
  );
}
