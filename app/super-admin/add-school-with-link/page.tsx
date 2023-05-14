'use client';

import FormInput from '@/components/input/formInput';
import Success from '@/components/modal/Success';
import Stepper from '@/components/stepper';
import logger from '@/lib/logger';
import { useInviteInstitution } from '@/server/institution';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';


const AddSchoolLink = () => {
  const [stage] = useState(1);
  const [schoolName, setSchoolName] = useState<string | number>('');
  const [schoolEmail, setSchoolEmail] = useState<string | number>('');
  const [isOpen, setisOpen] = useState(false);

  const inviteInstitution = useInviteInstitution();

  const stepperData = [
    {
      stage: 1,
      stageName: 'Details',
    },
  ];

  return (
    <section className='md:px-[60px] px-5 py-6'>
      <Link href='/super-admin'>
        <div className='flex items-center space-x-4'>
          <Image
            src='/svg/back.svg'
            width={10}
            height={10}
            alt='back'
            className='h-4 w-4'
          />
          <h3 className='text-[10px] font-medium'>Back</h3>
        </div>
      </Link>

      <h1 className='mt-5 mb-6 text-2xl font-bold'>
        Send School Creation Link{' '}
      </h1>

      <Stepper
        variant='#008146'
        section='super_admin'
        currentStage={stage}
        data={stepperData}
      />

      <div className='table-add-student mt-7 lg:px-20 px-4 py-10 pb-4 bg-white'>
        <h2 className='text-2xl font-bold'>Details</h2>
        <p>Kindly enter the details of the school below:</p>

        <div className='my-10 '>
          <FormInput
            label='Name*'
            setFormValue={setSchoolName}
            formValue={schoolName}
            placeholder='Detail here'
          />
        </div>
        <div className='mb-10   '>
          <FormInput
            type='email'
            label='Email to send the link to*'
            setFormValue={setSchoolEmail}
            formValue={schoolEmail}
            placeholder='Name@mail.com'
          />
        </div>

        <div className='my-6 flex justify-end'>
          <div className='flex space-x-6'>
            <button
              onClick={async () => {
                toast.info('Sending Link...');
                try {
                  const response = await inviteInstitution.mutateAsync({
                    instituteName: schoolName as string,
                    instituteEmail: schoolEmail as string,
                  });

                  if (response.data) {
                    setisOpen(true);
                    // setTimeout(() => {
                    //   router.push(
                    //     `/onboard?token=${response.data.data.data.token}`
                    //   );
                    // }, 3000);
                  }
                } catch (error) {
                  logger(error);
                }
              }}
              className='w-full rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
            >
              Send
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <Success
          title='Institution link sent successfully'
          description='A link has been generated and sent to the school to create an account.'
          link='/super-admin/all-school'
          textLink='Manage School'
        />
      )}
    </section>
  );
};

export default AddSchoolLink;