'use client';

import NextImage from '@/components/NextImage';
import EditRequest from '@/components/modal/EditRequest';
import EditStudentProfile from '@/components/modal/EditStudentProfile';
import { getFromSessionStorage } from '@/lib/helper';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import ProfileAvatar from '~/svg/profile_avatar.svg';

const Page = () => {
  const userData = getFromSessionStorage('user');
  let user;
  let info;

  if (userData) {
    user = JSON.parse(userData).currentStudentInfo;
    info = JSON.parse(userData);
  }
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, seteditContent] = useState(false);
  const [editAction, seteditAction] = useState(false);
  function handleModal() {
    setIsEdit(!isEdit);
    seteditAction(true);
  }
  function handleEditModal() {
    seteditContent(!editContent);
  }

  return (
    <div className='flex gapx-4 gap-y-10'>
      {isEdit && (
        <EditRequest
          title='Edit Requested'
          description='Click OK to continue'
          action={handleModal}
          actiontText='OK'
          showHome={false}
        />
      )}

      {editContent && <EditStudentProfile onClickHandler={handleEditModal} />}

      <div className='w-full px-4'>
        <h1 className='text-xl font-medium mb-3 mt-6'>Profile</h1>
        <div className='relative'>
          <NextImage
            src='/images/Profile_Banner.png'
            width={1500}
            className='w-full'
            height={200}
            alt='student-profile-picture'
          />
          <div className='absolute top-12 md:top-20  lg:top-32 left-10 duration-300 transition-all'>
            <ProfileAvatar className='h-16 md:h-20 xl:h-32 w-16 md:w-20 xl:w-32' />
          </div>
        </div>
        <div className='py-2 border-y mt-14'>
          <div className='border-secondary border rounded bg-[#F5F8FF] py-2 pl-2 pr-5 flex space-x-2 max-w-max items-center'>
            <BiListCheck className='h-5 w-5 text-secondary' />
            <p className='font-medium text-lg text-secondary'>Bio-data</p>
          </div>
        </div>
        <div className='bg-[#F9F9F9] p-10 border rounded mt-5'>
          <div className='py-2 border-b flex justify-between'>
            <h1 className='text-xl'>Students Personal Details</h1>
            {!isEdit && !editAction && (
              <button
                onClick={() => setIsEdit(true)}
                className='font-light text-secondary text-base'
              >
                Request Edit
              </button>
            )}
            {editAction && (
              <button
                onClick={handleEditModal}
                className='font-light text-secondary text-base'
              >
                Edit Now
              </button>
            )}
          </div>
          <div className='mt-10 p-5 bg-white rounded-[10px] grid sm:grid-cols-2 md:grid-cols-3 gapx-4 gap-y-10'>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Full Name</h1>
              <p className='text-base font-medium'>
                {user?.firstName ?? "N/A"} {user?.lastName ?? "N/A"}{' '}
              </p>
            </div>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Gender</h1>
              <p className='text-base font-medium uppercase'>{user?.gender ?? "N/A"} </p>
            </div>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Year/Level</h1>
              <p className='text-base font-medium'>{user?.class?.class?.name ?? "N/A"}</p>
            </div>

            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Student ID Number</h1>
              <p className='text-base font-medium'>{user?.studentId ?? "N/A"} </p>
            </div>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Date of Birth</h1>
              <p className='text-base font-medium'>{user?.dob ?? "N/A"} </p>
            </div>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Nationality</h1>
              <p className='text-base font-medium'>NIGERIAN</p>
            </div>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Religion</h1>
              <p className='text-base font-medium'>CHRISTIANITY</p>
            </div>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Marital Status</h1>
              <p className='text-base font-medium'>SINGLE</p>
            </div>
          </div>
          <div className='py-2 border-b flex justify-between mt-5'>
            <h1 className='text-xl'>Student’s Contact Details</h1>
            <button
              onClick={() => setIsEdit(true)}
              className='font-light text-secondary text-base'
            >
              {' '}
              Request Edit
            </button>
          </div>
          <div className='mt-10 p-5 bg-white rounded-[10px] grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10'>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Email</h1>
              <p className='text-base font-medium'>{info?.email ?? 'N/A'} </p>
            </div>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Address</h1>
              <p className='text-base font-medium'>{user?.address ?? 'N/A'}</p>
            </div>
          </div>
          <div className='py-2 border-b flex justify-between mt-5'>
            <h1 className='text-xl'>Parent Details</h1>
            <button
              onClick={() => setIsEdit(true)}
              className='font-light text-secondary text-base'
            >
              {' '}
              Edit Now
            </button>
          </div>
          <div className='mt-10 p-5 bg-white rounded-[10px] grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10'>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Full Name</h1>
              <p className='text-base font-medium'>
                {' '}
                {user?.parentDetails?.name ?? 'N/A'}{' '}
              </p>
            </div>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Relationship</h1>
              <p className='text-base font-medium'> {user?.parentStatus ?? "N/A"} </p>
            </div>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Occupation</h1>
              <p className='text-base font-medium'>{user?.parentOccupation ?? "N/A"}</p>
            </div>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Email</h1>
              <p className='text-base font-medium'>
                {' '}
                {user?.parentDetails?.email ?? "N/A"}{' '}
              </p>
            </div>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Address</h1>
              <p className='text-base font-medium'></p>
            </div>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Phone Number</h1>
              <p className='text-base font-medium'>
                {user?.parentDetails?.phoneNumber ?? "N/A"}
              </p>
            </div>
          </div>

          <div className='py-2 border-b flex justify-between mt-5'>
            <h1 className='text-xl'>Students Educational History</h1>
            <button
              onClick={() => setIsEdit(true)}
              className='font-light text-secondary text-base'
            >
              {' '}
              Request Edit
            </button>
          </div>
          <div className='mt-10 p-5 bg-white rounded-[10px] grid sm:grid-cols-2 md:grid-cols-3 gapx-4 gap-y-10'>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Previous School</h1>
              <p className='text-base font-medium'>Avril Secondary School</p>
            </div>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Current School</h1>
              <p className='text-base font-medium'>Dansol High School</p>
            </div>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Admission Year</h1>
              <p className='text-base font-medium'>2022</p>
            </div>
            <div>
              <h1 className='text-gray-400 text-xs mb-3'>Gradation Year</h1>
              <p className='text-base font-medium'>2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
