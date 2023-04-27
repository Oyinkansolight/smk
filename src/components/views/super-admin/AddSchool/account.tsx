'use client';

import FormInput from '@/components/input/formInput';
import logger from '@/lib/logger';
import React from 'react';

interface AccountProps {
  schoolName: string | number;
  setSchoolName: (v: string | number) => void;
  schoolEmail: string | number;
  setSchoolEmail: (v: string | number) => void;
  imageName: string;
  setImageName: (v: string | undefined) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setImageData: (v: any) => void;
}

const Account = ({
  schoolEmail,
  setSchoolEmail,
}: // password
// setPassword
AccountProps) => {
  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>Account Details</h2>
      <p>Kindly enter the details of the school below:</p>

      <div className='my-10 gap-6'>
        <FormInput
          label='Login details *'
          setFormValue={setSchoolEmail}
          formValue={schoolEmail}
          placeholder='name@mail.com'
          disabled
        />
      </div>

      <div className='mb-10  gap-6 w-1/2'>
        <FormInput
          label='Enter Password*'
          setFormValue={() => logger('password')}
          formValue='test_password'
          placeholder='Details here'
        />
      </div>
    </section>
  );
};

export default Account;
