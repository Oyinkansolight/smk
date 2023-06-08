import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import React from 'react';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler?: () => void;
  start: string;
  end: string;
  setStartDate: (v: string | number, id: number) => void;
  setEndDate: (v: string | number, id: number) => void;
}

//Change to trigger build

function AddActivityName({ onClickHandler }: propType) {
  function handleSubmit() {
    onClickHandler && onClickHandler();
  }
  return (
    <div className='fixed inset-0 z-10 grid place-content-center rounded-sm bg-black/30'>
      <div className='flex w-[700px] max-h-[600px] rounded overflow-y-auto flex-col space-y-4 bg-white p-4'>
        <div className='flex justify-end'>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />
          </button>
        </div>

        <div className='mt-4 space-y-4 px-4 pb-10'>
          <h1 className='text-center text-4xl font-bold'>Add Content</h1>
          <p>Kindly select the appropriate options below:</p>

          <div className='w-full grid grid-cols-2 gap-4'>
            <FormSelect
              label='Select Type'
              name='schoolType'
              options={['Event', 'Period']}
            />
            <div></div>

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
          <div className='w-full grid grid-cols-2 gap-4 p-3 bg-[#F5F6F7] rounded-lg'>
            <div className='bg-white border rounded p-4'>
              <div className='border-b py-1 mb-2'>
                <h1 className='text-lg text-[#A5A5A5]'>Monday</h1>
              </div>
              <FormSelect
                label='Select Subject'
                name='schoolType'
                options={['Mathematics', 'English', 'Social Studies', 'Civic']}
              />
            </div>
            <div className='bg-white border rounded p-4'>
              <div className='border-b py-1 mb-2'>
                <h1 className='text-lg text-[#A5A5A5]'>Tuesday</h1>
              </div>
              <FormSelect
                label='Select Subject'
                name='schoolType'
                options={['Mathematics', 'English', 'Social Studies', 'Civic']}
              />
            </div>
            <div className='bg-white border rounded p-4'>
              <div className='border-b py-1 mb-2'>
                <h1 className='text-lg text-[#A5A5A5]'>Wednesday</h1>
              </div>
              <FormSelect
                label='Select Subject'
                name='schoolType'
                options={['Mathematics', 'English', 'Social Studies', 'Civic']}
              />
            </div>
            <div className='bg-white border rounded p-4'>
              <div className='border-b py-1 mb-2'>
                <h1 className='text-lg text-[#A5A5A5]'>Thursday</h1>
              </div>
              <FormSelect
                label='Select Subject'
                name='schoolType'
                options={['Mathematics', 'English', 'Social Studies', 'Civic']}
              />
            </div>
            <div className='bg-white border rounded p-4'>
              <div className='border-b py-1 mb-2'>
                <h1 className='text-lg text-[#A5A5A5]'>Friday</h1>
              </div>
              <FormSelect
                label='Select Subject'
                name='schoolType'
                options={['Mathematics', 'English', 'Social Studies', 'Civic']}
              />
            </div>
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
