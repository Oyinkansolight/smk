'use client';

import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import { useGetLocalGovernments } from '@/server/onboard';
import { LocalGovernmentArea, Town } from '@/types';
import { useRef, useState } from 'react';

interface LocationBioProps {
  location: string | number;
  setLocation: (v: string | number) => void;
  town: Town | undefined;
  setTown: (v: Town) => void;
  lga: LocalGovernmentArea | undefined;
  setLga: (v: LocalGovernmentArea) => void;
}

const Biodata = ({
  location,
  town,
  lga,
  setLga,
  setLocation,
  setTown,
}: LocationBioProps) => {
  const inputRef = useRef(null);
  const { data } = useGetLocalGovernments();
  const [country, setCountry] = useState('ng')

  //create local government array in edo state nigeria


  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>Location Details</h2>
      <p>Kindly enter the details of the school below:</p>

      <div className='space-y-10 mt-10'>
        <div className=' w-full gap-6'>
          <FormInput
            label='Enter Address'
            setFormValue={setLocation}
            formValue={location}
            placeholder='Details here'
          />
        </div>

        {/* <div className=' w-full gap-6'>
          <LocationInput />
        </div> */}

        <div className='w-full mt-4'>
          <FormSelect
            label='Select Local Government '
            formValue={lga?.label}
            setFormValue={(value) => {
              const l = data?.find((v) => v.label === value);
              if (l) {
                setLga(l);
              }
            }}
            options={data?.map((v) => v.label ?? 'NULL') ?? []}
          />
        </div>

        <div className='w-full'>
          <FormSelect
            label='Select Town*'
            formValue={town?.label}
            setFormValue={(value) => {
              if (lga) {
                const t = lga.towns?.find(
                  (townValue) => value === townValue.label
                );
                if (t) {
                  setTown(t);
                }
              }
            }}
            options={
              data
                ?.find((v) => v.id === lga?.id)
                ?.towns?.map((v) => v.label ?? '') ?? []
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Biodata;
