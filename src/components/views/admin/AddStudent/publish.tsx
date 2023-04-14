'use client';

import FormInput from '@/components/input/formInput';
import { useState } from 'react';

const Publish = () => {
  const [formValue, setFormValue] = useState<string | number>('');

  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Contact Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <FormInput
          label='Select class'
          setFormValue={setFormValue}
          formValue={formValue}
          placeholder='Details here'
        />
        <div>{/* <DropdownSelect label='Select class' /> */}</div>
      </div>
    </section>
  );
};

export default Publish;
