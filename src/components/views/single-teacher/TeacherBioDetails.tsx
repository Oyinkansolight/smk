/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import EditableFormItemAlt from '@/components/cards/EditableFormItemAlt';
import { getErrMsg } from '@/server';
import { useUpdateStaff } from '@/server/government/staff';
import { Staff } from '@/types/institute';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RiImageAddFill } from 'react-icons/ri';
import { toast } from 'react-toastify';


export default function TeacherBioDetails({
  isEditing,
  setIsEditing,
  initStaff,
}: {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  initStaff?: Staff;
}) {
  const { control, setValue, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const update = useUpdateStaff();
  const onSubmit = async (data: any) => {
    if (initStaff?.id) {
      setIsLoading(true);
      try {
        await update.mutateAsync({
          email: data.studentEmail,
          id: initStaff?.id,
          phoneNumber: data.studentPhone,
          firstName: (data.fullName as string).split(' ')[0],
          lastName: (data.fullName as string).split(' ')[1],
        });
      } catch (error) {
        console.log(error);
        toast.error(getErrMsg(error));
      } finally {
        setIsLoading(false);
      }
    }
    setIsEditing(false);
  };

  useEffect(() => {
    console.log('Staff Changed', initStaff);
    if (initStaff) {
      setValue('email', (initStaff?.user ?? [])[0]?.email);
      setValue('phone', (initStaff?.user ?? [])[0]?.phoneNumber);
      setValue('gender', initStaff?.gender);
      setValue(
        'fullName',
        `${(initStaff?.user ?? [])[0]?.firstName} ${
          (initStaff?.user ?? [])[0]?.lastName
        }`
      );
      setValue('dateOfBirth', initStaff.dob);
      setValue('address', (initStaff?.user ?? [])[0]?.address);
      setValue('school', initStaff?.institution?.instituteName);
    }
  }, [initStaff, setValue]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {isEditing && (
          <div className='flex justify-end my-5'>
            <Button type='submit' variant='secondary'>
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
              <RiImageAddFill className='h-20 w-20 text-blue-800 ' />
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
        </div>
        <div className='font-bold text-2xl text-[#6B7A99] my-8'>
          Contact Details
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Controller
            control={control}
            name='phone'
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
            name='email'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Email'
                placeholder='Enter Email'
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
          <Controller
            control={control}
            name='nextOfKin'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Name of Next of Kin'
                placeholder='Enter Name of Next of Kin'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='relationshipNextOfKin'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Relationship Of Next Of Kin'
                placeholder='Enter Relationship Of Next Of Kin'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='addressNextOfKin'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Address Of Next Of Kin'
                placeholder='Enter Local Address Of Next Of Kin'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='phoneNextOfKin'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Local Phone Number Of Next Of Kin'
                placeholder='Enter Local Phone Number Of Next Of Kin'
                {...field.field}
              />
            )}
          />
        </div>
        <div className='font-bold text-2xl text-[#6B7A99] my-8'>
          Training History
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Controller
            control={control}
            name='name1'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Name/Title of Training'
                placeholder='Enter Name/Title of Training'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='year1'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Year'
                placeholder='Enter Year'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='name2'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Name/Title of Training'
                placeholder='Enter Name/Title of Training'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='year2'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Year'
                placeholder='Enter Year'
                {...field.field}
              />
            )}
          />
        </div>
        <div className='font-bold text-2xl text-[#6B7A99] my-8'>
          Employment Details
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Controller
            control={control}
            name='datePosted'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                type='date'
                label='Date Posted to Current School'
                placeholder='Enter Date Posted to Current School'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='highestQualification'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Highest Qualification'
                placeholder='Enter Highest Qualification'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='dateOfAppointment'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Date of First Appointment'
                placeholder='Enter Date of First Appointment'
                {...field.field}
                type='date'
              />
            )}
          />
          <Controller
            control={control}
            name='retirementDate'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Retirement Date'
                placeholder='Enter Retirement Date'
                {...field.field}
                type='date'
              />
            )}
          />
        </div>
      </div>
    </form>
  );
}