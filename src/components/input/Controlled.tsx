/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import React, { FC, useState } from 'react';
import { RiEyeCloseLine, RiEyeLine, RiInformationFill } from 'react-icons/ri';

import clsxm from '@/lib/clsxm';

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

type ControlledInputProps = {
    className?: string;
    helper?: HelperProps | any;
    label: string;
    name: string;
    placeholder?: string;
    type?: string;
    icon?: any;
    onClick?: (e?: any) => void;
    disable?: boolean;
    value: any;
    onChange: (e?: any) => void;
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

const ControlledInput: FC<ControlledInputProps> = ({
    type = 'text',
    label,
    placeholder,
    name,
    className,
    helper,
    icon,
    onClick,
    value,
    onChange,
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
                    'block text-sm font-semibold text-gray-400',
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
                        value={value}
                        onChange={onChange}
                        disabled={disable}
                        type={isVisible ? type : 'text'}
                        placeholder={placeholder}
                        className={clsxm(
                            className && className,
                            'block max-h-14 w-full appearance-none rounded-md border p-5 text-sm placeholder-gray-400 focus:border-primary focus:outline-none',
                            helper?.type
                                ? helperBorderClasses[helper.type]
                                : 'focus:border-primary'
                        )}
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
                            className={clsxm(
                                helperTextClasses[helper.type],
                                'text-xs'
                            )}
                            role='alert'
                        >
                            <div className='flex flex-row items-center gap-2'>
                                <RiInformationFill className='fill-current text-red-500' />
                                <div className='text-left'>
                                    {helper.message}
                                </div>
                            </div>
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ControlledInput;
