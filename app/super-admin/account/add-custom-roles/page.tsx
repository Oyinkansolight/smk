/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import BackButton from '@/components/accordions/BackButton';
import SearchInput from '@/components/input/SearchInput';
import Input from '@/components/input/formInput';
import Stepper from '@/components/stepper';
import { useGetCurrentSession, useGetProfile } from '@/server/auth';
import {
  useCreateClassArm,
  useGetTeachersListByInstitution,
} from '@/server/institution';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const permissions = [
  {
    label: 'CREATE_INSTITUTION',
    description: 'You can create and add new institution as an admin',
  },
  {
    label: 'VIEW_INSTITUTION',
    description: 'You can view details of institution as an admin',
  },
  {
    label: 'EDIT_INSTITUTION',
    description: 'You can edit details of institution as an admin',
  },
  {
    label: 'DELETE_INSTITUTION',
    description: 'You can delete institution as an admin',
  },
  {
    label: 'CREATE_INSTITUTION',
    description: 'You can create and add new institution as an admin',
  },
  {
    label: 'VIEW_INSTITUTION',
    description: 'You can view details of institution as an admin',
  },
  {
    label: 'EDIT_INSTITUTION',
    description: 'You can edit details of institution as an admin',
  },
  {
    label: 'DELETE_INSTITUTION',
    description: 'You can delete institution as an admin',
  },
];
const AddClass = () => {
  const { data: institutionProfile } = useGetProfile();
  const { data: currentSessionInfo } = useGetCurrentSession();
  const { data: staffs } = useGetTeachersListByInstitution({
    instituteId: institutionProfile?.userInfo?.esiAdmin?.id,
    limit: 1000,
  });

  const [roleName, setRoleName] = useState<string | number>();
  const [roleDesc, setRoleDesc] = useState<string | number>();
  const [activatedPermissions, setActivatedPermissions] = useState();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  const [stage, setStage] = useState(1);

  const handleCreateStaff = useCreateClassArm();

  const stepperData = [
    {
      stage: 1,
      stageName: 'Roles And Permissions',
    },
  ];

  return (
    <section className='md:px-[60px] px-5 py-6'>
      <BackButton />

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Manage Role</h1>

      <Stepper
        variant='#007AFF'
        section='super-admin'
        currentStage={stage}
        data={stepperData}
      />

      <div className='table-add-permission mt-7 lg:px-20 px-4 py-10 pb-4 bg-white'>
        <h4 className='text-gray-500'>Kindly enter the details below:</h4>
        <div className='my-4 grid md:grid-cols-2 gap-4 py-2 border-b'>
          <Input
            label='Role Name'
            placeholder='Enter Details Here'
            name='roleName'
            formValue=''
            setFormValue={setRoleName}
            register={register}
            helper={
              errors?.roleName && {
                message: 'Role Name is required',
                type: 'danger',
              }
            }
          />
          <Input
            label='Role Description'
            placeholder='Enter Details Here'
            name='roleDesc'
            formValue=''
            setFormValue={setRoleDesc}
            register={register}
            helper={
              errors?.roleDesc && {
                message: 'Role description is required',
                type: 'danger',
              }
            }
          />
        </div>
        <div className='py-4'>
          <div className='grid grid-cols-12 gap-2 items-center justify-center'>
            <div className='col-span-5'>
              <div className='mb-2 bg-[#F6F9FC] p-2 text-center w-full'>
                <h2 className='text-base'>Permissions</h2>
              </div>
              <div className='border bg-[#F6F9FC] p-2 rounded-lg w-full'>
                <div className='px-6 mb-3'>
                  <SearchInput />
                </div>

                {permissions.map((v, id) => (
                  <div key={id} className='flex space-x-3 p-3 items-center'>
                    <input type='checkbox' name='' id='' />
                    <p className='text-base font-medium uppercase'>{v.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className='col-span-2'>
              <div className='space-y-16 flex flex-col items-center justify-center'>
                <button className='bg-[#F6F9FC] p-2 rounded-md w-min'>
                  <IoIosArrowForward className='text-[#008146] text-4xl font-normal' />
                </button>
                <button className='bg-[#F6F9FC] p-2 rounded-md w-min'>
                  <IoIosArrowBack className='text-[#008146] text-4xl font-normal' />
                </button>
              </div>
            </div>
            <div className='col-span-5'>
              <div className='mb-2 bg-[#F6F9FC] p-2 text-center w-full'>
                <h2 className='text-base'>Activated Permissions</h2>
              </div>
              <div className='border bg-[#FFF] p-2 rounded-lg w-full'>
                <div className='px-6 mb-3'>
                  <SearchInput />
                </div>

                {permissions.map((v, id) => (
                  <div key={id} className='flex space-x-3 p-3 items-center'>
                    <input type='checkbox' name='' id='' />
                    <p className='text-base font-medium uppercase'>{v.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <button className='border  bg-[#016938] text-white rounded px-4 py-2'>
            Create
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddClass;
