/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import EditableFormItemAlt from '@/components/cards/EditableFormItemAlt';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useUpdateParent } from '@/server/government/staff';
import { Parent } from '@/types/institute';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ImSpinner } from 'react-icons/im';
import { RiImageAddFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

export default function ParentBioDetails({
  isEditing,
  setIsEditing,
  initParent,
}: {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  initParent?: Parent;
}) {
  const { control, setValue, handleSubmit } = useForm();
  const [loading, setIsLoading] = useState(false);
  const update = useUpdateParent();

  const onSubmit = async (data: any) => {
    if (initParent?.id) {
      setIsLoading(true);

      console.log(data);

      const payload: Parent = {
        // profileImg: data.,
        lga: data.lga,
        id: initParent?.id,
        address: data.address,
        firstName: (data.fullName as string).split(' ')[0],
        lastName: (data.fullName as string).split(' ')[1],
      };
      for (const key in payload) {
        if (!payload[key]) delete payload[key]; //remove empty object
      }

      try {
        const response = await update.mutateAsync(payload);

        if (response) {
          toast.success('Parent Updated successful');
        }
      } catch (error) {
        logger(error);
        toast.error(getErrMsg(error));
      } finally {
        setIsLoading(false);
      }
    }
    setIsEditing(false);
  };

  useEffect(() => {
    if (initParent) {
      setValue('email', initParent?.email);
      setValue('fullName', `${initParent?.firstName} ${initParent?.lastName}`);
      setValue('address', initParent?.address);
    }
  }, [initParent, setValue]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {isEditing && (
          <div className='flex justify-end space-x-2 my-5'>
            <Button
              onClick={() => {
                setIsEditing(!isEditing);
              }}
              type='button'
              variant='ghost'
            >
              Cancel
            </Button>
            <Button type='submit' variant='secondary'>
              {loading ? <ImSpinner /> : 'Update Changes'}
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
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
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
          {/* <Controller
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
          /> */}
        </div>
        <div className='font-bold text-2xl text-[#6B7A99] my-8'>
          Contact Details
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
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
        </div>
      </div>
    </form>
  );
}
