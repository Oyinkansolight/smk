/* eslint-disable @typescript-eslint/no-explicit-any */
import clsxm from '@/lib/clsxm';
import { getFromLocalStorage } from '@/lib/helper';
import logger from '@/lib/logger';
import {
  useGetSubjectList,
  useGetTeachersListByInstitution,
} from '@/server/institution';
import { useGetAllFiles } from '@/server/library';
import React from 'react';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler?: () => void;
  handleSubmit: () => void;
  periodsList: any;
  periodsUpdate: any;
  setperiodsUpdate: (v: any) => void;
}

//Change to trigger build

function AddActivityName({
  onClickHandler,
  handleSubmit,
  periodsList,
  periodsUpdate,
  setperiodsUpdate,
}: propType) {
  const { data } = useGetSubjectList();
  const { data: files } = useGetAllFiles();
  const institutionId = getFromLocalStorage('institutionId');

  const { data: staffs } = useGetTeachersListByInstitution(institutionId);
  logger(staffs);
  const updateObjectInArray = (index: number, newValue: any) => {
    setperiodsUpdate((prevArray: any) => {
      const newArray = [...prevArray]; // Create a copy of the array
      newArray[index] = newValue; // Modify the object at the specified index
      return newArray; // Return the updated array
    });
  };

  return (
    <div className='fixed inset-0 z-[99] grid place-content-center rounded-sm bg-black/30'>
      <div className='flex md:w-[800px] w-[500px] max-h-[700px] rounded overflow-y-auto flex-col space-y-4 bg-white p-4'>
        <div className='flex item-center justify-end'>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />
          </button>
        </div>

        <div className='mt-4 space-y-4 px-4 pb-10'>
          <h1 className='text-center text-4xl font-bold'>Edit Week</h1>
          <p className='text-center'>
            Kindly select the appropriate options below:
          </p>

          <div>
            {data && (
              <div className='w-full grid md:grid-cols-2 gap-4 p-3 bg-[#F5F6F7] rounded-lg'>
                {periodsList.map((v: any, i: number) => (
                  <div key={i} className='bg-white border rounded p-4'>
                    <div className='border-b py-1 mb-2 flex items-center justify-between'>
                      <h1 className='text-lg text-[#A5A5A5]'>Period {i + 1}</h1>
                      <h1 className='font-normal text-sm text-secondary'>
                        {v.day} - {v.startTime} - {v.endTime}
                      </h1>
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <div>
                        <label htmlFor='' className='text-xs font-bold'>
                          Topic/Sub-Theme
                        </label>
                        <div
                          className={clsxm('mt-1 w-full border p-2 rounded')}
                        >
                          <input
                            type='text'
                            className='w-full border-none outline-none'
                            placeholder='Enter value'
                            onChange={(e) => {
                              updateObjectInArray(i, {
                                ...periodsUpdate[i],
                                theme: e.target.value,
                                periodId: v.id,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor='' className='text-xs font-bold'>
                          Title
                        </label>
                        <div
                          className={clsxm('mt-1 w-full border p-2 rounded')}
                        >
                          <input
                            type='text'
                            className='w-full border-none outline-none'
                            placeholder='Enter value'
                            onChange={(e) => {
                              updateObjectInArray(i, {
                                ...periodsUpdate[i],
                                periodTitle: e.target.value,
                                periodId: v.id,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor='' className='text-xs font-bold'>
                          Attach File to Period*
                        </label>
                        <div
                          className={clsxm('mt-1 w-full border p-2 rounded')}
                        >
                          <select
                            id=''
                            className='w-full border-none outline-none bg-transparent  text-gray-400'
                            onChange={(e) => {
                              updateObjectInArray(i, {
                                ...periodsUpdate[i],
                                fileId: e.target.value,
                              });
                            }}
                          >
                            <option value=''> -- Select an option -- </option>

                            {(files ?? []).map((item: any, id: number) => (
                              <option key={id} value={item.id}>
                                {item.filename}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='flex item-center justify-center'>
          <button
            onClick={handleSubmit}
            className='w-max rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddActivityName;
