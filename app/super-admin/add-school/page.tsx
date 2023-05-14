'use client';

import Success from '@/components/modal/Success';
import Stepper from '@/components/stepper';
import Account from '@/components/views/super-admin/AddSchool/account';
import General from '@/components/views/super-admin/AddSchool/general';
import Location from '@/components/views/super-admin/AddSchool/location';
import Publish from '@/components/views/super-admin/AddSchool/publish';
import { uploadDocument } from '@/firebase/init';
import logger from '@/lib/logger';
import { useGeocoding } from '@/server/geocoding';
import { useCreateInstitution } from '@/server/institution';
import { GeoCodeResponse } from '@/types/geocode';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

const AddSchool = () => {
  const [stage, setStage] = useState(1);
  const [isOpen, setisOpen] = useState(false);
  const [schoolName, setSchoolName] = useState<string | number>('');
  const [schoolEmail, setSchoolEmail] = useState<string | number>('');
  const [imageName, setImageName] = useState<string>('');
  const [imageData, setImageData] = useState<File | undefined>();
  const [password, setPassword] = useState('');
  // const [schoolName1, setSchoolName1] = useState<string | number>('');
  // const [schoolEmail1, setSchoolEmail1] = useState<string | number>('');
  // const [imageName1, setImageName1] = useState<string>('');
  // const [, setImageData1] = useState();
  const [location, setLocation] = useState<string | number>('');
  const [town, setTown] = useState<string | number>('');
  const [lga, setLga] = useState<string | number>('');
  let googleAddress: GeoCodeResponse[] = [];

  const geocode = useGeocoding();

  logger(imageData);

  const createInstitution = useCreateInstitution();

  const nextHandler = async () => {
    if (stage === 1) {
      if (schoolName === '' || schoolEmail === '' || !imageData) {
        toast.error('Please enter a value for all fields');
      } else {
        setStage(2);
      }
    }
    if (stage === 2) {
      if (location === '' || lga === '' || town === '') {
        toast.error('Please enter all value for all fields');
      } else {
        googleAddress = await geocode.mutateAsync({
          address: location as string,
        });
        if (googleAddress.length === 0) {
          toast.error('Invalid address');
          return;
        }
        setStage(3);
      }
    }
    if (stage === 3) {
      setStage(4);
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Create School</h1>

      <Stepper
        variant='#008146'
        section='super_admin'
        currentStage={stage}
        data={stepperData}
      />

      <div className='table-add-student mt-7 md:px-20 px-4 py-10 pb-4 bg-white'>
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
            schoolEmail={schoolEmail}
            imageName={imageName}
            schoolName={schoolName}
            setImageData={(v) => setImageData(v)}
            setImageName={(v) => setImageName(v ?? '')}
            setSchoolEmail={setSchoolEmail}
            setSchoolName={setSchoolName}
            password={password}
            setPassword={setPassword}
          />
        )}
        {stage === 4 && (
          <Publish
            lga={lga}
            town={town}
            location={location}
            schoolName={schoolName}
            schoolEmail={schoolEmail}
          />
        )}

        <div className='my-6 flex justify-end'>
          <div className='flex space-x-6'>
            <button
              onClick={prevHandler}
              className='w-full rounded px-2 py-3 text-xs text-[#008146] md:px-6'
            >
              Prev
            </button>
            {stage <= 3 ? (
              <button
                onClick={nextHandler}
                className='w-full rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
              >
                Next
              </button>
            ) : (
              <button
                onClick={async () => {
                  try {
                    toast.info('Creating Institution...');
                    const array = await imageData?.arrayBuffer();
                    const p = `profile_pictures/${imageName}`;
                    if (array) {
                      await uploadDocument(p, array);
                    }
                    const response = createInstitution.mutateAsync({
                      instituteLat:
                        googleAddress[0].geometry?.location?.lat?.toString(),
                      instituteLong:
                        googleAddress[0].geometry?.location?.lng?.toString(),
                      instituteAddress: location as string,
                      instituteEmail: schoolEmail as string,
                      instituteName: schoolName as string,
                      instituteLogo: p,
                      instituteType: 'SECONDARY',
                      town: 1,
                      email: schoolEmail as string,
                      password: password,
                      role: 1,
                    });

                    if ((await response).data) setisOpen(true);
                  } catch (error) {
                    logger(error);
                  }
                }}
                className='w-full rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
              >
                Publish
              </button>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <Success
          title='Institution created successfully'
          description='Login details would be generated and sent to the school’s official email.'
          link='/super-admin/all-school'
          textLink='Manage School'
        />
      )}
    </section>
  );
};

export default AddSchool;