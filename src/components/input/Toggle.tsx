'use client';

import clsxm from '@/lib/clsxm';

type propType = {
  setactivity: (v: boolean) => void;
  activity: boolean;
  reverse?: boolean;
  label?: { on: string; off: string };
};

const Input = ({ activity, setactivity, label, reverse }: propType) => {
  return (
    <div
      className={clsxm(
        'flex justify-end items-center gap-x-3 font-light text-base',
        reverse && 'flex-row-reverse'
      )}
    >
      {activity ? <p>{label?.on ?? 'On'}</p> : <p>{label?.off ?? 'Off'}</p>}
      <div
        onClick={() => {
          setactivity(!activity);
        }}
        className={`${
          activity ? 'bg-primary' : 'bg-gray-500'
        } md:h-6 h-4 md:w-12 w-10  rounded-2xl p-1`}
      >
        <div
          className={`${
            activity ? 'translate-x-6' : 'translate-x-0'
          } transform duration-300  md:h-4 h-6 md:w-4 w-6 bg-white rounded-full`}
        ></div>
      </div>
    </div>
  );
};

export default Input;
