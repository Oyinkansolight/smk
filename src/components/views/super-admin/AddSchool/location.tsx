'use client';

import LocationInput from '@/components/input/Location';
import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import { useGetLocalGovernments } from '@/server/onboard';
import { LocalGovernmentArea, Town } from '@/types';
import { GeoCodeResponse } from '@/types/geocode';

interface LocationBioProps {
  location: string | GeoCodeResponse;
  setLocation: (v: string | GeoCodeResponse) => void;
  town: Town | undefined;
  setTown: (v: Town) => void;
  lga: LocalGovernmentArea | undefined;
  setLga: (v: LocalGovernmentArea) => void;
  setLat: (v: string | number) => void;
  setLng: (v: string | number) => void;
  lat: string | number;
  lng: string | number;
}

const Location = ({
  // location,
  town,
  lga,
  setLga,
  setLocation,
  setTown,
  setLat,
  setLng,
  lng,
  lat,
}: LocationBioProps) => {
  const { data } = useGetLocalGovernments();

  //create local government array in edo state nigeria

  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>Location Details</h2>
      <p>Kindly enter the details of the institution below:</p>

      <div className='space-y-10 mt-10'>
        {/* <div className=' w-full gap-6'>
          <FormInput
            label='Enter Address'
            formValue={
              typeof location === 'string'
                ? location
                : location.formatted_address
            }
            placeholder='Details here'
          />
        </div> */}

        <div className=' w-full gap-6'>
          <LocationInput
            onChanged={(v) => setLocation(v)}
            setLat={setLat}
            setLng={setLng}
          />
        </div>
        <div className='my-10 grid md:grid-cols-2 gap-6'>
          <div className='w-full'>
            <FormInput
              label='Institution Latitude*'
              setFormValue={setLat}
              formValue={lat}
              placeholder='Details here'
              validation={{
                required: 'Latitude is required',
              }}
            />
          </div>

          <div className='w-full'>
            <FormInput
              label='Institution Longitude*'
              setFormValue={setLng}
              formValue={lng}
              placeholder='Details here'
              validation={{
                required: 'Longitude is required',
              }}
            />
          </div>
        </div>

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
            options={data?.map((v) => v.label ?? '' ?? 'NULL') ?? []}
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

export default Location;
