'use client';

import FormInput from '@/components/input/formInput';
import Library from '@/components/modal/Library';
import Stepper from '@/components/stepper';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

const Page = () => {
  const [stage, setStage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState<number | string>('');
  const [dropDown, setDropDown] = useState(false);

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };
  const nextHandler = (): void => {
    if (stage >= 1 && stage <= 3) {
      setStage(stage + 1);
    }
  };
  const prevHandler = (): void => {
    if (stage >= 2) {
      setStage(stage - 1);
    }
  };
  const stepperData = [
    {
      stage: 1,
      stageName: 'Message Details',
    },
    {
      stage: 2,
      stageName: 'Publish',
    },
  ];

  return (
    <section className='md:px-[60px] px-5 py-6'>
      <Link href='/super-admin'>
        <div className='flex items-center space-x-4'>
          <Image
            src='/svg/back.svg'
            width={10}
            height={10}
            alt='back'
            className='h-4 w-4'
          />
          <h3 className='text-[10px] font-medium'>Back</h3>
        </div>
      </Link>

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Send Message</h1>

      <Stepper
        variant='#007AFF'
        section='super_admin'
        currentStage={stage}
        data={stepperData}
      />

      <div>
        {stage === 1 && (
          <div>
            <div className='table-add-student mt-7 lg:px-10 px-4 py-10 pb-4 bg-white'>
              <h2 className='text-2xl font-bold'>Message Details</h2>
              <p>Kindly enter the details of the school below:</p>

              <div className='md:w-1/2 w-3/4 mt-5'>
                <div className='mb-3 w-full'>
                  <FormInput
                    label='Enter Recipient Name*'
                    setFormValue={setSearch}
                    formValue={search}
                    placeholder='Jane Doe'
                  />
                </div>
                <div className='mb-3 w-full'>
                  <FormInput
                    label='Enter Message Title'
                    setFormValue={setSearch}
                    formValue={search}
                    placeholder='Jane Doe'
                  />
                </div>
              </div>
            </div>
            <div className='table-add-student mt-7   pt-5 pb-10 bg-white'>
              <div className='flex justify-between  border-b px-10'>
                <h2 className='text-2xl font-bold'>New Message </h2>
                <div className='relative'>
                  <button
                    onClick={() => {
                      setDropDown(!dropDown);
                    }}
                    className='py-3 text-black  text-xs rounded-md px-4 flex space-x-3'
                  >
                    <span>Attach File</span>
                    <RiArrowDropDownLine size={20} />
                  </button>
                  {dropDown && (
                    <div
                      className='fixed inset-0 z-[9]'
                      onClick={() => {
                        setDropDown(!dropDown);
                      }}
                    />
                  )}
                  {dropDown && (
                    <div className='shadow-lg rounded-xl flex  flex-col  text-left bg-[#f7f7f7] w-[200px] h-max absolute top-12 transition-all duration-200 right-0 z-10'>
                      <label
                        htmlFor='upload_file'
                        className='p-3 cursor-pointer hover:bg-slate-100  block text-left font-medium max-w-full'
                      >
                        Upload from your computer
                      </label>
                      <input
                        type='file'
                        name='upload_folder'
                        id='upload_file'
                        hidden
                      />

                      <button
                        onClick={() => {
                          setIsOpen(!isOpen);
                        }}
                        className='p-3 hover:bg-slate-100  text-left font-medium w-full'
                      >
                        Upload from from Library
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className='w-full px-10 mt-5'>
                {/* <Editorcomponent /> */}
              </div>
            </div>
          </div>
        )}

        {stage === 2 && (
          <div className='table-add-student mt-7 lg:px-20 px-4 py-10 pb-4 bg-white'>
            Publish
          </div>
        )}

        <div className='my-6 flex justify-end w-full'>
          <div className='flex space-x-6'>
            <button
              onClick={prevHandler}
              className='w-[200px] rounded px-2 py-3 text-xs text-secondary border border-secondary'
            >
              Send Later
            </button>

            <button
              onClick={nextHandler}
              className='w-full rounded border bg-secondary px-8 py-3 text-xs text-[#fff]'
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {isOpen && <Library onClickHandler={onClickHandler} />}
    </section>
  );
};

export default Page;
