'use client';

import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import { useGetLocalGovernments } from '@/server/onboard';

interface LocationBioProps {
  location: string | number;
  setLocation: (v: string | number) => void;
  town: string | number;
  setTown: (v: string | number) => void;
  lga: string | number;
  setLga: (v: string | number) => void;
}

const Biodata = ({
  location,
  town,
  lga,
  setLga,
  setLocation,
  setTown,
}: LocationBioProps) => {
  const { data } = useGetLocalGovernments();

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

        <div className='w-full mt-4'>
          <FormSelect
            label='Select Local Government '
            formValue={lga}
            setFormValue={setLga}
            options={data?.map((v) => v.label ?? 'NULL') ?? []}
          />
        </div>

        <div className='w-full'>
          <FormSelect
            label='Select Town*'
            formValue={town}
            setFormValue={setTown}
            options={
              data
                ?.find((v) => v.name === lga)
                ?.towns?.map((v) => v.label ?? '') ?? []
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Biodata;