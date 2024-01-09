'use client';

import Button from '@/components/buttons/Button';
import { BigAvatar } from '@/components/profile/BigAvatar';
import { getURL } from '@/firebase/init';
import clsxm from '@/lib/clsxm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RiImageAddFill } from 'react-icons/ri';

import ProfileDetails from './ProfileDetails';

const Page = ({ profile }: { profile?: any }) => {
  const router = useRouter();
  const [url, setUrl] = useState(
    'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'
  );
  const [isEditingBioDetails, setIsEditingBioDetails] = useState(false);
  useEffect(() => {
    const getFileURL = async (path) => {
      let result = '';
      await getURL(path).then((v) => {
        result = v;
        setUrl(v);
      });
      return result;
    };
    getFileURL(profile?.profileImg);
  }, [profile?.profileImg]);

  return (
    <section>
      <div
        className={clsxm(
          'flex justify-end gap-5 py-10',
          isEditingBioDetails && 'opacity-50'
        )}
      >
        {/* <Button
          onClick={() => router.push('/admin/student/edit-history')}
          disabled={isEditingBioDetails}
          variant='ghost'
          className='text-primary bg-white hover:bg-primary-100 border border-primary-500'
        >
          View Edit History
        </Button> */}
        <Button
          disabled={isEditingBioDetails}
          onClick={() => setIsEditingBioDetails(!isEditingBioDetails)}
          variant='primary'
        >
          Edit Account Details
        </Button>
      </div>

      <div className='rounded-md bg-white'>
        <div className='w-full px-4 py-5 border-b '>
          <h2 className='text-[#6B7A99] text-lg font-bold'>Account Details</h2>
        </div>

        <div className='grid grid-cols-12 px-4 gap-4 py-6'>
          <div className='col-span-3'>
            <div className='bg-[#F6F9FC] px-2 rounded-md'>
              <div className='content py-4'>
                <div className='flex justify-center items-center p-4'>
                  {profile?.profileImg ? (
                    <BigAvatar src={url} />
                  ) : (
                    <RiImageAddFill className='h-20 w-20 text-blue-800 ' />
                  )}
                </div>
              </div>
            </div>
            {/* <Button
              onClick={() => router.push('/admin/student/edit-history')}
              disabled={isEditingBioDetails}
              variant='ghost'
              className='text-primary w-full  mt-4 flex justify-center bg-white hover:bg-primary-100 border border-primary-500'
            >
              Change Password
            </Button> */}
          </div>
          <div className='col-span-9'>
            <div>
              <div className='bg-white px-8'>
                <ProfileDetails
                  isEditing={isEditingBioDetails}
                  setIsEditing={setIsEditingBioDetails}
                  initProfile={profile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
