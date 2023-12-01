/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';

/* eslint-disable @typescript-eslint/no-explicit-any */

type Iprops = {
  register: any;
  errors: any;
};
const qaulifications: string[] = [
  'NCE',
  'OND',
  'HND',
  'Bachelors Degree',
  'Masters Degree',
  'Doctoral Degree',
];

const Education = ({ register, errors }: Iprops) => {
  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Employment History</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid md:grid-cols-2 gap-6 pb-3 border-b'>
        <div>
          <FormInput
            label='Name of School'
            placeholder='Details here'
            name='schoolname'
            register={register}
            validation={{
              required: 'School Name is required',
            }}
            helper={
              errors?.schoolname && {
                message: errors?.schoolname?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormInput
            label='Staff ID'
            placeholder='Details here'
            name='staffId'
            register={register}
            validation={{
              required: 'Satff ID is required',
            }}
            helper={
              errors?.staffId && {
                message: errors?.staffId?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>

      <div className='my-10 grid md:grid-cols-2 gap-6'>
        <div>
          <FormInput
            label='Date Posted to Current School'
            placeholder='Details here'
            name='dateposted'
            type='date'
            register={register}
            validation={{
              required: 'Date Posted is required',
            }}
            helper={
              errors?.dateposted && {
                message: errors?.dateposted?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormSelect
            label='Highest Qualification'
            name='qualification'
            options={qaulifications}
            register={register}
            validation={{
              required: 'Highest Qualificationis required',
            }}
            helper={
              errors?.qualification && {
                message: errors?.qualification?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
      <div className='my-10 grid md:grid-cols-2 gap-6'>
        <div>
          <FormInput
            label='Date of First Appointment'
            placeholder='Details here'
            name='dateappointed'
            type='date'
            register={register}
            validation={{
              required: 'Date PostAppointeded is required',
            }}
            helper={
              errors?.dateappointed && {
                message: errors?.dateappointed?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormInput
            label='Retirement Date'
            placeholder='Details here'
            name='retirementDate'
            type='date'
            register={register}
            validation={{
              required: 'Retirement Date is required',
            }}
            helper={
              errors?.retirementDate && {
                message: errors?.retirementDate?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
      <div className='my-10 grid md:grid-cols-2 gap-6'>
        <div>
          <FormInput
            label='Salary Grade Level'
            placeholder='Details here'
            name='salarygrade'
            type='text'
            register={register}
            validation={{
              required: 'Salary Grade Level is required',
            }}
            helper={
              errors?.salarygrade && {
                message: errors?.salarygrade?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormInput
            label='Job Title '
            placeholder='Details here'
            name='jobTitle'
            type='text'
            register={register}
            validation={{
              required: 'Retirement Date is required',
            }}
            helper={
              errors?.jobTitle && {
                message: errors?.jobTitle?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>

      {/* 
      <FormSelect
            label='Date Posted to Current School'
            name='employmentType'
            options={employmentOptions}
            register={register}
            validation={{
              required: 'Employment Type is required',
            }}
            helper={
              errors?.employmentType && {
                message: errors?.employmentType?.message,
                type: 'danger',
              }
            }
          /> */}
    </section>
  );
};

export default Education;
