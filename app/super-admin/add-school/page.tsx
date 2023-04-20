'use client';

import Stepper from '@/components/stepper';
import Account from '@/components/views/super-admin/AddSchool/account';
import General from '@/components/views/super-admin/AddSchool/general';
import Location from '@/components/views/super-admin/AddSchool/location';
import Publish from '@/components/views/super-admin/AddSchool/publish';
import logger from '@/lib/logger';
import { useGeocoding } from '@/server/geocoding';
import { useCreateInstitution } from '@/server/institution';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';


const AddStudent = () => {
  const [stage, setStage] = useState(1);
  const [schoolName, setSchoolName] = useState<string | number>('');
  const [schoolEmail, setSchoolEmail] = useState<string | number>('');
  const [imageName, setImageName] = useState<string>('');
  const [, setImageData] = useState();
  const [schoolName1, setSchoolName1] = useState<string | number>('');
  const [schoolEmail1, setSchoolEmail1] = useState<string | number>('');
  const [imageName1, setImageName1] = useState<string>('');
  const [, setImageData1] = useState();
  const [location, setLocation] = useState<string | number>('');
  const [town, setTown] = useState<string | number>('');
  const [lga, setLga] = useState<string | number>('');

  const createInstitution = useCreateInstitution();
  const geocoding = useGeocoding();

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
      stageName: 'General Details',
    },
    {
      stage: 2,
      stageName: 'Location Details',
    },
    {
      stage: 3,
      stageName: 'Account Details',
    },
    {
      stage: 4,
      stageName: 'Publish',
    },
  ];

  return (
    <section className='px-[60px] py-6'>
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Create School</h1>

      <Stepper
        variant='#008146'
        section='super_admin'
        currentStage={stage}
        data={stepperData}
      />

      <div className='table-add-student mt-7 px-20 py-10 pb-4 bg-white'>
        {stage === 1 && (
          <General
            schoolEmail={schoolEmail}
            imageName={imageName}
            schoolName={schoolName}
            setImageData={(v) => setImageData(v)}
            setImageName={(v) => setImageName(v ?? '')}
            setSchoolEmail={setSchoolEmail}
            setSchoolName={setSchoolName}
          />
        )}
        {stage === 2 && (
          <Location
            location={location}
            town={town}
            lga={lga}
            setLocation={setLocation}
            setTown={setTown}
            setLga={setLga}
          />
        )}
        {stage === 3 && (
          <Account
            schoolEmail1={schoolEmail1}
            imageName1={imageName1}
            schoolName1={schoolName1}
            setImageData1={(v) => setImageData1(v)}
            setImageName1={(v) => setImageName1(v ?? '')}
            setSchoolEmail1={setSchoolEmail1}
            setSchoolName1={setSchoolName1}
          />
        )}
        {stage === 4 && (
          <Publish
            onSubmit={async () => {
              try {
                const d = await geocoding.mutateAsync({
                  address: location as string,
                });
                createInstitution.mutateAsync({
                  instituteLat: d[0].geometry?.location?.lat?.toString(),
                  instituteLong: d[0].geometry?.location?.lng?.toString(),
                  instituteAddress: location as string,
                  instituteEmail: schoolEmail as string,
                  instituteName: schoolName as string,
                });
              } catch (error) {
                logger(error);
              }
            }}
          />
        )}

        <div className='my-6 flex justify-end'>
          <div className='flex space-x-6'>
            <button
              onClick={prevHandler}
              className='w-full rounded px-2 py-3 text-xs text-[#3361FF] md:px-6'
            >
              Prev
            </button>
            <button
              onClick={nextHandler}
              className='w-full rounded border bg-[#007AFF] px-8 py-3 text-xs text-[#fff] '
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddStudent;