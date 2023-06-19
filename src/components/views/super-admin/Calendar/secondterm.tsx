/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Activitytime from '@/components/modal/Activitytime';
import { useState } from 'react';
import Select_Dropdown from '~/svg/select_dropdown.svg';

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
    <section className='w-9/12'>
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
          start={calendar.start}
          end={calendar.end}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      )} */}

      <p>Kindly enter the details below:</p>
      <div className='bg-[#F4F9FF] py-6 mt-5 text-center font-medium'>
        <h1 className='text-xl'>
          Academic Year {session} - {schoolType} - Second Term
        </h1>
      </div>

      <div className='mt-8 bg-[#F5F5F6] border-2 rounded-md'>
        <div className='flex w-full'>
          <div className='w-4/12 font-medium p-3  border-b-2'>Date</div>
          <div className='w-8/12 border-l-2 border-b-2 font-medium p-3 text-center'>
            Activities
          </div>
        </div>
        {calendar.map((item: any, idx: number) => (
          <div key={idx} className='flex w-full '>
            <button
              onClick={() => {
                modalHandler();
              }}
              className=' w-4/12 p-3  border-b-2 flex items-center space-x-2'
            >
              {!item.start && !item.end ? (
                <p> Select Date Range</p>
              ) : (
                <div className='flex space-x-3'>
                  <div>{item.start}</div> -<div>{item.end}</div>
                </div>
              )}
              <span>
                <Select_Dropdown />
              </span>
            </button>
            <button
              onClick={modalActivityHandler}
              className='w-8/12 border-l-2 border-b-2 p-3 text-center'
            >
              {!item.activity ? (
                <button>Select to add an activity</button>
              ) : (
                <p>{item.activity} </p>
              )}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addMoreSchedule}
        type='button'
        className=' font-medium text-primary mt-4'
      >
        Add Another
      </button>
    </section>
  );
};

export default Firstterm;
