'use client';

import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import { useState } from 'react';

const Biodata = () => {
  const [location, setLocation] = useState<string | number>('');
  const [town, settown] = useState<string | number>('');

  const options = ['Lagos', 'Ogun', 'Oyo', 'Edo'];
  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>Location Details</h2>
      <p>Kindly enter the details of the school below:</p>

      <div className='space-y-10 mt-10'>
        <div className=' w-full gap-6'>
          <FormInput
            label='Enter Address'
            setFormValue={setLocation}
            formValue={location}
            placeholder='Details here'
          />
        </div>
        <div className='w-full'>
          <FormSelect
            label='Select Town*'
            formValue={town}
            setFormValue={settown}
            options={options}
          />
        </div>

        <div className='w-full mt-4'>
          <FormSelect
            label='Select Local Government '
            formValue={town}
            setFormValue={settown}
            options={options}
          />
        </div>
      </div>
    </section>
  );
};

export default Biodata;
