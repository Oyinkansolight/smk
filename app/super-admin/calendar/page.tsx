/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Success from '@/components/modal/Success';
import Stepper from '@/components/stepper';
import Details from '@/components/views/super-admin/AddClassSubject/Details';
import Publish from '@/components/views/super-admin/AddClassSubject/publish';
import Paramter from '@/components/views/super-admin/Calendar/Parameter';
import Firstterm from '@/components/views/super-admin/Calendar/firstterm';
import Secondterm from '@/components/views/super-admin/Calendar/secondterm';
import Thirdterm from '@/components/views/super-admin/Calendar/thirdterm';
// import { useCreateStaff } from '@/server/institution';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const TransferStudent = () => {
  const {
    register,

    formState: { errors },
    handleSubmit,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  const [stage, setStage] = useState(1);
  const [isOpen, setisOpen] = useState(false);
  const [publishData, setpublishData] = useState(null);

  const [calendar, setcalendar] = useState([
    { state: '', end: '', activity: '' },
  ]);
  const [session, setSession] = useState<string | number>('2022/2023');
  const [schoolType, setschoolType] = useState<string | number>('Primary 1');

  const addMoreSchedule = () => {
    setcalendar([...calendar, { state: '', end: '', activity: '' }]);
  };
  const removeClass = (id: number) => {
    const calendarCopy = [...calendar];
    calendarCopy.splice(id, 1);
    setcalendar([...calendarCopy]);
  };

  // const onSubmit: SubmitHandler<any> = async (data) => {
  //   console.log(errors);
  //   console.log(data);
  //   if (
  //     stage === 1 &&
  //     data.className &&
  //     data.classTeacher &&
  //     data.classCapacity
  //   ) {
  //     setStage(stage + 1);
  //   }

  //   if (stage === 2) {
  //     setisOpen(true);

  //     // try {
  //     //   const response = await handleCreateStaff.mutateAsync(data);

  //     //   if (response) {
  //     //     toast.success('Login successful');

  //     //     //2 Second - Open Success Modal
  //     //     setisOpen(true);
  //     //   }
  //     // } catch (error) {
  //     //   toast.error((error as Error).message);
  //     // }
  //   }
  // };

  const nextHandler = (): void => {
    // handleSubmit(onSubmit);
    // console.log(getValues())
    // console.log(formState)

    if (stage >= 1 && stage <= 5) {
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
      stageName: 'First Term Timetable',
    },

    {
      stage: 2,
      stageName: 'Publish',
    },
  ];

  return (
    <section className='md:px-[60px] px-5 py-6'>
      {isOpen && (
        <Success
          title='Class Account created successfully'
          description='Hurray!'
          link='/admin/all-classes'
          textLink='Manage Classes'
        />
      )}
      <Link href='/admin'>
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
      <h1 className='mt-5 mb-6 text-2xl font-bold'>Add Timetable</h1>

      <Stepper
        variant='#008146'
        section='super-admin'
        currentStage={stage}
        data={stepperData}
      />

      <div className='flex items-start gap-6 mt-7'>
        <div className='w-[100%] table-add-student  lg:px-20 px-4 py-10 pb-4 bg-white'>
          <section>
            {/* {stage === 1 && (
              <Paramter
                setschoolType={setschoolType}
                schoolType={schoolType}
                setSession={setSession}
                session={session}
              />
            )} */}

            {stage === 1 && (
              <Firstterm
                schoolType={schoolType}
                session={session}
                addMoreSchedule={addMoreSchedule}
                calendar={calendar}
                setcalendar={setcalendar}
              />
            )}
            {stage === 2 && (
              <Secondterm
                schoolType={schoolType}
                session={session}
                addMoreSchedule={addMoreSchedule}
                calendar={calendar}
                setcalendar={setcalendar}
              />
            )}
            {stage === 3 && (
              <Thirdterm
                schoolType={schoolType}
                session={session}
                addMoreSchedule={addMoreSchedule}
                calendar={calendar}
                setcalendar={setcalendar}
              />
            )}
            {stage === 4 && <Publish publishData={publishData} />}
            <div className='mb-6 mt-32 flex justify-end'>
              <div className='flex space-x-6'>
                <button
                  type='button'
                  onClick={prevHandler}
                  className='cursor-pointer w-full rounded px-2 py-3 text-xs text-primary md:px-6'
                >
                  Prev
                </button>
                {true && (
                  <button
                    onClick={nextHandler}
                    className='w-full rounded border bg-primary px-8 py-3 text-xs text-[#fff] '
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
        {/* <div className='w-[20%] bg-white p-4 h-20'></div> */}
      </div>
    </section>
  );
};

export default TransferStudent;
