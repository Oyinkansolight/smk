import Link from 'next/link';
import React from 'react';
import Success from '~/svg/success_icon.svg';

interface propType {
  title: string;
  description: string;
  link: string;
  textLink: string | undefined;
  showHome?: boolean;
  homeLink?: string;
}

function SuccessModal({
  title,
  description,
  link,
  textLink,
  homeLink,
  showHome = true,
}: propType) {
  return (
    <div className='fixed inset-0 z-[999999] grid place-content-center rounded-sm bg-black/30'>
      <div className='flex md:w-[700px] w-[400px]  py-16 flex-col justify-center items-center  bg-white px-4 rounded'>
        <Success className='w-28 h-28' />

        <h2 className='mt-10 mb-4'>{title}</h2>
        <small className='text-xs font-light'> {description} </small>

        <div className='flex flex-col justify-center items-center space-y-4 mt-14'>
          <Link
            href={link}
            className='w-max  rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
          >
            {textLink}
          </Link>
          {showHome && homeLink && (
            <Link
              href={homeLink}
              className='w-max  rounded border border-[#008146] px-12 py-3 text-xs text-[#008146] '
            >
              Go Home
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
