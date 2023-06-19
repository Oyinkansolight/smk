/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

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

type propType = {
  setactivity: (v: boolean) => void;
  activity: boolean;
};

const Input = ({ activity, setactivity }: propType) => {
  const [isToggled, setisToggled] = useState(false);
  const handleToggle = () => {
    setisToggled(!isToggled);
  };
  return (
    <div className='flex justify-end items-center space-x-3 mt-4 font-light text-base'>
      <p>Other Activity</p>
      <div
        onClick={() => {
          handleToggle();
          setactivity(!activity);
        }}
        className={`${
          isToggled ? 'bg-primary' : 'bg-gray-500'
        } md:h-6 h-4 md:w-12 w-10  rounded-2xl p-1`}
      >
        <div
          onClick={() => {
            handleToggle();
          }}
          className={`${
            isToggled ? 'translate-x-6' : 'translate-x-0'
          } transform duration-300  md:h-4 h-6 md:w-4 w-6 bg-white rounded-full`}
        ></div>
      </div>
    </div>
  );
};

export default Input;
