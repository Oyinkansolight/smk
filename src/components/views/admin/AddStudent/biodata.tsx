/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import NextImage from '@/components/NextImage';
import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import Image from 'next/image';
import React, { useState } from 'react';
import Webcam from 'react-webcam';

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

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

type Iprops = {
  register: any;
  errors: any;
  imgSrc: any;
  setImgSrc: (v: any) => void;
  setImageData: (v: any) => void;
};

const GenderOptions: string[] = ['MALE', 'FEMALE', 'Other'];

const Biodata = ({
  register,
  errors,
  imgSrc,
  setImgSrc,
  setImageData,
}: Iprops) => {
  const [isCapture, setIsCapture] = useState(false);
  const WebcamCapture = () => {
    const webcamRef: any = React.useRef(null);

    const capture = React.useCallback(() => {
      const imageSrc = webcamRef?.current?.getScreenshot();
      setImgSrc(imageSrc);
      // const array =  imageSrc?.arrayBuffer();

      if (imageSrc) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Create an image element and set the source
        const image = document.createElement('img') as HTMLImageElement; // Type assertion to HTMLImageElement
        image.src = imageSrc;

        // Draw the image on the canvas
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          context?.drawImage(image, 0, 0);

          // Convert the canvas image to a File object
          canvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], 'capturedImage.jpg', {
                type: 'image/jpeg',
              });

              // Use the file as needed
              setImageData(file);
            }
          }, 'image/jpeg');
        };
      }

      setIsCapture(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
              errors?.lastname && {
                message: errors?.lastname?.message,
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
