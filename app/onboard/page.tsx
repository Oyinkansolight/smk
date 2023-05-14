/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';
import Dragdrop from '@/components/input/dragdrop';
import Success from '@/components/modal/Success';
import { VerticalStepper } from '@/components/stepper';
import { uploadDocument } from '@/firebase/init';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';
import { useGeocoding } from '@/server/geocoding';
import { useCompleteInstitutionOnboarding, useOnboardVerification } from '@/server/institution';
import { useGetLocalGovernments } from '@/server/onboard';
import { LocalGovernmentArea, Town } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'react-toastify';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';



import '/src/styles/globals.css';


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
    title: 'Account Details',
  },
  {
    title: 'Publish',
  },
];

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const institutions = [{id:0, label: 'ECCDE'}, {id: 1, label: 'PRIMARY'}, {id: 2, label: 'SECONDARY'}, {id: 3, label: 'TERTIARY'}];
  const [type, setType] = useState<{id: number, label: string} | null>();
  // const d = useGetPermissions();
  const [imageName, setImageName] = useState<string>('');
  const [imageData, setImageData] = useState<File>();
  // const [permissions, setPermissions] = useState(new Set<number>());
  const [isComplete, setIsComplete] = useState(false);

  logger(imageData);

  const handleStepChange = (step: number) => setStep(step);
  const handleBack = () => step > 0 && setStep(step - 1);
  const { register, getValues, control } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  let token = '';

  if (typeof window !== 'undefined') {
    const query = window.location.search.substring(1);
    token = query.split('=')[1];
  }

  const create = useCompleteInstitutionOnboarding();
  const verification = useOnboardVerification();
  const geo = useGeocoding();

  useEffect(() => {
    setIsLoading(true);
    const verifyUser = async () => {
      const res = await verification.mutateAsync(token);
      if (res.data.data.message === 'Token verified successfully.') {
        toast.success('Institution verified successfully.');
        setUser(res.data.data.data);
        // console.log(res.data.data);
        setIsLoading(false);
      }
    };

    verifyUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
            const password = getValues('password');
            const con = getValues('confirm_password');
            if (step === 3) {
              if (password !== con) {
                toast.error('Password mismatch');
                return;
              }
            }
            if (step < steps.length - 1) {
              handleStepChange(step + 1);
            } else {
              try {
                const d = await geo.mutateAsync({
                  address: getValues('instituteAddress'),
                });
                if (d.length === 0) {
                  toast.error('Invalid address. Re enter your address');
                }
                const buffer = await imageData?.arrayBuffer();
                const p = `profile_picture/${imageName}`;
                if (buffer) {
                  uploadDocument(p, buffer);
                }
                await create.mutateAsync({
                  // ...getValues(),
                  town: (getValues('townId') as Town | undefined)?.id,
                  role: 1,
                  instituteType: type?.label,
                  password: getValues('password'),
                  instituteLat: d[0].geometry?.location?.lat?.toString() ?? '0',
                  instituteLong:
                    d[0].geometry?.location?.lat?.toString() ?? '0',
                  email: user?.instituteEmail ?? 'e@mail.com',
                  instituteLogo: p,
                  instituteAddress: getValues('instituteAddress'),
                  id: user?.id ?? Math.floor(Math.random() * 1000),
                  // permissions: Array.from(permissions.values()).join(','),
                });
                setIsComplete(true);
              } catch (error) {
                logger(error);
                // toast.error('Error');
                // router
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
    return (
      <StepperLayout>
        <div className='flex flex-col gap-y-2'>
          <div className='h2'>General Details</div>
          <div className='p'>Kindly enter the details of the school below</div>

          <div className='mt-4 flex flex-col gap-10'>
            <div className='grid grid-cols-1 gap-x-[30px] gap-y-4 md:w-fit lg:grid-cols-2'>
              <BaseInput
                label='Institution Name'
                name='name'
                placeholder='Name'
                register={register}
                value={user?.instituteName}
              />

              <Dragdrop
                className='max-h-10 items-center flex'
                setImageName={setImageName}
                imageName={imageName}
                label='Upload School Logo*'
                setImageData={setImageData}
              />
            </div>

            <div className='grid grid-cols-1 gap-x-[30px] gap-y-4 md:w-fit lg:grid-cols-2'>
              <BaseInput
                label='Institution Official Email'
                name='email'
                placeholder='Details here'
                register={register}
                value={user?.instituteEmail}
              />
              <div>
                <div
        className={clsxm(
          'block text-sm font-semibold mb-2 text-gray-400 text-left',
        )}
      >
        Select Institution Type
      </div>
                <Select

                value={type}
                onChange={(v)=>setType(v)}
                options={institutions}
              />
              </div>
            </div>
          </div>
        </div>
      </StepperLayout>
    );
  };

  const StepThree = () => {
    const locals = useGetLocalGovernments();
    // const towns = useGetTowns(currentTownIndex);

    // const handleGetTownIndex = (e: any) => {
    //   // setCurrentTownIndex(e.target.value);
    //   logger(e.target.value);
    // };

    return (
      <StepperLayout>
        <div className='flex flex-col gap-y-2'>
          <div className='h2'>Location Details</div>
          <div className='p'>Kindly enter the details of the school below</div>

          <div className='mt-4 flex flex-col gap-10'>
            <BaseInput
              label='Enter Address'
              name='instituteAddress'
              placeholder='Details here'
              register={register}
              value={user?.instituteAddress}
            />

            <div className='flex flex-col'>
              <div>Select LGA</div>
              <Controller
                control={control}
                name='localGovernmentId'
                render={({ field }) => {
                  return <Select options={locals.data ?? []} {...field} />;
                }}
              />
            </div>

            <div className='flex flex-col'>
              <div>Select Town</div>

              <Controller
                control={control}
                name='townId'
                render={({ field }) => {
                  return (
                    <Select
                      options={
                        locals.data?.find(
                          (v) =>
                            v.id ===
                            (
                              getValues(
                                'localGovernmentId'
                              ) as LocalGovernmentArea
                            )?.id
                        )?.towns
                      }
                      {...field}
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
      </StepperLayout>
    );
  };

  // const StepFour = () => {
  //   return (
  //     <StepperLayout>
  //       <div className='flex flex-col gap-y-2'>
  //         <div className='h2'>Permission Details</div>
  //         <div className='p'>Kindly see the level of permission bebelow:</div>

  //         <div className='mt-4 flex flex-col gap-10'>
  //           <BaseInput
  //             disable
  //             label='Admin Role Staff'
  //             name='role'
  //             register={register}
  //             placeholder='Chief Education Officers (CEO’s)'
  //           />
  //         </div>
  //         <div className='py-5 font-bold'>Permissions*</div>
  //         <div className='grid w-full grid-cols-1 gap-y-2 md:grid-cols-2'>
  //           {d.data?.map((v, i) => (
  //             <div
  //               onClick={() => {
  //                 if (permissions.has(i)) {
  //                   const s = new Set(permissions);
  //                   s.delete(i);
  //                   setPermissions(s);
  //                 } else {
  //                   const s = new Set(permissions);
  //                   s.add(i);
  //                   setPermissions(s);
  //                 }
  //               }}
  //               key={i}
  //               className='flex cursor-pointer items-center gap-10'
  //             >
  //               <AiFillCheckCircle
  //                 className={clsxm(
  //                   permissions.has(i) ? 'text-primary-500' : 'text-[#abd4ff]'
  //                 )}
  //               />
  //               <div>{v.value}</div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </StepperLayout>
  //   );
  // };

  // const StepFour = () => {
  //   return (
  //     <StepperLayout>
  //       <div className='flex flex-col gap-y-2'>
  //         <div className='h2'>Staff Details</div>
  //         <div className='p'>
  //           Kindly enter the details of the institution below:
  //         </div>

  //         <div className='mt-4 flex flex-col gap-10 mb-10'>
  //           <BaseInput
  //             label='Enter Number of Staff *'
  //             name='staff_number'
  //             register={register}
  //             placeholder='Details here'
  //           />
  //         </div>

  //         <Dragdrop
  //           className='h-[255px] max-h-[255px] items-center flex flex-col'
  //           setImageName={setImageName}
  //           imageName={imageName}
  //           label='Upload CSV'
  //           setImageData={setImageData}
  //         />
  //       </div>
  //     </StepperLayout>
  //   );
  // };

  // const StepFive = () => {
  //   return (
  //     <StepperLayout>
  //       <div className='flex flex-col gap-y-2'>
  //         <div className='h2'>Student Details</div>
  //         <div className='p'>
  //           Kindly enter the details of the institution below:
  //         </div>

  //         <div className='mt-4 flex flex-col gap-10 mb-10'>
  //           <BaseInput
  //             label='Enter Number of Students *'
  //             name='student_number'
  //             register={register}
  //             placeholder='Details here'
  //           />
  //         </div>

  //         <Dragdrop
  //           className='h-[255px] max-h-[255px] items-center flex flex-col'
  //           setImageName={setImageName}
  //           imageName={imageName}
  //           label='Upload CSV'
  //           setImageData={setImageData}
  //         />
  //       </div>
  //     </StepperLayout>
  //   );
  // };

  const StepSix = () => {
    return (
      <StepperLayout>
        <div className='flex flex-col gap-y-2'>
          <div className='h2'>Account Details</div>
          <div className='p'>Kindly enter the details of the school below</div>

          <div className='mt-4 flex flex-col gap-10'>
            <BaseInput
              disable
              label='Login details'
              name='user_email'
              register={register}
              value={user?.instituteEmail}
            />

            <div className='grid grid-cols-1 gap-x-[30px] gap-y-4 md:w-fit lg:grid-cols-2'>
              <BaseInput
                type='password'
                label='Enter Password'
                name='password'
                register={register}
                placeholder='Password'
                className='md:min-w-[312px] md:max-w-[312px]'
              />
              <BaseInput
                type='password'
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

  const StepSeven = () => {
    return (
      <StepperLayout>
        <section className=''>
          <h2 className='text-2xl font-bold'>Publish</h2>
          <p>
            Kindly ensure that the details below are correct before submitting:
          </p>

          <div className='bg-[#F4F9FF] p-8 rounded-md mt-4'>
            <h2 className='text-xl font-bold mb-10'>Summary</h2>

            <div className='grid grid-cols-12 gap-4  items-center mb-10'>
              <div className='col-span-8'>
                <h2 className='text-xs mb-2 font-medium'>Name</h2>
                <p>{user?.instituteName}</p>
              </div>

              <div className='col-span-4'>
                <h2 className='text-xs mb-2 font-medium'>Address</h2>
                <p>{getValues('instituteAddress')}</p>
              </div>
            </div>

            <div className='grid grid-cols-12 gap-4  items-center mb-10'>
              <div className='col-span-8'>
                <h2 className='text-xs mb-2 font-medium'>Official Email</h2>
                <p>{user?.instituteEmail}</p>
              </div>

              <div className='col-span-4'>
                <h2 className='text-xs mb-2 font-medium'>Local Govt</h2>
                {/* <p>{getValues("localGovernmentId") ?? "Etsako"}</p> */}
                <p>Etsako</p>
              </div>
            </div>
            <div className='grid grid-cols-12 gap-4  items-center mb-10'>
              <div className='col-span-8'>
                <h2 className='text-xs mb-2 font-medium'>Town</h2>
                {/* <p>{getValues("townId") ?? "Agbor"}</p> */}
                <p>Agbor</p>
              </div>
            </div>

            <div className='h-[0.5px] bg-black' />

            <h2 className='text-center text-base text-[#E5A500] font-medium mb-3 mt-[30px]'>
              Note
            </h2>
            <p className='text-center'>
              Login details would be generated and sent to the school&apos;s
              official email.
            </p>
          </div>
        </section>
      </StepperLayout>
    );
  };

  const steps = [
    <StepOne key={0} />,
    <StepTwo key={1} />,
    <StepThree key={2} />,
    <StepSix key={5} />,
    <StepSeven key={6} />,
  ];

  if (isLoading) {
    return (
      <div className='flex w-screen h-2/3 items-center justify-center'>
        <div className='flex flex-col gap-3'>
          <div className='text-center'>Verifying Token</div>

          <Image
            width={154}
            height={53}
            className='animate-bounce'
            src='/images/edo_logo.png'
            alt=''
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex h-full flex-col'>
        <div className='flex h-full w-full flex-row gap-x-10'>
          <div className='hidden h-[50vh] justify-center border-r border-secondary pl-[14px] pr-[28px] md:flex'>
            <VerticalStepper currentStep={step} steps={stepData} />
          </div>

          <form className='w-full overflow-y-scroll'>
            <div className='flex w-full flex-col'>{steps[step]}</div>
          </form>

          {isComplete && (
            <Success
              showHome={false}
              title='Account created successfully'
              description='You can now access your account.'
              link='/auth/admin'
              textLink='Go to Access Portal'
            />
          )}
        </div>
      </div>
    );
  }
}