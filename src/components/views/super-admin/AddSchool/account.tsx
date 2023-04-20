'use client';

import Dragdrop from '@/components/input/dragdrop';
import FormInput from '@/components/input/formInput';
import React from 'react';

interface BiodataProps {
  schoolName1: string | number;
  setSchoolName1: (v: string | number) => void;
  schoolEmail1: string | number;
  setSchoolEmail1: (v: string | number) => void;
  imageName1: string;
  setImageName1: (v: string | undefined) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setImageData1: (v: any) => void;
}

const Biodata = ({
  imageName1: imageName,
  schoolEmail1: schoolEmail,
  schoolName1: schoolName,
  setImageData1: setImageData,
  setImageName1: setImageName,
  setSchoolEmail1: setSchoolEmail,
  setSchoolName1: setSchoolName,
}: BiodataProps) => {
  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>General Details</h2>
      <p>Kindly enter the details of the school below:</p>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <FormInput
          label='School Name*'
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
            label='Upload School Logo*'
            setImageData={setImageData}
          />
        </div>
      </div>
      <div className='w-full'>
        <FormInput
          label='School Official Email*'
          setFormValue={setSchoolEmail}
          formValue={schoolEmail}
          placeholder='Details here'
        />
      </div>
    </section>
  );
};

export default Biodata;