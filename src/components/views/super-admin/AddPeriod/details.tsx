'use client';

import StepAccordion from '@/components/accordions/StepAccordion';
import FormInput from '@/components/input/formInput';
import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';

const Biodata = () => {
  const [schoolaName, setSchoolName] = useState<string | number>('');

  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>Set Up Curriculum Details</h2>
      <p>Kindly enter the details of the school below:</p>

      <div className='bg-[#F4F9FF] py-6 mt-5 text-center text-xl font-bold'>
        <h1>Week 1 - Period 1</h1>
      </div>

      <label
        htmlFor='document-upload'
        className='flex items-center justify-center py-4 my-4 bg-[#F5FFF4]'
      >
        <div>
          Click or drag document here to{' '}
          <span className='text-primary'>Import</span>
        </div>
        <div className='w-1' />
        <FiUpload className='h-4 w-4 text-primary' />
      </label>

      <input className='hidden' id='document-upload' type='file' />

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
      <div className='flex flex-col gap-4'>
        <StepAccordion taskName='Step 1' />
        <StepAccordion taskName='Step 2' />
        <StepAccordion taskName='Step 3' />
        <StepAccordion taskName='Step 4' />
        <StepAccordion taskName='Step 5' />
      </div>
    </section>
  );
};

export default Biodata;