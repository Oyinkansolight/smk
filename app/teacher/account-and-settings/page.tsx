'use client';

import { BigAvatar } from '@/components/profile/BigAvatar';
import { useGetProfile } from '@/server/auth';

export default function Page() {
  const { data } = useGetProfile();

  return (
    <div className='layout flex flex-col gap-8 my-5'>
      <div className='text-2xl font-bold'>Account And Settings</div>
      <BigAvatar src='/images/teacher_1.png' />
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between'>
          <div className='font-bold text-xl'>Staff Profile Details</div>
          <div className='text-blue-500 cursor-pointer'>Request Edit</div>
        </div>
        <div className='h-px bg-gray-300' />
        <div className='p-8 bg-white rounded-lg grid gap-5 sm:grid-cols-2 md:grid-cols-3'>
          <div>
            <div className='text-[#B1B1B1]'>Full Name</div>
            <div className='text-lg'>
              {data?.userInfo?.firstName} {data?.userInfo?.lastName}
            </div>
          </div>

          <div>
            <div className='text-[#B1B1B1]'>Gender</div>
            <div className='text-lg'>{data?.userInfo?.staff?.gender}</div>
          </div>

          <div>
            <div className='text-[#B1B1B1]'>Staff Id Number</div>
            <div className='text-lg'>{data?.userInfo?.staff?.id}</div>
          </div>

          <div>
            <div className='text-[#B1B1B1]'>Marital Status</div>
            <div className='text-lg'>Single</div>
          </div>

          <div>
            <div className='text-[#B1B1B1]'>Date of Birth</div>
            <div className='text-lg'>{data?.userInfo?.staff?.dob}</div>
          </div>

          <div>
            <div className='text-[#B1B1B1]'>Nationality</div>
            <div className='text-lg'>Nationality</div>
          </div>

          <div>
            <div className='text-[#B1B1B1]'>Religion</div>
            <div className='text-lg'>Christianlity</div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between'>
          <div className='font-bold text-xl'>Staff Contact Details</div>
          <div className='text-blue-500 cursor-pointer'>Request Edit</div>
        </div>
        <div className='h-px bg-gray-300' />
        <div className='p-8 bg-white rounded-lg grid gap-5 sm:grid-cols-2 md:grid-cols-3'>
          <div>
            <div className='text-[#B1B1B1]'>Email</div>
            <div className='text-lg'>{data?.userInfo?.email}</div>
          </div>

          <div>
            <div className='text-[#B1B1B1]'>Address</div>
            <div className='text-lg'>{data?.userInfo?.address}</div>
          </div>

          <div>
            <div className='text-[#B1B1B1]'>Phone Number</div>
            <div className='text-lg'>{data?.userInfo?.phoneNumber}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
