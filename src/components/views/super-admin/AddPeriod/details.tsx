'use client';

import FormInput from '@/components/input/formInput';
import { useState } from 'react';

const Biodata = () => {
  const [schoolaName, setSchoolName] = useState<string | number>('');

  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>Set Up Curriculum Details</h2>
      <p>Kindly enter the details of the school below:</p>

      <div className='bg-[#F4F9FF] py-6 mt-5 text-center text-xl font-bold'>
        <h1>Week 1 - Period 1</h1>
      </div>

      <div className='my-10  gap-6 w-1/2'>
        <FormInput
          label='Title/Topic*'
          setFormValue={setSchoolName}
          formValue={schoolaName}
          placeholder='Name'
        />
      </div>
      <div className='mb-10  gap-6'>
        <FormInput
          label='Instructional Objective'
          setFormValue={setSchoolName}
          formValue={schoolaName}
          placeholder='Enter details here'
        />
      </div>
      <div className='mb-10  gap-6 grid grid-cols-2'>
        <FormInput
          label='Instructional Objective'
          setFormValue={setSchoolName}
          formValue={schoolaName}
          placeholder='Name'
        />
        <FormInput
          label='Lesson Procedure*'
          setFormValue={setSchoolName}
          formValue={schoolaName}
          placeholder='Name'
        />
      </div>
      <div className='mb-10  gap-6'>
        <FormInput
          label='Instructional Materials'
          setFormValue={setSchoolName}
          formValue={schoolaName}
          placeholder='Enter details here'
        />
      </div>
      <div className='mb-10  gap-6 border-b pb-10'>
        <FormInput
          label='Teacher Preparation for the lesson'
          setFormValue={setSchoolName}
          formValue={schoolaName}
          placeholder='Enter details here'
        />
      </div>

      <div className='my-10  gap-6 w-1/2'>
        <FormInput
          label='Step 1*'
          setFormValue={setSchoolName}
          formValue={schoolaName}
          placeholder='Name'
        />
      </div>

      <div className='mb-10  gap-6 grid grid-cols-2'>
        <FormInput
          label='Lesson Procedure*'
          setFormValue={setSchoolName}
          formValue={schoolaName}
          placeholder='Name'
        />
        <FormInput
          label='Time*'
          setFormValue={setSchoolName}
          formValue={schoolaName}
          placeholder='Name'
        />
      </div>
      <div className='mb-10  gap-6'>
        <FormInput
          label='Teacher Activity'
          setFormValue={setSchoolName}
          formValue={schoolaName}
          placeholder='Enter details here'
        />
      </div>
      <div className='mb-10 pb-10 gap-6'>
        <FormInput
          label='Instructional Objective'
          setFormValue={setSchoolName}
          formValue={schoolaName}
          placeholder='Enter details here'
        />
      </div>
    </section>
  );
};

export default Biodata;
