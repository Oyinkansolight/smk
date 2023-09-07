/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Activitytime from '@/components/modal/Activitytime';
import { useState } from 'react';

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

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Iprops {
  session: string | number;
  schoolType: string | number;
  addMoreSchedule: () => void;
  setcalendar: (value: any) => void;
  calendar: any;
}

const Firstterm = ({
  session,
  addMoreSchedule,
  schoolType,
  calendar,
  setcalendar,
}: Iprops) => {
  const [isOpen, setisOpen] = useState(false);
  const [isOpenActivity, setisOpenActivity] = useState(false);

  const modalHandler = () => {
    setisOpen(!isOpen);
  };
  const modalActivityHandler = () => {
    setisOpenActivity(!isOpenActivity);
  };

  const setStartDate = (value: any, index: number) => {
    setcalendar((prevItems: any) => {
      const updatedCalendar = [...prevItems]; // Create a copy of the original array
      updatedCalendar[index] = { ...updatedCalendar[index], start: value }; // Update the specific book object
      return updatedCalendar; // Return the updated array
    });
  };
  const setEndDate = (value: any, index: number) => {
    setcalendar((prevItems: any) => {
      const updatedCalendar = [...prevItems]; // Create a copy of the original array
      updatedCalendar[index] = { ...updatedCalendar[index], end: value }; // Update the specific book object
      return updatedCalendar; // Return the updated array
    });
  };

  return (
    <section className=''>
      {isOpen && (
        <Activitytime
          onClickHandler={modalHandler}
          start={calendar.start}
          end={calendar.end}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      )}
      {/* {isOpenActivity && (
        <Activityname
          onClickHandler={modalActivityHandler}
          // start={calendar.start}
          // end={calendar.end}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      )} */}

      <p>Kindly enter the details below:</p>
      <div className='bg-[#F4F9FF] py-6 mt-5 text-center font-medium'>
        <h1 className='text-xl'>
          Academic Year {session} - {schoolType} - First Term
        </h1>
      </div>

      <div className='mt-8 bg-[#F5F5F6] p-2 rounded-md'>
        <div className='flex w-full mr-10 mb-4'>
          <div className='w-[150px] font-medium rounded-l p-3  border bg-white text-gray-500'>
            Date
          </div>
          <div className='w-full grid grid-cols-5 text-gray-200  border font-medium text-center'>
            <div className='p-3 bg-[#FB6340]'>Monday</div>
            <div className='p-3 bg-[#8E059A]'>Tuesday</div>
            <div className='p-3 bg-[#AA5C09]'>Wednesday</div>
            <div className='p-3 bg-[#099F8D]'>Thursday</div>
            <div className='p-3 bg-[#612503]'>Friday</div>
          </div>
          <div className='w-[40px] pl-4 flex flex-col space-y-2 text-[8px] '></div>
        </div>
        <div className='flex w-full mt-2 items-center'>
          <div className='w-[150px] bg-white font-medium px-3 py-5  border'>
            9:00 - 9:40
          </div>
          <button
            onClick={modalActivityHandler}
            className='w-full border p-5 text-center'
          >
            <p>Assembly </p>
          </button>
          <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '>
            <div className='text-green-600'>Edit</div>
            <div className='text-red-600'>Delete</div>
          </div>
        </div>
        <div className='flex w-full mt-2 items-center'>
          <div className='w-[150px] bg-white font-medium px-3 py-5  border'>
            9:00 - 9:40
          </div>
          <button
            onClick={modalActivityHandler}
            className='w-full border p-5 text-center'
          >
            <p>Mental Mathematics </p>
          </button>
          <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '>
            <div className='text-green-600'>Edit</div>
            <div className='text-red-600'>Delete</div>
          </div>
        </div>
        <div className='flex w-full mt-2 items-center'>
          <div className='w-[150px] bg-white font-medium px-3 py-5  border'>
            9:00 - 9:40
          </div>
          <div className='w-full grid grid-cols-5 text-gray-200  border font-medium text-center'>
            <div className='px-3 py-5 bg-[#FFF2F0] text-[#FB6340]'>English</div>
            <div className='px-3 py-5 bg-[#FDE8FF] text-[#ED1CFF]'>
              Basic Science
            </div>
            <div className='px-3 py-5 bg-[#FFF3E2] text-[#FF9F1C]'>Civic</div>
            <div className='px-3 py-5 bg-[#F4FFE6] text-[#60AC00]'>
              Chemistry
            </div>
            <div className='px-3 py-5 bg-[#FFFFEB] text-[#CDCD04]'>Biology</div>
          </div>
          <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '>
            <div className='text-green-600'>Edit</div>
            <div className='text-red-600'>Delete</div>
          </div>
        </div>
        <div className='flex w-full mt-2 items-center'>
          <div className='w-[150px] bg-white font-medium px-3 py-5  border'>
            9:00 - 9:40
          </div>
          <div className='w-full grid grid-cols-5 text-gray-200  border font-medium text-center'>
            <div className='px-3 py-5 bg-[#FFF2F0] text-[#FB6340]'>English</div>
            <div className='px-3 py-5 bg-[#FDE8FF] text-[#ED1CFF]'>
              Basic Science
            </div>
            <div className='px-3 py-5 bg-[#FFF3E2] text-[#FF9F1C]'>Civic</div>
            <div className='px-3 py-5 bg-[#F4FFE6] text-[#60AC00]'>
              Chemistry
            </div>
            <div className='px-3 py-5 bg-[#FFFFEB] text-[#CDCD04]'>Biology</div>
          </div>
          <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '>
            <div className='text-green-600'>Edit</div>
            <div className='text-red-600'>Delete</div>
          </div>
        </div>
        <div className='flex w-full mt-2 items-center'>
          <div className='w-[150px] bg-white font-medium px-3 py-5  border'>
            9:00 - 9:40
          </div>
          <div className='w-full grid grid-cols-5 text-gray-200  border font-medium text-center'>
            <div className='px-3 py-5 bg-[#FFF2F0] text-[#FB6340]'>English</div>
            <div className='px-3 py-5 bg-[#FDE8FF] text-[#ED1CFF]'>
              Basic Science
            </div>
            <div className='px-3 py-5 bg-[#FFF3E2] text-[#FF9F1C]'>Civic</div>
            <div className='px-3 py-5 bg-[#F4FFE6] text-[#60AC00]'>
              Chemistry
            </div>
            <div className='px-3 py-5 bg-[#FFFFEB] text-[#CDCD04]'>Biology</div>
          </div>
          <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '>
            <div className='text-green-600'>Edit</div>
            <div className='text-red-600'>Delete</div>
          </div>
        </div>
        <div className='flex w-full mt-2 items-center'>
          <div className='w-[150px] bg-white font-medium px-3 py-5  border'>
            9:00 - 9:40
          </div>
          <button
            onClick={modalActivityHandler}
            className='w-full border p-5 text-center'
          >
            <p>Long Break </p>
          </button>
          <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '>
            <div className='text-green-600'>Edit</div>
            <div className='text-red-600'>Delete</div>
          </div>
        </div>
        <div className='flex w-full mt-2 items-center'>
          <div className='w-[150px] bg-white font-medium px-3 py-5  border'>
            9:00 - 9:40
          </div>
          <button
            onClick={modalActivityHandler}
            className='w-full border p-5 text-center'
          >
            <p>Spelling Drill </p>
          </button>
          <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '>
            <div className='text-green-600'>Edit</div>
            <div className='text-red-600'>Delete</div>
          </div>
        </div>

        <div className='flex w-full mt-2 items-center'>
          <div className='w-[150px] bg-white font-medium px-3 py-5  border'>
            9:00 - 9:40
          </div>
          <div className='w-full grid grid-cols-5 text-gray-200  border font-medium text-center'>
            <div className='px-3 py-5 bg-[#FFF2F0] text-[#FB6340]'>English</div>
            <div className='px-3 py-5 bg-[#FDE8FF] text-[#ED1CFF]'>
              Basic Science
            </div>
            <div className='px-3 py-5 bg-[#FFF3E2] text-[#FF9F1C]'>Civic</div>
            <div className='px-3 py-5 bg-[#F4FFE6] text-[#60AC00]'>
              Chemistry
            </div>
            <div className='px-3 py-5 bg-[#FFFFEB] text-[#CDCD04]'>Biology</div>
          </div>
          <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '>
            <div className='text-green-600'>Edit</div>
            <div className='text-red-600'>Delete</div>
          </div>
        </div>
        <div className='flex w-full mt-2 items-center'>
          <div className='w-[150px] bg-white font-medium px-3 py-5  border'>
            9:00 - 9:40
          </div>
          <div className='w-full grid grid-cols-5 text-gray-200  border font-medium text-center'>
            <div className='px-3 py-5 bg-[#FFF2F0] text-[#FB6340]'>English</div>
            <div className='px-3 py-5 bg-[#FDE8FF] text-[#ED1CFF]'>
              Basic Science
            </div>
            <div className='px-3 py-5 bg-[#FFF3E2] text-[#FF9F1C]'>Civic</div>
            <div className='px-3 py-5 bg-[#F4FFE6] text-[#60AC00]'>
              Chemistry
            </div>
            <div className='px-3 py-5 bg-[#FFFFEB] text-[#CDCD04]'>Biology</div>
          </div>
          <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '>
            <div className='text-green-600'>Edit</div>
            <div className='text-red-600'>Delete</div>
          </div>
        </div>
        <div className='flex w-full mt-2 items-center'>
          <div className='w-[150px] bg-white font-medium px-3 py-5  border'>
            9:00 - 9:40
          </div>
          <div className='w-full grid grid-cols-5 text-gray-200  border font-medium text-center'>
            <div className='px-3 py-5 bg-[#FFF2F0] text-[#FB6340]'>English</div>
            <div className='px-3 py-5 bg-[#FDE8FF] text-[#ED1CFF]'>
              Basic Science
            </div>
            <div className='px-3 py-5 bg-[#FFF3E2] text-[#FF9F1C]'>Civic</div>
            <div className='px-3 py-5 bg-[#F4FFE6] text-[#60AC00]'>
              Chemistry
            </div>
            <div className='px-3 py-5 bg-[#FFFFEB] text-[#CDCD04]'>Biology</div>
          </div>
          <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '>
            <div className='text-green-600'>Edit</div>
            <div className='text-red-600'>Delete</div>
          </div>
        </div>
        <div className='flex w-full mt-2 items-center'>
          <div className='w-[150px] bg-white font-medium px-3 py-5  border'>
            9:00 - 9:40
          </div>
          <div className='w-full grid grid-cols-5 text-gray-200  border font-medium text-center'>
            <div className='px-3 py-5 bg-[#FFF2F0] text-[#FB6340]'>English</div>
            <div className='px-3 py-5 bg-[#FDE8FF] text-[#ED1CFF]'>
              Basic Science
            </div>
            <div className='px-3 py-5 bg-[#FFF3E2] text-[#FF9F1C]'>Civic</div>
            <div className='px-3 py-5 bg-[#F4FFE6] text-[#60AC00]'>
              Chemistry
            </div>
            <div className='px-3 py-5 bg-[#FFFFEB] text-[#CDCD04]'>Biology</div>
          </div>
          <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '>
            <div className='text-green-600'>Edit</div>
            <div className='text-red-600'>Delete</div>
          </div>
        </div>
        <div className='flex w-full mt-2 items-center'>
          <div className='w-full py-5 flex justify-end px-4  border text-center'>
            <button
              onClick={modalActivityHandler}
              className='w-full text-center'
            >
              <p>Click to add event or period </p>
            </button>
            <div className='text-red-600'>Delete</div>
          </div>
          <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '></div>
        </div>
      </div>

      <button
        onClick={addMoreSchedule}
        type='button'
        className=' font-medium text-primary mt-4'
      >
        Add New Event Tab
      </button>
    </section>
  );
};

export default Firstterm;
