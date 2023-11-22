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
  min?: number | string;
  max?: number | string;
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
  min,
  max,
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
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  return (
    <div className={containerClassName}>
      <div>
        <label htmlFor='' className='text-[#827F85] text-[8px]'>
          {label}
        </label>
        <div className={clsxm('')}>
          <input
            disabled={disabled}
            type={type}
            className={clsxm(
              inputClassName,
              '[&::-webkit-inner-spin-button]:appearance-none [&:focus]:ring-0 [&:focus]:outline-none text-sm bg-transparent py-0 !px-0 w-full border-none outline-none'
            )}
            min={min ?? undefined}
            max={max ?? undefined}
            placeholder={placeholder}
            {...(register ? register(name as string, validation) : {})}
            defaultValue={formValue && formValue}
            onChange={(e) => {
              setFormValue && setFormValue(e.target.value);
            }}
            onKeyDown={(e) =>
              type == 'number' &&
              exceptThisSymbols.includes(e.key) &&
              e.preventDefault()
            }
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
