/* eslint-disable @typescript-eslint/no-explicit-any */
import FormInput from '@/components/input/formInput';
import React, { useState } from 'react';
import Close from '~/svg/close.svg';
import Folder from '~/svg/folder.svg';

interface propType {
  onClickHandler: () => void;
  addNewFolder?: (v: any) => void;
}

function CreateFolder({ onClickHandler, addNewFolder }: propType) {
  const [name, setname] = useState<string | number>('');

  function addFolder() {
    const content = {
      name: name,
      class: '-',
      created_by: 'Super Admin',
      date_added: Date.now(),
      size: '1kb',
      image: <Folder className='h-6 w-6' />,
      type: 'Folder',
    };
    if (addNewFolder) {
      addNewFolder(content);
      onClickHandler();
    }
  }
  return (
    <div className='fixed inset-0 z-[999] grid place-content-center rounded-sm bg-black/30'>
      <div className='flex w-[500px] flex-col space-y-4 bg-white p-4'>
        <div className='flex justify-end'>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />
          </button>
        </div>

        <div className='mt-4  px-5 pb-10'>
          <h1 className='text-center text-4xl font-bold mb-2'>Create Folder</h1>

          <p className='text-center mb-2 mt-6'>
            Kindly enter the appropriate details below:{' '}
          </p>

          <div className='w-full'>
            <FormInput
              type='text'
              label='Name of File*'
              setFormValue={setname}
              formValue={name}
              placeholder='e.g Primary School Folder'
            />
          </div>

          <div className='flex justify-center mt-32'>
            <button
              onClick={addFolder}
              className='w-max rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateFolder;
