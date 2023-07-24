/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { BsPlus } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

type Iprops = {
  register: any;
  errors: any;
  addTrainingDetail: () => void;
  removeTrainingDetail: (id: number) => void;
  handleTrainingChange: (
    titleOfTraining: string,
    value: any,
    id: number
  ) => void;
  trainingDetails: { titleOfTraining: string; year: number | null }[];
};
function generateYears() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1970 + 1 },
    (_, index) => 1970 + index
  );
  return years.reverse();
}
const years = generateYears();

const Education = ({
  addTrainingDetail,
  trainingDetails,
  removeTrainingDetail,
  handleTrainingChange,
}: Iprops) => {
  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Training Details</h2>
      <p>Kindly enter the details below:</p>

      {trainingDetails.map((v: any, i: number) => (
        <div key={i} className='my-10 grid grid-cols-12 gap-6 items-center'>
          <div className='col-span-5'>
            <label htmlFor='' className='text-xs font-bold'>
              Name/Title of Training
            </label>
            <div className='mt-1 w-full border p-2 rounded'>
              <input
                type='text'
                className='w-full border-none outline-none'
                placeholder='Enter details here'
                onChange={(e) => {
                  handleTrainingChange('titleOfTraining', e.target.value, i);
                }}
              />
            </div>
          </div>
          <div className='col-span-5'>
            <label htmlFor='' className='text-xs font-bold'>
              Year
            </label>
            <div className='mt-1 w-full border p-2 rounded'>
              <select
                id=''
                className='w-full border-none outline-none bg-transparent  text-gray-400'
                onChange={(e) => {
                  handleTrainingChange('year', e.target.value, i);
                }}
              >
                <option value=''> -- Select an option -- </option>

                {years.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='col-span-2 pt-4'>
            <button
              type='button'
              onClick={() => {
                removeTrainingDetail(i);
              }}
              className='bg-[#FFF8F8] rounded-[22px] flex space-x-2 p-3'
            >
              <RiDeleteBin6Line size={20} className='text-red-500' />{' '}
              <span>Delete</span>
            </button>
          </div>
        </div>
      ))}
      <button
        type='button'
        onClick={addTrainingDetail}
        className=' mt-4  rounded-[22px] flex space-x-2 p-3'
      >
        <BsPlus size={20} className='text-blue-500' /> <span>Add Another</span>
      </button>
    </section>
  );
};

export default Education;
