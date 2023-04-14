'use client';

import FormInput from '@/components/input/formInput';
import { useState } from 'react';

const Biodata = () => {
  const [schoolaName, setSchoolName] = useState<string | number>('');

  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>General Details</h2>
      <p>Kindly enter the details of the school below:</p>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <FormInput
          label='School Name*'
          setFormValue={setSchoolName}
          formValue={schoolaName}
          placeholder='Details here'
        />
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Upload School Logo*{' '}
          </label>
          <input
            type='text'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
      </div>
      <div className='w-full'>
        <label htmlFor='' className='text-xs font-bold'>
          School Offical Email*{' '}
        </label>
        <input
          type='text'
          className='mt-1 w-full border p-4'
          placeholder='Details here'
        />
      </div>
    </section>
  );
};

export default Biodata;
