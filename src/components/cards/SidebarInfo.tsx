import React from 'react';

import clsxm from '@/lib/clsxm';

import BasicCard from '@/components/cards/Basic';

const SidebarInfoCard = () => {
    return (
        <BasicCard className={clsxm('!px-[22.5px] !pt-[22.5px] !pb-0')}>
            <ol className='relative text-gray-500'>
                <li className='mb-10 ml-6'>
                    <span className='absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-200 ring-4 ring-white dark:ring-gray-900'>
                        <svg
                            aria-hidden='true'
                            className='h-5 w-5 text-green-500'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fill-rule='evenodd'
                                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                clip-rule='evenodd'
                            ></path>
                        </svg>
                    </span>
                    <p className='text-sm'>Step details here</p>
                </li>
                <li className='mb-10 ml-6'>
                    <span className='absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white'>
                        <svg
                            aria-hidden='true'
                            className='h-5 w-5 text-gray-500'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fill-rule='evenodd'
                                d='M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z'
                                clip-rule='evenodd'
                            ></path>
                        </svg>
                    </span>
                    <p className='text-sm'>Step details here</p>
                </li>
                <li className='mb-10 ml-6'>
                    <span className='absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white'>
                        <svg
                            aria-hidden='true'
                            className='h-5 w-5 text-gray-500'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z'></path>
                            <path
                                fill-rule='evenodd'
                                d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
                                clip-rule='evenodd'
                            ></path>
                        </svg>
                    </span>
                    <p className='text-sm'>Step details here</p>
                </li>
                <li className='ml-6'>
                    <span className='absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white'>
                        <svg
                            aria-hidden='true'
                            className='h-5 w-5 text-gray-500'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z'></path>
                            <path
                                fill-rule='evenodd'
                                d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                clip-rule='evenodd'
                            ></path>
                        </svg>
                    </span>
                    <p className='text-sm'>Step details here</p>
                </li>
            </ol>
        </BasicCard>
    );
};

export default SidebarInfoCard;
