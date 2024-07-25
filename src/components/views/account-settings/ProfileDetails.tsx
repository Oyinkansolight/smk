/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import EditableFormItemAlt from '@/components/cards/EditableFormItemAlt';
import { BigAvatar } from '@/components/profile/BigAvatar';
import { isLocal } from '@/constant/env';
import { getURL, uploadDocument } from '@/firebase/init';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import {
  useUpdateUser,
  useUpdateUserPassword,
} from '@/server/government/staff';
import {
  useGetTeachersListByInstitution,
  useUpdateInstitution,
} from '@/server/institution';
import { UserInfo } from '@/types/auth';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { RiImageAddFill } from 'react-icons/ri';
import ReactSelect from 'react-select';
import SignatureCanvas from 'react-signature-canvas';
import { toast } from 'react-toastify';
import { uuid } from 'uuidv4';

export default function TeacherBioDetails({
  isEditing,
  setIsEditing,
  initProfile,
}: {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  initProfile?: UserInfo;
}) {
  const { data: institutionProfile } = useGetProfile();
  const { data: staffs } = useGetTeachersListByInstitution({
    instituteId: institutionProfile?.userInfo?.esiAdmin?.id,
    limit: 1000,
  });
  const { control, setValue, handleSubmit, getValues, register } = useForm();
  const [loading, setIsLoading] = useState(false);
  const [sig, setSig] = useState<any>({});
  const [updateSignature, setUpdateSignature] = useState(false);
  const update = useUpdateUser();
  const updatePrincipal = useUpdateInstitution();
  const updatePassword = useUpdateUserPassword();
  const staffData = (staffs?.data ?? []).map((v) => ({
    label: v?.user ? `${v?.user?.firstName} ${v?.user?.lastName}` : ' ',
    value: v.user.id,
  }));
  const environment = isLocal ? 'staging' : 'production';
  const [url, setUrl] = useState(
    'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'
  );
  useEffect(() => {
    const getFileURL = async (path) => {
      let result = '';
      await getURL(path).then((v) => {
        result = v;
        setUrl(v);
      });
      return result;
    };
    getFileURL(initProfile?.profileImg);
  }, [initProfile?.profileImg]);

  const onSubmit = async (data: any) => {
    if (initProfile?.id) {
      setIsLoading(true);

      if (data.profileImg.length > 0) {
        toast.info('Uploading file...');

        const path = await uploadDocument(
          `profile/profile${uuid()}`,
          await data.profileImg[0].arrayBuffer(),
          environment
        );
        data.profileImg = path;
      }

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
        profileImg: data.profileImg,
        userId: initProfile?.id,
        firstName: data.firstName as string,
        lastName: data.lastName as string,
        middleName: data.middleName,
        address: data.address,
        phoneNumber: data.phone,
        signature: getValues('signature'),
      };
      for (const key in payload) {
        if (!payload[key]) delete payload[key]; //remove empty object
      }
      if (typeof data.profileImg !== 'string') delete payload['profileImg'];

      if (data.currentPassword && data.newPassword) {
        try {
          await updatePassword.mutateAsync({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
          });
          toast.success('User Password Updated successfully');
        } catch (error) {
          toast.error(getErrMsg(error));
          setIsLoading(false);
          return;
        }
      }
      try {
        // const response = await update.mutateAsync(payload);
        await update.mutateAsync(payload);

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

      setValue('address', (initProfile ?? {})?.address);
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
              {loading ? <ImSpinner2 /> : 'Update Changes'}
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
              {initProfile?.profileImg ? (
                <BigAvatar src={url} />
              ) : (
                <RiImageAddFill className='h-20 w-20 text-blue-800 ' />
              )}
              <div className='font-bold'>Click to capture image</div>
            </label>
            <input
              id='image-upload'
              {...register('profileImg')}
              type='file'
              className='hidden'
            />
          </div>
        )}
        {getValues('profileImg') && (
          <div className='text-sm font-medium mb-2 capitalize'>
            {getValues('profileImg')?.[0]?.name}
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
        </div>
        <div className='font-bold text-2xl text-[#6B7A99] my-8'>
          Principal Details
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <Controller
            control={control}
            name='currentPassword'
            render={(field) => (
              <ReactSelect
                required
                {...field}
                options={staffData}
                className='h-auto mt-2 select'
                onChange={(value: any) => {
                  updatePrincipal.mutateAsync({
                    id: institutionProfile?.userInfo?.esiAdmin?.id,
                    principalId: value.value, // staff Id to be made principal
                  });
                }}
              />
            )}
          />
        </div>
        <div className='fßont-bold text-2xl text-[#6B7A99] my-8'>
          Principal Signature
        </div>
        <div>
          <label htmlFor='signature'>Signature</label>
          {initProfile?.signature && !updateSignature ? (
            <>
              <Image
                alt='signature'
                height='500'
                width='200'
                src={initProfile?.signature}
              />
              <Button
                className='mt-4'
                onClick={() => {
                  setUpdateSignature(true);
                }}
              >
                Update
              </Button>
            </>
          ) : (
            <>
              <SignatureCanvas
                penColor='green'
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'sigCanvas',
                }}
                ref={(ref: any) => {
                  setSig(ref);
                }}
              />
              <div className='flex mt-4 space-x-2'>
                <Button
                  onClick={() => {
                    setValue(
                      'signature',
                      sig?.getTrimmedCanvas().toDataURL('image/png')
                    );
                    toast.success('signature saved successfully');
                  }}
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    // console.log(sig?.clear);
                  }}
                  className='!text-pink-300'
                >
                  Clear
                </Button>
              </div>
            </>
          )}
        </div>
        <div className='font-bold text-2xl text-[#6B7A99] my-8'>
          Login Details
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <Controller
            control={control}
            name='currentPassword'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='Current Password'
                placeholder='Enter Current Password'
                {...field.field}
              />
            )}
          />
          <Controller
            control={control}
            name='newPassword'
            render={(field) => (
              <EditableFormItemAlt
                isEditing={isEditing}
                label='New Password'
                placeholder='Enter New Password'
                {...field.field}
              />
            )}
          />
        </div>
      </div>
    </form>
  );
}
