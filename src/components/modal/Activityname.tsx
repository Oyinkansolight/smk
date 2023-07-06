import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import FormSelectSubject from '@/components/input/formSelectSubject';
import { useGetSubjectList } from '@/server/institution';
import React from 'react';
import { ImSpinner2 } from 'react-icons/im';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler?: () => void;
  SubmitHandler: () => void;
  setStartDate?: (v: string | number) => void;
  setSubjectId1: (v: string | number) => void;
  setSubjectId2: (v: string | number) => void;
  setSubjectId3: (v: string | number) => void;
  setSubjectId4: (v: string | number) => void;
  setSubjectId5: (v: string | number) => void;
  setEndDate?: (v: string | number) => void;
  seteventname: (v: string | number) => void;
  setType: (v: string | number) => void;
  type: string | number;
  loading: boolean;
}

//Change to trigger build

function AddActivityName({
  onClickHandler,
  setStartDate,
  setEndDate,
  setSubjectId1,
  setSubjectId2,
  setSubjectId3,
  setSubjectId4,
  setSubjectId5,
  seteventname,
  SubmitHandler,
  loading,
  type,
  setType,
}: propType) {
  const { data } = useGetSubjectList();

  return (
    <div className='fixed inset-0 z-10 grid place-content-center rounded-sm bg-black/30'>
      <div className='flex w-[701px] max-h-[600px] rounded overflow-y-auto flex-col space-y-4 bg-white p-4'>
        <div className='flex justify-end'>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />
          </button>
        </div>

        <div className='mt-4 space-y-4 px-4 pb-10'>
          <h1 className='text-center text-4xl font-bold'>Add Event/Period</h1>
          <p className='text-center'>
            Kindly select the appropriate options below:
          </p>

          <div className='w-full grid grid-cols-2 gap-4'>
            <FormSelect
              label='Select Type'
              name='schoolType'
              options={['event', 'period']}
              setFormValue={setType}
            />
            <div></div>

            <FormInput
              label='Select start time'
              name='schoolType'
              type='time'
              placeholder='Select an option'
              setFormValue={setStartDate}
            />
            <FormInput
              label='Select end time'
              name='schoolType'
              type='time'
              placeholder='Select an option'
              setFormValue={setEndDate}
            />
          </div>
          {type === 'period' ? (
            <div>
              {data && (
                <div className='w-full grid grid-cols-2 gap-4 p-3 bg-[#F5F6F7] rounded-lg'>
                  <div className='bg-white border rounded p-4'>
                    <div className='border-b py-1 mb-2'>
                      <h1 className='text-lg text-[#A5A5A5]'>Monday</h1>
                    </div>
                    <FormSelectSubject
                      label='Select Subject'
                      name='schoolType'
                      options={data}
                      setFormValue={setSubjectId1}
                    />
                  </div>
                  <div className='bg-white border rounded p-4'>
                    <div className='border-b py-1 mb-2'>
                      <h1 className='text-lg text-[#A5A5A5]'>Tuesday</h1>
                    </div>
                    <FormSelectSubject
                      label='Select Subject'
                      name='schoolType'
                      options={data}
                      setFormValue={setSubjectId2}
                    />
                  </div>
                  <div className='bg-white border rounded p-4'>
                    <div className='border-b py-1 mb-2'>
                      <h1 className='text-lg text-[#A5A5A5]'>Wednesday</h1>
                    </div>
                    <FormSelectSubject
                      label='Select Subject'
                      name='schoolType'
                      options={data}
                      setFormValue={setSubjectId3}
                    />
                  </div>
                  <div className='bg-white border rounded p-4'>
                    <div className='border-b py-1 mb-2'>
                      <h1 className='text-lg text-[#A5A5A5]'>Thursday</h1>
                    </div>
                    <FormSelectSubject
                      label='Select Subject'
                      name='schoolType'
                      options={data}
                      setFormValue={setSubjectId4}
                    />
                  </div>
                  <div className='bg-white border rounded p-4'>
                    <div className='border-b py-1 mb-2'>
                      <h1 className='text-lg text-[#A5A5A5]'>Friday</h1>
                    </div>
                    <FormSelectSubject
                      label='Select Subject'
                      name='schoolType'
                      options={data}
                      setFormValue={setSubjectId5}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className='w-full grid grid-cols-2 gap-4 p-3 bg-[#F5F6F7] rounded-lg'>
              <div className='bg-white border rounded p-4'>
                <div className='border-b py-1 mb-2'>
                  <h1 className='text-lg text-[#A5A5A5]'>All Week</h1>
                </div>
                <FormInput
                  type='text'
                  placeholder='Enter details here'
                  label='Entet Event Name'
                  name='eventname'
                  setFormValue={seteventname}
                />
              </div>
            </div>
          )}
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
