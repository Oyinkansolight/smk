/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import EditableFormItemAlt from '@/components/cards/EditableFormItemAlt';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useUpdateStaff } from '@/server/government/staff';
import { useGetLocalGovernments } from '@/server/onboard';
import { Staff, TrainingDetails } from '@/types/institute';
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
  const [, setIsLoading] = useState(false);
  // const [userLga, setUserLga] = useState('');
  // const [townByLgaId, setTownByLgaId] = useState('');
  const update = useUpdateStaff();
  const { data: localGoverments } = useGetLocalGovernments();

  // useEffect(() => {
  //   async function flattenTowns() {
  //     const allLgas: any = await localGoverments?.map((local) => {
  //       console.log(local.id == initStaff?.lga);
  //       return local.towns;
  //     });

  //     const flattened: any = [].concat(...allLgas);



  //     console.log(flattened.filter(i => {
  //       console.log(i.id == initStaff?.lga);

  //       return i.id === initStaff?.lga
  //     }));

  //     const filteredLga = flattened?.filter((town) => town.name.toLowerCase() === initStaff?.lga?.toLowerCase())[0];
  //     const filteredIds = flattened?.filter((town) => town.id === initStaff?.lga)[0];
  //     setUserLga(filteredLga);
  //     setTownByLgaId(filteredIds);
  //   };

  //   flattenTowns();

  //   console.log(userLga, townByLgaId);
  // }, [localGoverments, initStaff?.lga, userLga, townByLgaId])



  const onSubmit = async (data: any) => {
    if (initStaff?.id) {
      setIsLoading(true);

      const trainingDetails: TrainingDetails[] = [];
      for (let i = 0; i < 10; i++) {
        if (data['name' + i] && data['year' + i]) {
          trainingDetails.push({
            titleOfTraining: data['name' + i],
            year: data['year' + i],
          });
        }
      }

      const payload: Staff = {
        // profileImg: data.,
        lga: data.lga,
        email: data.email,
        id: initStaff?.id,
        dob: data.dateOfBirth,
        address: data.address,
        nextOfKin: data.nextOfKin,
        gender: data.gender.toUpperCase(),
        phoneOfNextOfKin: data.phoneNextOfKin,
        addressOfNextOfKin: data.addressNextOfKin,
        firstName: (data.fullName as string).split(' ')[0],
        lastName: (data.fullName as string).split(' ')[1],
        relationshipToNextOfKin: data.relationshipNextOfKin,
        employmentDetails: {
          datePosted: data.datePosted,
          retirementDate: data.retirementDate,
          highestQualification: data.highestQualification,
          DateOfFirstAppointment: data.dateOfAppointment,
        },
        trainingDetails
      }

      if (data.phone) {
        payload.phoneNumber = data.phone;
      }

      try {
        const response = await update.mutateAsync(payload);

        if (response) {
          toast.success('Staff Updated successful');
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
    if (initStaff) {
      const userLga = initStaff?.lga && initStaff?.lga.length < 20 ? initStaff?.lga : 'None';

      setValue('email', (initStaff?.user ?? {})?.email);
      setValue('phone', (initStaff?.user ?? {})?.phoneNumber);
      setValue('gender', initStaff?.gender);
      setValue(
        'fullName',
        `${(initStaff?.user ?? {})?.firstName} ${(initStaff?.user ?? {})?.lastName
        }`
      );
      setValue('dateOfBirth', initStaff.dob);
      setValue('address', (initStaff?.user ?? {})?.address);
      setValue('school', initStaff?.institution?.instituteName);
      setValue('lga', userLga);
      setValue('nextOfKin', initStaff?.nextOfKin);
      setValue('relationshipNextOfKin', initStaff?.relationshipToNextOfKin);
      setValue('addressNextOfKin', initStaff?.addressOfNextOfKin);
      setValue('phoneNextOfKin', initStaff?.phoneOfNextOfKin);
      setValue('datePosted', initStaff?.employmentDetails?.datePosted);
      setValue(
        'highestQualification',
        initStaff?.employmentDetails?.highestQualification
      );
      setValue(
        'dateOfAppointment',
        initStaff?.employmentDetails?.DateOfFirstAppointment
      );
      setValue('retirementDate', initStaff?.employmentDetails?.retirementDate);
      if (initStaff?.trainingDetails && initStaff.trainingDetails.length > 0) {
        initStaff.trainingDetails?.map((training, index) => {
          setValue('name' + index, training.titleOfTraining);
          setValue('year' + index, training.year);
        });
      }
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
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {initStaff?.trainingDetails && initStaff.trainingDetails.length > 0 ? (
            initStaff.trainingDetails?.map((training, index) => (
              <>
                <Controller
                  control={control}
                  name={'name' + index}
                  render={(field) => (
                    <EditableFormItemAlt
                      isEditing={isEditing}
                      label='Name/Title of Training'
                      placeholder='Enter Name/Title of Training'
                      {...field.field} />
                  )} />

                <Controller
                  control={control}
                  name={'year' + index}
                  render={(field) => (
                    <EditableFormItemAlt
                      isEditing={isEditing}
                      label='Year'
                      placeholder='Enter Year'
                      {...field.field} />
                  )} />
              </>
            ))
          ) : (
            <>
              <Controller
                control={control}
                name='name1'
                render={(field) => (
                  <EditableFormItemAlt
                    isEditing={isEditing}
                    label='Name/Title of Training'
                    placeholder='Enter Name/Title of Training'
                    {...field.field} />
                )} />

              <Controller
                control={control}
                name='year1'
                render={(field) => (
                  <EditableFormItemAlt
                    isEditing={isEditing}
                    label='Year'
                    placeholder='Enter Year'
                    {...field.field} />
                )} />
            </>
          )}

        </div>


        <div className='font-bold text-2xl text-[#6B7A99] my-8'>
          Employment Details
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
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
