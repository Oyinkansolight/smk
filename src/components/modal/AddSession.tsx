import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import React from 'react';
import { ImSpinner2 } from 'react-icons/im';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler?: () => void;
  SubmitHandler?: () => void;
  setsession: (v: string | number) => void;
  setinstitutionType: (v: string | number) => void;
  setNumberOfWeeks: (v: string | number) => void;
  setstartDate: (v: string | number) => void;
  setendDate: (v: string | number) => void;
  setfirstendDate: (v: string | number) => void;
  setsecondendDate: (v: string | number) => void;
  setthirdendDate: (v: string | number) => void;
  setfirststartDate: (v: string | number) => void;
  setsecondstartDate: (v: string | number) => void;
  setthirdstartDate: (v: string | number) => void;
  setfirstnoofweeks: (v: string | number) => void;
  setsecondnoofweeks: (v: string | number) => void;
  setthirdnofweeks: (v: string | number) => void;
  loading: boolean;
}

function AddActivityName({
  onClickHandler,
  setsession,
  setinstitutionType,
  setstartDate,
  setendDate,
  SubmitHandler,
  setfirstendDate,
  setsecondendDate,
  setthirdendDate,
  setfirststartDate,
  setsecondstartDate,
  setthirdstartDate,
  setfirstnoofweeks,
  setsecondnoofweeks,
  setthirdnofweeks,

  loading,
}: propType) {
  const sessions = [
    'Academic Year 2022/2023',
    'Academic Year 2023/2024',
    'Academic Year 2024/2025',
    'Academic Year 2025/2026',
    'Academic Year 2026/2027',
    'Academic Year 2027/2028',
    'Academic Year 2028/2029',
  ];
  const numbers = Array.from({ length: 100 }, (_, i) => (i + 1).toString());

  return (
    <div className='fixed inset-0 z-[9999999999] py-10 grid place-content-center rounded-sm bg-black/30'>
      <div className='flex md:w-[800px] w-[500px] max-h-[700px] overflow-y-auto flex-col space-y-4 bg-white p-4'>
        <div className='flex justify-end'>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />
          </button>
        </div>

        <div className='mt-4 space-y-4 px-10 pb-10'>
          <h1 className='text-center text-4xl font-bold'>Add Session</h1>
          <p className='text-center'>
            Kindly select the appropriate options below:
          </p>

          <div className='w-full grid md:grid-cols-2 gap-4'>
            <FormSelect
              label='Select Session'
              name='schoolType'
              options={sessions}
              setFormValue={setsession}
            />

            <FormSelect
              label='Select School Type'
              name='schoolType'
              options={[
                'ECCDE',
                'Primary School',
                'Secondary School',
                'Tertiary School',
              ]}
              setFormValue={setinstitutionType}
            />

            <FormInput
              label='Select Start Date'
              name='schoolType'
              type='date'
              placeholder='Select an option'
              setFormValue={setstartDate}
            />
            <FormInput
              label='Select End Date'
              name='schoolType'
              type='date'
              placeholder='Select an option'
              setFormValue={setendDate}
            />
          </div>
          <h1 className='text-lg text-[#A5A5A5]'>First Term</h1>
          <div className='w-full grid md:grid-cols-2 gap-4'>
            <FormSelect
              label='Select Number of Weeks'
              name='schoolType'
              options={numbers}
              setFormValue={setfirstnoofweeks}
            />
            <div></div>
            <FormInput
              label='Select Start Date'
              name='schoolType'
              type='date'
              placeholder='Select an option'
              setFormValue={setfirststartDate}
            />
            <FormInput
              label='Select End Date'
              name='schoolType'
              type='date'
              placeholder='Select an option'
              setFormValue={setfirstendDate}
            />
          </div>
          <h1 className='text-lg text-[#A5A5A5]'>Second Term</h1>
          <div className='w-full grid md:grid-cols-2 gap-4'>
            <FormSelect
              label='Select Number of Weeks'
              name='schoolType'
              options={numbers}
              setFormValue={setsecondnoofweeks}
            />
            <div></div>
            <FormInput
              label='Select Start Date'
              name='schoolType'
              type='date'
              placeholder='Select an option'
              setFormValue={setsecondstartDate}
            />
            <FormInput
              label='Select End Date'
              name='schoolType'
              type='date'
              placeholder='Select an option'
              setFormValue={setsecondendDate}
            />
          </div>
          <h1 className='text-lg text-[#A5A5A5]'>Third Term</h1>
          <div className='w-full grid md:grid-cols-2 gap-4'>
            <FormSelect
              label='Select Number of Weeks'
              name='schoolType'
              options={numbers}
              setFormValue={setthirdnofweeks}
            />
            <div></div>
            <FormInput
              label='Select Start Date'
              name='schoolType'
              type='date'
              placeholder='Select an option'
              setFormValue={setthirdstartDate}
            />
            <FormInput
              label='Select End Date'
              name='schoolType'
              type='date'
              placeholder='Select an option'
              setFormValue={setthirdendDate}
            />
          </div>
        </div>

        <div className='flex justify-center'>
          <button
            onClick={SubmitHandler}
            className='w-max rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
          >
            {loading ? <ImSpinner2 className='animate-spin' /> : 'Proceed'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddActivityName;
