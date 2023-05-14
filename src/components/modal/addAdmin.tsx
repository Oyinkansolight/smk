import FormInput from '@/components/input/formInput';
import logger from '@/lib/logger';
import { useGetAdminRoles, useInviteAdmin } from '@/server/onboard';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FallingLines } from 'react-loader-spinner';
import Select from 'react-select';
import { toast } from 'react-toastify';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler: () => void;
}

function AddAdmin({ onClickHandler }: propType) {
  const { data: allRoles, isLoading } = useGetAdminRoles();
  const [role, setRole] = useState<string | number>('');
  const [schoolEmail, setSchoolEmail] = useState<string | number>('');
  const [options, setOptions] = useState([]);
  const { register, getValues, control } = useForm();
  const { mutateAsync } = useInviteAdmin()

  useEffect(() => {
    if (!isLoading) {
      const allPatterns = allRoles.data.roles.map((item: any) => {
        return {
          value: item.id,
          label: item.name
        }
      })

      setOptions(allPatterns);
      logger(allPatterns)
      // logger(allRoles)
    }
  }, [allRoles, isLoading])

  const handleSubmit = async () => {
    const email: string = getValues("email")
    const assignedRole: number = getValues("assignedRole").value

    const response = await mutateAsync({
      email,
      role: assignedRole
    })

    if (response.status === 201) {
      onClickHandler()
      toast.success("Admin invite sent successfully")
    } else {
      toast.error("An error occurred")
    }


  }

  return (
    <div className='fixed inset-0 z-[999] grid place-content-center rounded-sm bg-black/30'>
      <div className='flex w-[700px] flex-col space-y-4 bg-white p-4'>
        <div className='flex justify-end'>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />
          </button>
        </div>

        {!isLoading ?
          <div className='mt-4 space-y-4 px-10 pb-10'>
            <h1 className='text-center text-4xl font-bold'>Invite New Admin</h1>

            <p className='text-center'>Kindly enter the details below: </p>

            <div className='w-full'>
              <FormInput
                type='email'
                name='email'
                label='Enter Email'
                register={register}
                // setFormValue={setSchoolEmail}
                // formValue={schoolEmail}
                placeholder='Details here'
              />
            </div>

            <div className='w-full'>
              {/* <FormSelect
                label='Select Access Role'
                setFormValue={setRole}
                formValue={role}
                options={options}
              /> */}

              <Controller
                control={control}
                name='assignedRole'
                render={({ field }) => {
                  return <Select
                    {...field}
                    options={options ?? []}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        height: '58px',
                      }),
                    }}
                  />;
                }}
              />
            </div>

            <div className='flex justify-center'>
              <button
                onClick={handleSubmit}
                className='w-max rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
              >
                Send Invite
              </button>
            </div>
          </div> : (
            <div className='flex justify-center items-center h-[45vh] mt-4 px-5 pb-10'>
              <FallingLines
                color="#4fa94d"
                width="100"
                visible={true}
              />
            </div>
          )}
      </div>
    </div>
  );
}

export default AddAdmin;
