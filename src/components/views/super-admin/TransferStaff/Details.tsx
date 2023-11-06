/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormInput from '@/components/input/formInput';
import FormSelectInstitution from '@/components/input/formSelectInstitution';
import FormSelectTeachers from '@/components/input/formSelectteachers';

type Iprops = {
  register: any;
  errors: any;
  staffs: any;
  schools: any;
};

const Biodata = ({ register, errors, staffs, schools }: Iprops) => {
  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Bio Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 w-full gap-6'>
        <FormSelectTeachers
          label='Select staff to transfer'
          name='staffId'
          options={staffs}
          register={register}
          validation={{
            required: 'Staff Id is required',
          }}
          helper={
            errors?.staffId && {
              message: errors?.staffId?.message,
              type: 'danger',
            }
          }
        />
      </div>
      <div className='my-10 w-full gap-6'>
        <FormSelectInstitution
          label='Select new institution'
          name='newInstitutionId'
          options={schools}
          register={register}
          validation={{
            required: 'New Institution is required',
          }}
          helper={
            errors?.newInstitutionId && {
              message: errors?.newInstitutionId?.message,
              type: 'danger',
            }
          }
        />
      </div>

      <div className='my-10 '>
        <FormInput
          label='Enter Reason for Transfer'
          placeholder='Details here'
          name='reason'
          register={register}
          validation={{
            required: 'Reason for transfer is required',
          }}
          helper={
            errors?.reason && {
              message: errors?.reason?.message,
              type: 'danger',
            }
          }
        />
      </div>
    </section>
  );
};

export default Biodata;
