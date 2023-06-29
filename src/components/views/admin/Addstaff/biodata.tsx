/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import NextImage from '@/components/NextImage';
import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import Image from 'next/image';
import React, { useState } from 'react';
import Webcam from 'react-webcam';

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

type Iprops = {
  register: any;
  errors: any;
};

const GenderOptions: string[] = ['MALE', 'FEMALE', 'Other'];
const Biodata = ({ register, errors }: Iprops) => {
  const [imgSrc, setImgSrc] = React.useState(null);
  const [isCapture, setIsCapture] = useState(false);
  const WebcamCapture = () => {
    const webcamRef: any = React.useRef(null);

    const capture = React.useCallback(() => {
      const imageSrc = webcamRef?.current?.getScreenshot();
      setImgSrc(imageSrc);
      setIsCapture(false);
    }, [webcamRef, setImgSrc]);

    return (
      <>
        <Webcam audio={false} ref={webcamRef} screenshotFormat='image/jpeg' />
        <button
          onClick={capture}
          className='p-2 mx-auto font-medium text-xs bg-primary text-white my-4 rounded'
        >
          Capture photo
        </button>
      </>
    );
  };

  // const [] = useState<any>(staffType.data || []);

  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Bio Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-2 grid grid-cols-2 gap-6'>
        <div></div>
        <div className='font-medium text-center'> Preview </div>
      </div>

      <div className='my-2 grid grid-cols-2 gap-6'>
        <div>
          {' '}
          {!isCapture ? (
            <div>
              <h2 className='text-xs'>Capture Image</h2>
              <div className='w-full grid place-content-center border p-10'>
                <NextImage
                  src='/svg/addimage_avatar.svg'
                  width={130}
                  height={140}
                  alt='avatar'
                />
                <button
                  onClick={() => setIsCapture(true)}
                  type='button'
                  className='mt-4'
                >
                  Click to capture image
                </button>
              </div>
            </div>
          ) : (
            <div className=''>
              <WebcamCapture />
            </div>
          )}
        </div>
        <div>
          {imgSrc && <Image width={600} height={600} src={imgSrc} alt='' />}
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <FormSelect
          label='Staff type'
          name='staffType'
          options={['TEACHING', 'NON-TEACHING']}
          register={register}
          validation={{
            required: 'Staff type is required',
          }}
          helper={
            errors?.staffType && {
              message: errors?.staffType?.message,
              type: 'danger',
            }
          }
        />
      </div>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormInput
            label='First name'
            placeholder='Details here'
            name='firstName'
            register={register}
            validation={{
              required: 'First Name is required',
            }}
            helper={
              errors?.firstName && {
                message: errors?.firstName?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormInput
            label='Last name'
            placeholder='Details here'
            name='lastName'
            register={register}
            validation={{
              required: 'Last Name is required',
            }}
            helper={
              errors?.lastName && {
                message: errors?.lastName?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormSelect
            label='Gender'
            name='gender'
            options={GenderOptions}
            register={register}
            validation={{
              required: 'gender is required',
            }}
            helper={
              errors?.gender && {
                message: errors?.gender?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormInput
            label='Date of birth'
            type='date'
            placeholder='Details here'
            name='dob'
            register={register}
            validation={{
              required: 'Date of birth is required',
            }}
            helper={
              errors?.dob && {
                message: errors?.dob?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Biodata;
