'use client';

import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';
import { GeocodingParams, useGeocoding } from '@/server/geocoding';
import React from 'react';
import { useForm } from 'react-hook-form';

const Page = () => {
  const { register, handleSubmit } = useForm<GeocodingParams, unknown>({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const geocoding = useGeocoding();

  const onSubmit = async (data: GeocodingParams) => {
    try {
      const response = await geocoding.mutateAsync(data);

      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseInput
        name='address'
        label='Address'
        register={register}
        placeholder='Enter address here'
      />
      <Button type='submit' className='h-[54px] justify-center'>
        Get Address
      </Button>
    </form>
  );
};

export default Page;
