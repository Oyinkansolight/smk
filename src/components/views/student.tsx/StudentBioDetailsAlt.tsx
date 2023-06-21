/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import EditableFormItemAlt from '@/components/cards/EditableFormItemAlt';
import { getErrMsg } from '@/server';
import { useUpdateStudent } from '@/server/government/student';
import { Student } from '@/types/institute';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function StudentBioDetailsAlt({
  isEditing,
  setIsEditing,
  initStudent,
}: {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  initStudent?: Student;
}) {
  const { control, setValue, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const update = useUpdateStudent();
  const onSubmit = async (data: any) => {
    if (initStudent?.id) {
      setIsLoading(true);
      try {
        await update.mutateAsync({
          email: data.studentEmail,
          id: initStudent?.id,
          phoneNumber: data.studentPhone,
          firstName: (data.fullName as string).split(' ')[0],
          lastName: (data.fullName as string).split(' ')[1],
        });
      } catch (error) {
        toast.error(getErrMsg(error));
      } finally {
        setIsLoading(false);
      }
    }
    setIsEditing(false);
  };

  useEffect(() => {
    // console.log('Student Changed', initStudent);
    if (initStudent) {
      setValue('studentEmail', (initStudent?.user ?? [])[0]?.email);
      setValue('email', (initStudent?.user ?? [])[0]?.email);
      setValue('studentPhone', (initStudent?.user ?? [])[0]?.phoneNumber);
      setValue('gender', initStudent?.gender);
      setValue('parentName', initStudent?.parentName);
      setValue('parentOccupation', initStudent?.parentOccupation);
      setValue(
        'fullName',
        `${(initStudent?.user ?? [])[0]?.firstName} ${
          (initStudent?.user ?? [])[0]?.lastName
        }`
      );
      setValue('dateOfBirth', initStudent.dob);
      setValue('address', (initStudent?.user ?? [])[0]?.address);
      setValue('school', initStudent?.institution?.instituteName);
    }
  }, [initStudent, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {isEditing && (
          <div className='flex justify-end my-5'>
            <Button disabled={isLoading} type='submit' variant='secondary'>
              Update Changes
            </Button>
          </div>
        )}
        <div className='font-bold text-2xl text-[#6B7A99] my-8'>
          Bio Details
        </div>
        {isEditing && (
          <div className='flex justify-start my-4'>
            <label
              htmlFor='image-upload'
              className='border p-4 cursor-pointer flex flex-col items-center gap-4'
            >
              <Image
                height={80}
                width={80}
                src='/images/add_image.png'
                alt='add-image-logo'
              />
              <div className='font-bold'>Click to capture image</div>
            </label>
            <input id='image-upload' type='file' className='hidden' />
          </div>
        )}
        <div className='grid grid-cols-2 gap-4'>
          <Controller
            control={control}
            name='fullName'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Full Name'
                placeholder='Enter full name'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='email'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Email Address'
                placeholder='Enter Email Address'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='gender'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Gender'
                placeholder='Select Gender'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='dateOfBirth'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Date Of Birth'
                placeholder='Enter Date of birth'
                type='date'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='parentalStatus'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Parental Status'
                placeholder='Enter Parental Status'
                {...field.field}
              />
            )}
          />
          <div />
          <Controller
            control={control}
            name='parentName'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Parent Name'
                placeholder='Enter Parent Name'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='parentOccupation'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Parent Occupation'
                placeholder='Enter Parent Occupation'
                {...field.field}
              />
            )}
          />
        </div>
        <div className='font-bold text-2xl text-[#6B7A99] my-8'>
          Contact Details
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Controller
            control={control}
            name='studentEmail'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Email Address'
                placeholder='Enter Email Address'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='studentPhone'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Phone Number'
                placeholder='Enter Phone Number'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='address'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Address'
                placeholder='Enter Address'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='lga'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Local Government Area'
                placeholder='Enter Local Government Area'
                {...field.field}
              />
            )}
          />
        </div>
        <div className='font-bold text-2xl text-[#6B7A99] my-8'>
          Educational Details
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Controller
            control={control}
            name='school'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='School'
                placeholder='Enter School'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='class'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Class'
                placeholder='Enter Class'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='classTeacher'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Class Teacher'
                placeholder='Enter Class Teacher'
                {...field.field}
              />
            )}
          />
        </div>
      </div>
    </form>
  );
}