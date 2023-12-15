import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import { useCreateSchoolType } from '@/server/government/terms';
import React, { useState } from 'react';
import { ImSpinner } from 'react-icons/im';
import { toast } from 'react-toastify';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler: () => void;
}

function AddAdmin({ onClickHandler }: propType) {
  const [name, setName] = useState<number | string>('');
  const [description, setDescription] = useState<number | string>('');
  const [noOfTerm, setNoOfTerm] = useState<number | string>('');
  const [loading, setLoading] = useState(false);

  const handleCreateSchoolType = useCreateSchoolType();

  async function addSchoolType() {
    const payload = {
      name,
      description,
      semester: noOfTerm,
    };

    setLoading(true);
    const response = await handleCreateSchoolType.mutateAsync(payload);

    if (response) {
      toast.success('Institute type added successfully');
      onClickHandler();

      setLoading(false);
    } else {
      toast.error('Error adding Institution');
      setLoading(false);
    }
  }

  return (
    <div className='fixed inset-0 z-[999] grid place-content-center rounded-sm bg-black/30'>
      <div className='flex w-[700px] flex-col space-y-4 bg-white p-4'>
        <div className='flex justify-end'>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />
          </button>
        </div>

        <div className='mt-4 space-y-4 px-10 pb-10'>
          <h1 className='text-center text-4xl font-bold'>
            Add New School Type
          </h1>

          <p className='text-center'>Kindly enter the details below: </p>
          <div className='grid grid-cols-2 gap-6'>
            <div className='w-full'>
              <FormInput
                type='text'
                label='Name*'
                setFormValue={setName}
                formValue={name}
                placeholder='Details here'
              />
            </div>

            <div className='w-full'>
              <FormSelect
                label='Select Number of Terms/Semester*'
                setFormValue={setNoOfTerm}
                formValue={noOfTerm}
                options={[1, 2, 3, 4, 5]}
              />
            </div>
          </div>
          <div className='w-full my-10'>
            <FormInput
              type='text'
              label='Enter Description'
              setFormValue={setDescription}
              formValue={description}
              placeholder='Details here'
            />
          </div>

          <div className='text-center space-y-4'>
            <h1 className='text-[#E5A500] text-base font-medium'>Note</h1>
            <p>
              You would be required to add and manage classes for each school
              type created.
            </p>
          </div>

          <div className='flex justify-center'>
            <button
              onClick={addSchoolType}
              className='w-max rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
            >
              {loading ? <ImSpinner /> : 'Add School Type'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAdmin;
