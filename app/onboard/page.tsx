'use client';

import NextImage from '@/components/NextImage';
import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';
import { VerticalStepper } from '@/components/stepper';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';
import { useCreateInstitution } from '@/server/institution';
import { useGetLocalGovernments, useGetPermissions, useGetTowns } from '@/server/onboard';
import { useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { Controller, useForm } from 'react-hook-form';
import { AiFillCheckCircle } from 'react-icons/ai';
import Select from 'react-select';
import { toast } from 'react-toastify';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';



import '/src/styles/globals.css';


const stepData = [
  {
    title: 'Start',
  },
  {
    title: 'General Details',
  },
  {
    title: 'Location Details',
  },
  {
    title: 'Permission Details',
  },
  {
    title: 'Account Details',
  },
  {
    title: 'Account Summary',
  },
];

export default function Page() {
  const [step, setStep] = useState(0);
  const d = useGetPermissions();
  const [permissions, setPermissions] = useState(new Set<number>());

  const handleStepChange = (step: number) => setStep(step);
  const handleBack = () => step > 0 && setStep(step - 1);
  const { register, getValues, control } = useForm();

  const create = useCreateInstitution();

  const StepperLayout = ({ children }: { children: React.ReactNode }) => (
    <div className='flex w-full max-w-[656px] flex-col gap-y-8'>
      {children}

      <div className='flex flex-row justify-end gap-x-[10px]'>
        <Button
          variant='ghost'
          onClick={handleBack}
          className={clsxm(
            '!h-10 w-[120px] justify-center text-secondary-50 hover:bg-secondary-200'
          )}
        >
          Prev
        </Button>

        <Button
          onClick={async () => {
            if (step < steps.length - 1) {
              handleStepChange(step + 1);
            } else {
              try {
                await create.mutateAsync({
                  ...getValues(),
                  // permissions: Array.from(permissions.values()).join(','),
                });
              } catch (error) {
                logger(error);
                toast.error('Error');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                toast.error(error as any);
              }
            }
          }}
          variant='secondary'
          className='!h-10 w-[120px] justify-center'
        >
          {step === steps.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );

  const StepOne = () => (
    <div className='mx-auto mt-28 flex flex-col items-center justify-center gap-y-4 text-center'>
      <div className='h2 max-w-[590px]'>
        Welcome,
        <br />
        The Edo State Government has invited you to register your account
      </div>

      <div className='text-[#171818]'>
        Let&apos;s get you started with creating an account.
      </div>

      <div className='mt-6'>
        <Button
          onClick={() => handleStepChange(1)}
          variant='secondary'
          className='h-[40px] w-[189px] justify-center !rounded-[3px] !text-xs'
        >
          Start
        </Button>
      </div>
    </div>
  );

  const StepTwo = () => {
    // const [{ opacity }, dragRef] = useDrag(
    //   () => ({
    //     type: "image",
    //     item: { text },
    //     collect: (monitor) => ({
    //       opacity: monitor.isDragging() ? 0.5 : 1
    //     })
    //   }),
    //   []
    // );

    return (
      <StepperLayout>
        <div className='flex flex-col gap-y-2'>
          <div className='h2'>General Details</div>
          <div className='p'>Kindly enter the details of the school below</div>

          <div className='mt-4 flex flex-col gap-10'>
            <div className='grid grid-cols-1 gap-x-[30px] gap-y-4 md:w-fit lg:grid-cols-2'>
              <BaseInput
                label='First Name'
                name='firstName'
                placeholder='First Name'
                className='md:min-w-[312px] md:max-w-[312px]'
                register={register}
              />
              <BaseInput
                label='Last Name'
                name='lastName'
                placeholder='Last Name'
                className='md:min-w-[312px] md:max-w-[312px]'
                register={register}
              />
            </div>

            <div className='grid grid-cols-1 gap-x-[30px] gap-y-4 md:w-fit lg:grid-cols-2'>
              <input type='file' />
            </div>

            <BaseInput
              label='Official Email'
              name='email'
              placeholder='Details here'
              register={register}
            />
          </div>
        </div>
      </StepperLayout>
    );
  };

  const StepThree = () => {
    const locals = useGetLocalGovernments();
    const towns = useGetTowns();
    return (
      <StepperLayout>
        <div className='flex flex-col gap-y-2'>
          <div className='h2'>Location Details</div>
          <div className='p'>Kindly enter the details of the school below</div>

          <div className='mt-4 flex flex-col gap-10'>
            <BaseInput
              label='Enter Address'
              name='address'
              placeholder='Details here'
              register={register}
            />

            <Controller
              control={control}
              name='townId'
              render={({ field }) => {
                return <Select options={towns.data ?? []} {...field} />;
              }}
            />

            <Controller
              control={control}
              name='localGovernmentId'
              render={({ field }) => {
                return <Select options={locals.data ?? []} {...field} />;
              }}
            />
          </div>
        </div>
      </StepperLayout>
    );
  };

  const StepFour = () => {
    return (
      <StepperLayout>
        <div className='flex flex-col gap-y-2'>
          <div className='h2'>Permission Details</div>
          <div className='p'>Kindly see the level of permission bebelow:</div>

          <div className='mt-4 flex flex-col gap-10'>
            <BaseInput
              disable
              label='Admin Role Staff'
              name='role'
              register={register}
              placeholder='Chief Education Officers (CEO’s)'
            />
          </div>
          <div className='py-5 font-bold'>Select Permissions*</div>
          <div className='grid w-full grid-cols-1 gap-y-2 md:grid-cols-2'>
            {d.data?.map((v, i) => (
              <div
                onClick={() => {
                  if (permissions.has(i)) {
                    const s = new Set(permissions);
                    s.delete(i);
                    setPermissions(s);
                  } else {
                    const s = new Set(permissions);
                    s.add(i);
                    setPermissions(s);
                  }
                }}
                key={i}
                className='flex cursor-pointer items-center gap-10'
              >
                <AiFillCheckCircle
                  className={clsxm(
                    permissions.has(i) ? 'text-primary-500' : 'text-[#abd4ff]'
                  )}
                />
                <div>{v.value}</div>
              </div>
            ))}
          </div>
        </div>
      </StepperLayout>
    );
  };

  const StepFive = () => {
    return (
      <StepperLayout>
        <div className='flex flex-col gap-y-2'>
          <div className='h2'>Account Details</div>
          <div className='p'>Kindly enter the details of the school below</div>

          <div className='mt-4 flex flex-col gap-10'>
            <BaseInput
              label='Login details'
              name='user_email'
              register={register}
              placeholder='name@mail.com'
            />

            <div className='grid grid-cols-1 gap-x-[30px] gap-y-4 md:w-fit lg:grid-cols-2'>
              <BaseInput
                label='Enter Password'
                name='password'
                register={register}
                placeholder='Password'
                className='md:min-w-[312px] md:max-w-[312px]'
              />
              <BaseInput
                label='Confirm Password'
                name='confirm_password'
                register={register}
                placeholder='Confirm Password'
                className='md:min-w-[312px] md:max-w-[312px]'
              />
            </div>
          </div>
        </div>
      </StepperLayout>
    );
  };

  const StepSix = () => {
    return (
      <StepperLayout>
        <div className='flex flex-col gap-y-2'>
          <div className='h2'>Account Summary</div>
          <div className='p'>
            Kindly ensure that the details below are correct before submitting
          </div>

          <div className='mt-4 flex flex-col gap-10'>
            <NextImage
              alt='ID card'
              width={396}
              height={248}
              src='/images/template_id.png'
            />
          </div>

          <div className='mt-5 flex flex-row gap-x-[19px]'>
            <Button
              variant='outline'
              className='h-10 w-[120px] justify-center whitespace-nowrap border-secondary !text-xs text-secondary'
            >
              Share
            </Button>
            <Button
              variant='outline'
              className='h-10 w-[120px] justify-center whitespace-nowrap border-secondary !text-xs text-secondary'
            >
              Download
            </Button>
            <Button
              variant='outline'
              className='h-10 w-[120px] justify-center whitespace-nowrap border-secondary !text-xs text-secondary'
            >
              Send to Printer
            </Button>
          </div>
        </div>
      </StepperLayout>
    );
  };

  const steps = [
    <StepOne key={0} />,
    <StepTwo key={1} />,
    <StepThree key={2} />,
    <StepFour key={3} />,
    <StepFive key={4} />,
    <StepSix key={5} />,
  ];

  return (
    <div className='flex h-full flex-col'>
      <div className='flex h-full w-full flex-row gap-x-10'>
        <div className='hidden h-[50vh] justify-center border-r border-secondary pl-[14px] pr-[28px] md:flex'>
          <VerticalStepper currentStep={step} steps={stepData} />
        </div>

        <form>
          <div className='flex w-full flex-col'>{steps[step]}</div>
        </form>
      </div>
    </div>
  );
}