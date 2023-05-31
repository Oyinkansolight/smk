/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import EditableFormItemAlt from '@/components/cards/EditableFormItemAlt';
import { Controller, useForm } from 'react-hook-form';
import { RiImageAddFill } from 'react-icons/ri';

export default function StudentBioDetailsAlt({
  isEditing,
  setIsEditing,
}: {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}) {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    setIsEditing(false);
  };
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
            <div className='border p-4 flex flex-col items-center gap-4'>
              <RiImageAddFill className='h-20 w-20 text-blue-800 ' />
              <div className='font-bold'>Click to capture image</div>
            </div>
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
