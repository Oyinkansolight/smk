/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import EditableFormItemAlt from '@/components/cards/EditableFormItemAlt';
import { getErrMsg } from '@/server';
import { useUpdateStudent } from '@/server/government/student';
import { Institution } from '@/types/institute';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function InstitutionBioDetails({
  isEditing,
  setIsEditing,
  initInstitution,
}: {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  initInstitution?: Institution;
}) {
  const { control, setValue, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const update = useUpdateStudent();
  const onSubmit = async (data: any) => {
    if (initInstitution?.id) {
      setIsLoading(true);
      try {
        await update.mutateAsync({
          email: data.studentEmail,
          id: initInstitution?.id,
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
    if (initInstitution) {
      const keys = Object.keys(initInstitution) as (keyof Institution)[];
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        setValue(key, initInstitution[key]);
      }
    }
  }, [initInstitution, setValue]);

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
          General Details
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
            name='instituteName'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Institution Name'
                placeholder='Enter Institution Name'
                {...field.field}
              />
            )}
          />
          <div />
          <Controller
            control={control}
            name='instituteEmail'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Institution Official Email'
                placeholder='Enter Institution Official Email'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='instituteType'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Institution Type'
                placeholder='Select Institution Type'
                {...field.field}
              />
            )}
          />
        </div>
        <div className='font-bold text-2xl text-[#6B7A99] my-8'>
          Location Details
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Controller
            control={control}
            name='instituteAddress'
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
            name='town'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Town'
                placeholder='Enter Town'
                {...field.field}
              />
            )}
          />
        </div>
        <div className='font-bold text-2xl text-[#6B7A99] my-8'>
          Account History
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Controller
            control={control}
            name='school'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Username'
                placeholder='Enter School'
                {...field.field}
              />
            )}
          />
        </div>
      </div>
    </form>
  );
}