'use client';

import Button from '@/components/buttons/Button';
import FormInput from '@/components/input/formInput';
import { generate } from 'generate-password';
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
  password: string;
  setPassword: (password: string) => void;
}

const Account = ({
  schoolEmail,
  setSchoolEmail,
  password,
  setPassword,
}: // password
// setPassword
AccountProps) => {
  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>Account Details</h2>
      <p>Kindly enter the details of the institution below:</p>

      <div className='my-10 gap-6'>
        <FormInput
          label='Login details *'
          setFormValue={setSchoolEmail}
          formValue={schoolEmail}
          placeholder='name@mail.com'
          disabled
        />
      </div>

      <div className='mb-10 flex items-center  gap-6 w-1/2'>
        <FormInput
          label='Enter Password*'
          setFormValue={(v) => setPassword(v as string)}
          formValue={password}
          placeholder='Details here'
        />
        <div className='mt-4'>
          <Button onClick={() => setPassword(generate({ length: 10 }))}>
            Generate
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Account;
