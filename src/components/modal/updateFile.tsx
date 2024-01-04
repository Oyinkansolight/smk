/* eslint-disable @typescript-eslint/no-explicit-any */
import FormInput from '@/components/input/formInput';
import logger from '@/lib/logger';
import { useUpdateFile } from '@/server/library';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler: () => void;
  fileName: string;
  fileId: string;
}

function UpdateFile({ onClickHandler, fileName, fileId }: propType) {
  const [name, setName] = useState<any>(fileName);
  const { mutateAsync, isLoading } = useUpdateFile();

  async function updateFileFn() {
    try {
      const response = await mutateAsync({ id: fileId, filename: name });
      if (response) {
        toast.success('File updated successfully');
        onClickHandler();
      }
    } catch (error) {
      logger(error);
      if (error) {
        toast.error('File update failed');
      }
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
          <h1 className='text-center text-4xl font-bold mb-2'>Rename File</h1>

          <p className='text-center mb-2 mt-6'>
            Kindly update the file name below:
          </p>

          <div className='w-full'>
            <FormInput
              type='text'
              label='File Name*'
              setFormValue={setName}
              formValue={name}
              placeholder='e.g Primary School File'
            />
          </div>

          <div className='flex justify-center mt-32'>
            <button
              onClick={updateFileFn}
              className='w-max rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
            >
              {isLoading ? 'Processing' : 'Proceed'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateFile;
