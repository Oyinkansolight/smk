/* eslint-disable @typescript-eslint/no-explicit-any */
import FormInput from '@/components/input/formInput';
import logger from '@/lib/logger';
import { useGetAdminRoles, useInviteAdmin } from '@/server/onboard';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ImSpinner } from 'react-icons/im';
import { FallingLines } from 'react-loader-spinner';
import Select from 'react-select';
import { toast } from 'react-toastify';
import Toggle from 'react-toggle';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler: () => void;
}

function AddAdmin({ onClickHandler }: propType) {
  const { data: allRoles, isLoading } = useGetAdminRoles();
  // const [role, setRole] = useState<string | number>('');
  // const [schoolEmail, setSchoolEmail] = useState<string | number>('');
  const [options, setOptions] = useState([]);
  const [sendEmail, setSendEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, getValues, control } = useForm();
  const { mutateAsync } = useInviteAdmin();

  console.log(allRoles);

  useEffect(() => {
    if (!isLoading) {
      const allPatterns = allRoles.data.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      });

      setOptions(allPatterns);
      logger(allPatterns);
      // logger(allRoles)
    }
  }, [allRoles, isLoading]);

  function handleSendEmail() {
    setSendEmail(!sendEmail);
  }
  const handleSubmit = async () => {
    const email: string = getValues('email');
    const assignedRole: number = getValues('assignedRole').value;
    if (!email || !assignedRole) {
      toast.error('All field are required');
      return;
    }
    setLoading(true);

    const response = await mutateAsync({
      email,
      role: assignedRole,
      sendEmail,
    });

    if (response.status === 201) {
      onClickHandler();
      toast.success('Admin invite sent successfully');
      setLoading(false);
    } else {
      console.log(response.data);
      setLoading(false);

      toast.error('An error occurred');
    }
  };

  return (
    <div className='fixed inset-0 z-[999] grid place-content-center rounded-sm bg-black/30'>
      <div className='flex w-[700px] flex-col space-y-4 bg-white p-4'>
        <div className='flex justify-end'>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />
          </button>
        </div>

        {!isLoading ? (
          <div className='mt-4 space-y-4 px-10 pb-10'>
            <h1 className='text-center text-4xl font-bold'>Invite New Admin</h1>

            <p className='text-center'>Kindly enter the details below: </p>

            <div className='w-full'>
              <FormInput
                name='name'
                label='Enter Name'
                register={register}
                // setFormValue={setSchoolEmail}
                // formValue={schoolEmail}
                placeholder='Details here'
              />
            </div>

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
            <div className='w-full flex flex-col space-y-1'>
              <label htmlFor='' className='text-xs font-bold'>
                Send email to admin
              </label>
              <Toggle
                defaultChecked={sendEmail}
                icons={false}
                style={{ width: '23px !important' }}
                onChange={handleSendEmail}
              />
            </div>

            <div className='w-full flex flex-col space-y-2'>
              <label htmlFor='' className='text-xs font-bold'>
                Select admin type
              </label>

              <Controller
                control={control}
                name='assignedRole'
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      options={options ?? []}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          height: '58px',
                        }),
                      }}
                    />
                  );
                }}
              />
            </div>

            <div className='flex justify-center'>
              <button
                onClick={handleSubmit}
                className='w-max rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
              >
                {loading ? <ImSpinner /> : 'Send Invite'}
              </button>
            </div>
          </div>
        ) : (
          <div className='flex justify-center items-center h-[45vh] mt-4 px-5 pb-10'>
            <FallingLines color='#4fa94d' width='100' visible={true} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddAdmin;
