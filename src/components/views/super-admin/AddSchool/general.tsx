/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Dragdrop from '@/components/input/dragdrop';
import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import React from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

interface BiodataProps {
  schoolName: string | number;
  setSchoolName: (v: string | number) => void;
  schoolEmail: string | number;
  setSchoolEmail: (v: string | number) => void;
  imageName: string;
  setImageName: (v: string | undefined) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setImageData: (v: any) => void;
  instituteType: string | number;
  setInstituteType: any;
}

const Biodata = ({
  imageName,
  setImageData,
  setImageName,
  schoolEmail,
  schoolName,
  setSchoolEmail,
  setSchoolName,
  instituteType,
  setInstituteType,
}: BiodataProps) => {
  const institutions = ['ECCDE', 'PRIMARY', 'SECONDARY', 'TERTIARY'];

  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>General Details</h2>
      <p>Kindly enter the details of the institution below:</p>

      <div className='my-10 grid md:grid-cols-2 gap-6'>
        <FormInput
          label='Institution Name*'
          setFormValue={setSchoolName}
          formValue={schoolName}
          placeholder='Details here'
        />
        <div>
          {/* <label htmlFor='' className='text-xs font-bold'>
            Upload School Logo*{' '}
          </label>
          <input
            type='text'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          /> */}
          <Dragdrop
            setImageName={setImageName}
            imageName={imageName}
            label='Upload Institution Logo*'
            setImageData={setImageData}
          />
        </div>
      </div>
      <div className='my-10 grid md:grid-cols-2 gap-6'>
        <div className='w-full'>
          <FormInput
            label='Institution Official Email*'
            setFormValue={setSchoolEmail}
            formValue={schoolEmail}
            placeholder='Details here'
            validation={{
              required: 'Valid email is required',
            }}
          />
        </div>

        <FormSelect
          label='Select Institue Type*'
          formValue={instituteType}
          setFormValue={setInstituteType}
          options={institutions}
        />
      </div>
    </section>
  );
};

export default Biodata;
