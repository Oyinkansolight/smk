/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSubjectList } from '@/server/institution';
import { Subject } from '@/types/institute';
import React, { useEffect, useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { FallingLines } from 'react-loader-spinner';
import ReactSelect from 'react-select';
import Close from '~/svg/close.svg';

type Iprops = {
  register: any;
  errors: any;
  loading?: boolean;
  onClickHandler?: () => void;
  handleSubmit?: () => void;
  control?: Control<FieldValues, any>;
};

function CreateFolder({
  onClickHandler,
  loading,
  handleSubmit,
  control,
}: Iprops) {
  const getSubjects = useGetSubjectList();
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);

  // const [allSubjectsData, setAllSubjectsData] = useState<any[]>([]);

  const options = ['ECCDE', 'PRIMARY', 'SECONDARY', 'TERTIARY'];
  const classesOptions = [
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
  ];

  useEffect(() => {
    if (!getSubjects.isLoading) {
      // setAllSubjectsData(getSubjects.data);
      getSubjects.data && setAllSubjects(getSubjects.data);
    }
  }, [getSubjects.data, getSubjects.isLoading]);

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
            <FallingLines color='#4fa94d' width='100' visible={true} />
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
              <Controller
                control={control}
                name='schoolType'
                render={({ field }) => (
                  <div>
                    <div>School Type </div>
                    <ReactSelect
                      isMulti
                      required
                      options={options.map((v) => ({ label: v, value: v }))}
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <div className='w-full mb-4'>
              <Controller
                control={control}
                name='class'
                render={({ field }) => (
                  <div>
                    <div>Class </div>
                    <ReactSelect
                      isMulti
                      required
                      options={classesOptions.map((v) => ({
                        label: v,
                        value: v,
                      }))}
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <div className='w-full mb-4'>
              <Controller
                control={control}
                name='subject'
                render={({ field }) => (
                  <div>
                    <div>Select Subject </div>
                    <ReactSelect
                      isMulti
                      required
                      options={allSubjects.map((v) => ({
                        label: v.name,
                        value: v.id,
                      }))}
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <div className='flex justify-center mt-12'>
              <button
                onClick={() => {
                  handleSubmit && handleSubmit();
                }}
                className='w-max rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
              >
                {loading ? <ImSpinner2 className='animate-spin' /> : 'Proceed'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateFolder;
