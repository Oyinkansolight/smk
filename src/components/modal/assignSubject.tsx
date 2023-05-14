/* eslint-disable @typescript-eslint/no-explicit-any */
import FormSelect from '@/components/input/formSelect';
import { useGetSubjectList } from '@/server/institution';
import React, { useEffect, useState } from 'react';
import Close from '~/svg/close.svg';
import { FallingLines } from 'react-loader-spinner';

type Iprops = {
  register: any;
  errors: any;
  onClickHandler: () => void;
  handleSubmit: () => void;
};

function CreateFolder({ onClickHandler, register, errors, handleSubmit }: Iprops) {
  const getSubjects = useGetSubjectList();
  const [allSubjects, setAllSubjects] = useState<any[]>([]);
  // const [allSubjectsData, setAllSubjectsData] = useState<any[]>([]);
  const [selectedSubjectIndex] = useState(0);

  const options = ['ECCDE', 'PRIMARY', 'SECONDARY', 'TERTIARY'];

  useEffect(() => {
    if (!getSubjects.isLoading) {
      // setAllSubjectsData(getSubjects.data);
      getSubjects.data && getSubjects.data.map((item: any) => {
        setAllSubjects((prev) => [...prev, item.name])
      })
    }
  }, [getSubjects.data, getSubjects.isLoading])


  return (
    <div className='fixed inset-0 z-[999] grid place-content-center rounded-sm bg-black/30'>
      <div className='flex w-[500px] flex-col space-y-4 bg-white p-4'>
        <div className='flex justify-end'>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />
          </button>
        </div>

        {getSubjects.isLoading ? (
          <div className='flex justify-center items-center h-[45vh] mt-4 px-5 pb-10'>
            <FallingLines
              color="#4fa94d"
              width="100"
              visible={true}
            />
          </div>
        ) : (
          <div className='mt-4  px-5 pb-10'>
            <h1 className='text-center text-4xl font-bold mb-2'>
              Assign To A Subject
            </h1>

            <p className='text-center mb-2 mt-6'>
              Kindly enter the appropriate details below:{' '}
            </p>

            <div className='w-full mb-4'>
              <FormSelect
                label='Select School Type'
                name='schoolType'
                options={options}
                register={register}
                validation={{
                  required: 'School Type is required',
                }}
                helper={
                  errors?.schoolType && {
                    message: errors?.schoolType?.message,
                    type: 'danger',
                  }
                }
              />
            </div>

            <div className='w-full mb-4'>
              <FormSelect
                label='Select Class'
                name='class'
                options={[
                  'Primary 1',
                  'Primary 2',
                  'Primary 3',
                  'Primary 4',
                  'Primary 5',
                  'Primary 6',
                  'JSS 1',
                  'JSS 2',
                  'JSS 3',
                  'SSS 1',
                  'SSS 2',
                  'SSS 3',
                ]}
                register={register}
                validation={{
                  required: 'Class is required',
                }}
                helper={
                  errors?.class && {
                    message: errors?.class?.message,
                    type: 'danger',
                  }
                }
              />
            </div>

            <div className='w-full mb-4'>
              <FormSelect
                label='Select Subject'
                name='subject'
                options={allSubjects}
                register={register}
                validation={{
                  required: 'School Type is required',
                }}
                helper={
                  errors?.subject && {
                    message: errors?.subject?.message,
                    type: 'danger',
                  }
                }
              />
            </div>

            <div className='flex justify-center mt-12'>
              <button
                onClick={() => handleSubmit}
                className='w-max rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
              >
                Proceed
              </button>
            </div>
          </div>)
        }
      </div>
    </div>
  );
}

export default CreateFolder;
