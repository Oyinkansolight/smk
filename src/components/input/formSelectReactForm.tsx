'use client';

import { RegisterOptions, UseFormRegister } from 'react-hook-form';

/* eslint-disable @typescript-eslint/no-explicit-any */

export enum HelperType {
  info = 'info',
  warning = 'warning',
  danger = 'danger',
  success = 'success',
  disabled = 'disabled',
}

type HelperProps = {
  message?: string;
  type?: string;
};
type propType = {
  label: string;
  options: string[];
  register?: UseFormRegister<any>;
  validation?: RegisterOptions<any>;
  name?: string;
  helper?: HelperProps;
};

const ReactFormSelect = ({
  label,
  options,
  register,
  validation,
  name,
  helper,
}: propType) => {
  return (
    <div className=''>
      <div>
        <div className='h-full flex justify-start'>
          <label htmlFor='' className='text-xs font-bold'>
            {label}
          </label>
        </div>
        <div className='mt-1 w-full border p-2 rounded'>
          <select
            id=''
            className='w-full border-none outline-none bg-transparent  text-gray-400'
            {...(register ? register(name as string, validation) : {})}
          >
            <option value=''> -- Select an option -- </option>

            {options.map((item, id) => (
              <option key={id} value={item}>
                {' '}
                {item}
              </option>
            ))}
          </select>
        </div>
        {helper?.type === 'danger' && (
          <div className='text-red-600 border-red-500 bg-red-300 rounded p-2 mt-1'>
            {helper?.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactFormSelect;
