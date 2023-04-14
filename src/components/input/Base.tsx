/* eslint-disable @typescript-eslint/no-explicit-any */
import clsxm from '@/lib/clsxm';
import { motion } from 'framer-motion';
import React, { FC, useState } from 'react';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import { RiEyeCloseLine, RiEyeLine, RiInformationFill } from 'react-icons/ri';

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

type BaseInputProps<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>
> = {
  className?: string;
  helper?: HelperProps | any;
  label: string | JSX.Element;
  name: string;
  register?: UseFormRegister<any>;
  validation?: RegisterOptions<TFieldValues, TFieldName>;
  placeholder?: string;
  type?: string;
  icon?: any;
  onClick?: (e?: any) => void;
  disable?: boolean;
  value?: string;
  onChange?: (value: string) => void;
};

const helperTextClasses: Record<string, string> = {
  info: 'text-primary-light',
  warning: 'text-yellow-500',
  danger: 'text-red-600',
  success: 'text-green-700',
  disabled: 'text-gray-200',
};

const helperBorderClasses: Record<string, string> = {
  info: 'border-gray-500',
  warning: 'border-yellow-500',
  danger: 'border-red-600',
  success: 'border-green-700',
  disabled: 'border-gray-200',
};

// type ClickHandler = (e: React.MouseEvent) => void;

const BaseInput: FC<BaseInputProps<any, any>> = ({
  type = 'text',
  label,
  placeholder,
  name,
  className,
  register,
  validation,
  helper,
  icon,
  onClick,
  onChange,
  value,
  disable = false,
  ...otherInputProps
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // @typescript-eslint/no-shadow
  const renderPasswordIcon = () =>
    isVisible ? (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <RiEyeLine className='h-5 w-6 text-[#171818]' />
      </motion.div>
    ) : (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <RiEyeCloseLine className='h-5 w-6 text-[#171818]' />
      </motion.div>
    );

  return (
    <div className='space-y-2'>
      <label
        htmlFor={name}
        className={clsxm(
          'block text-sm font-semibold text-gray-400 text-left',
          helper?.type && helper?.type !== 'info'
            ? helperTextClasses[helper.type]
            : 'text-primary-dark'
        )}
      >
        {label}
      </label>
      <div className='space-y-2'>
        <div className='relative'>
          <input
            id={name}
            disabled={disable}
            type={isVisible ? type : 'text'}
            placeholder={placeholder}
            className={clsxm(
              className && className,
              'block w-full rounded-[5px] border-[0.5px] border-gray-300 bg-white py-2 pl-2 pr-4 font-light text-black placeholder-opacity-30 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40',
              helper?.type
                ? helperBorderClasses[helper.type]
                : 'focus:border-primary'
            )}
            {...(register ? register(name, validation) : {})}
            onChange={(e) => onChange && onChange(e.currentTarget.value)}
            value={value}
            {...otherInputProps}
          />

          {icon && (
            <span
              className='pointer-events-none absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3'
              onClick={(e) => {
                if (onClick) onClick(e);
              }}
            >
              {icon}
            </span>
          )}
          {type === 'password' && (
            <span
              className='absolute inset-y-0 right-0 z-10 flex cursor-pointer items-center pr-3 transition-all delay-300 ease-in-out'
              onClick={() => {
                if (onClick) onClick();
                setIsVisible(!isVisible);
              }}
            >
              {renderPasswordIcon()}
            </span>
          )}
        </div>

        {helper?.message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p
              className={clsxm(helperTextClasses[helper.type], 'text-xs')}
              role='alert'
            >
              <div className='flex flex-row items-center gap-2'>
                <RiInformationFill className='fill-current text-red-500' />
                <div className='text-left'>{helper.message}</div>
              </div>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BaseInput;
