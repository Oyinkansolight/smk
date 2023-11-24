/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import EditableFormItemAlt from '@/components/cards/EditableFormItemAlt';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useUpdateUser } from '@/server/government/staff';
import { useGetLocalGovernments } from '@/server/onboard';
import { Staff } from '@/types/institute';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RiImageAddFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

export default function TeacherBioDetails({
  isEditing,
  setIsEditing,
  initProfile,
}: {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  initProfile?: Staff;
}) {
  const { control, setValue, handleSubmit } = useForm();
  const [, setIsLoading] = useState(false);
  const [userLga, setUserLga] = useState('');
  const update = useUpdateUser();
  const { data: localGovernments } = useGetLocalGovernments();

  useEffect(() => {
    async function getLga() {
      const foundLga: any = await localGovernments?.filter(
        (local) => local.id === initProfile?.lga
      )[0].name;

      if (foundLga) {
        setUserLga(foundLga);
        return;
      }

      if (initProfile?.lga && initProfile?.lga?.length < 20) {
        setUserLga(initProfile?.lga);
        return;
      }

      if (
        !initProfile?.lga ||
        (initProfile?.lga && initProfile?.lga?.length > 20)
      ) {
        setUserLga('None');
        return;
      }
    }

    getLga();
  }, [localGovernments, initProfile?.lga, userLga]);

  const onSubmit = async (data: any) => {
    if (initProfile?.id) {
      setIsLoading(true);

      const payload = {
        // profileImg: data.,
        // lga: data.lga,
        // email: data.email,
        // id: initProfile?.id,
        // dob: data.dateOfBirth,
        // address: data.address,
        // nextOfKin: data.nextOfKin,
        // gender: data.gender.toUpperCase(),
        // phoneOfNextOfKin: data.phoneNextOfKin,
        // addressOfNextOfKin: data.addressNextOfKin,
        // firstName: (data.fullName as string).split(' ')[0],
        // lastName: (data.fullName as string).split(' ')[1],
        // relationshipToNextOfKin: data.relationshipNextOfKin,
        // employmentDetails: {
        //   datePosted: data.datePosted,
        //   retirementDate: data.retirementDate,
        //   highestQualification: data.highestQualification,
        //   DateOfFirstAppointment: data.dateOfAppointment,
        // },
        // trainingDetails,

        userId: initProfile?.id,
        firstName: data.firstName as string,
        lastName: data.lastName as string,
        middleName: data.middleName,
        address: data.address,
        phoneNumber: data.phone,
      };

      try {
        // const response = await update.mutateAsync(payload);
        await update.mutateAsync(payload);

        console.log('Successfull Update');

        toast.success('User Updated successfully');
        setIsEditing(false);
      } catch (error) {
        logger(error);
        toast.error(getErrMsg(error));
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (initProfile) {
      setValue('email', (initProfile ?? {})?.email);
      setValue('phone', (initProfile ?? {})?.phoneNumber);
      setValue('gender', initProfile?.gender);
      setValue('firstName', initProfile?.firstName);
      setValue('lastName', initProfile?.lastName);
      setValue('middleName', initProfile?.middleName);
      // setValue(
      //   'fullName',
      //   `${(initProfile ?? {})?.firstName} ${(initProfile ?? {})?.lastName}`
      // );
      setValue('dateOfBirth', initProfile.dob);
      setValue('address', (initProfile ?? {})?.address);
      setValue('school', initProfile?.institution?.instituteName);
      setValue('lga', userLga);
      setValue('nextOfKin', initProfile?.nextOfKin);
      setValue('relationshipNextOfKin', initProfile?.relationshipToNextOfKin);
      setValue('addressNextOfKin', initProfile?.addressOfNextOfKin);
      setValue('phoneNextOfKin', initProfile?.phoneOfNextOfKin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <Controller
            control={control}
            name='firstName'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='First Name'
                placeholder='Enter first name'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='lastName'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Last Name'
                placeholder='Enter last name'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='middleName'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Middle Name'
                placeholder='Enter Middle name'
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
          {/* <Controller
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
          /> */}
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
          {/* <Controller
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
          /> */}
        </div>
      </div>
    </form>
  );
}
