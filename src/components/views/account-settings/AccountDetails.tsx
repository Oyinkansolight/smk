'use client';

import Button from '@/components/buttons/Button';
import TeacherBioDetails from '@/components/views/single-teacher/TeacherBioDetails';
import clsxm from '@/lib/clsxm';
import { getFromLocalStorage } from '@/lib/helper';
import { getErrMsg } from '@/server';
import {
  useGetSubjectAssignedToTeacher,
  useGetTeacherById,
  useUpdateStaffSubject,
} from '@/server/institution';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Avatar from '~/svg/governor.svg';

const Page = () => {
  const router = useRouter();
  const currentSessionId: string =
    getFromLocalStorage('currentSessionId') ?? '';

  const [isEditingBioDetails, setIsEditingBioDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAddSubject, setisAddSubject] = useState(false);
  const p = useSearchParams();
  const { data, error } = useGetTeacherById({
    id: 'c23066f0-544f-4d4b-bb0a-02064f57f708',
  });

  const onClickHandler = () => {
    setisAddSubject(!isAddSubject);
  };

  const handleUpdateStaff = useUpdateStaffSubject();

  const SubmitHandler = async () => {
    const payload = {
      teacherId: p?.get('id'),
      sessionId: currentSessionId,
      subjectAndClasses: [],
    };

    if (payload.subjectAndClasses.length === 0) {
      toast.error('Please add at least one subject');
      return;
    }

    try {
      setLoading(true);
      const response = await handleUpdateStaff.mutateAsync(payload);

      if (response) {
        toast.success('Teacher subject updated successfully');
        onClickHandler();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(getErrMsg(error));
    }
  };

  const staff = data;

  useEffect(() => {
    if (error) {
      toast.error(getErrMsg(error));
    }
  }, [error]);

  return (
    <section>
      <div
        className={clsxm(
          'flex justify-end gap-5 py-10',
          isEditingBioDetails && 'opacity-50'
        )}
      >
        <Button
          onClick={() => router.push('/admin/student/edit-history')}
          disabled={isEditingBioDetails}
          variant='ghost'
          className='text-primary bg-white hover:bg-primary-100 border border-primary-500'
        >
          View Edit History
        </Button>
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
                <div className='flex space-x-3 items-center p-4'>
                  <Avatar className='h-full w-full' />
                </div>
              </div>
            </div>
            <Button
              onClick={() => router.push('/admin/student/edit-history')}
              disabled={isEditingBioDetails}
              variant='ghost'
              className='text-primary w-full  mt-4 flex justify-center bg-white hover:bg-primary-100 border border-primary-500'
            >
              Change Password
            </Button>
          </div>
          <div className='col-span-9'>
            <div>
              <div className='bg-white px-8'>
                <TeacherBioDetails
                  isEditing={isEditingBioDetails}
                  setIsEditing={setIsEditingBioDetails}
                  initStaff={staff}
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
