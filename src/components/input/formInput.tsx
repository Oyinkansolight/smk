/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import clsxm from '@/lib/clsxm';
import { HTMLInputTypeAttribute } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

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
  placeholder: string;
  formValue?: string | number;
  setFormValue?: (value: string | number) => void;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  register?: UseFormRegister<any>;
  validation?: RegisterOptions<any>;
  name?: string;
  helper?: HelperProps;
  onclick?: () => void;
  inputClassName?: string;
  containerClassName?: string;
};

const Input = ({
  label,
  formValue,
  type = 'text',
  setFormValue,
  placeholder,
  disabled,
  register,
  validation,
  name,
  helper,
  inputClassName,
  containerClassName,
}: propType) => {
  return (
    <div className={containerClassName}>
      <div>
        <label htmlFor='' className='text-xs font-bold'>
          {label}
        </label>
        <div className={clsxm('mt-1 w-full border p-2 rounded')}>
          <input
            disabled={disabled}
            type={type}
            className={clsxm(inputClassName, 'w-full border-none outline-none')}
            placeholder={placeholder}
            {...(register ? register(name as string, validation) : {})}
            value={formValue && formValue}
            onChange={(e) => {
              setFormValue && setFormValue(e.target.value);
            }}
          />
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

export default Input;
