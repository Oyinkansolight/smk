import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import React from 'react';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler?: () => void;
}

function AddActivityName({ onClickHandler }: propType) {
  function handleSubmit() {
    onClickHandler && onClickHandler();
  }

  const sessions = [
    'Academic Year 2022/2023',
    'Academic Year 2021/2022',
    'Academic Year 2020/2021',
    'Academic Year 2019/2020',
    'Academic Year 2018/2019',
  ];
  return (
    <div className='fixed inset-0 z-10 grid place-content-center rounded-sm bg-black/30'>
      <div className='flex w-[800px] flex-col space-y-4 bg-white p-4'>
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

          <div className='w-full grid grid-cols-2 gap-4'>
            <FormSelect
              label='Select Session'
              name='schoolType'
              options={sessions}
            />
            <div></div>

            <FormSelect
              label='Select School Type'
              name='schoolType'
              options={[
                'ECCDE',
                'Primary School',
                'Secondary School',
                'Tertiary School',
              ]}
            />
            <FormSelect
              label='Select Number of Weeks'
              name='schoolType'
              options={['5', '10', '15', '20']}
            />
            <FormInput
              label='Select Start Date'
              name='schoolType'
              type='date'
              placeholder='Select an option'
            />
            <FormInput
              label='Select End Date'
              name='schoolType'
              type='date'
              placeholder='Select an option'
            />
          </div>
        </div>

        <div className='flex justify-center'>
          <button
            onClick={handleSubmit}
            className='w-max rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddActivityName;
