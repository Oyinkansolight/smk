'use client';

import { LocalGovernmentArea, Town } from '@/types';

interface PublishInterface {
  lga: LocalGovernmentArea | undefined;
  town: Town | undefined;
  location: string | number;
  schoolName: string | number;
  schoolEmail: string | number;
}

const Publish = ({
  lga,
  town,
  location,
  schoolName,
  schoolEmail,
}: PublishInterface) => {
  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>Publish</h2>
      <p>Kindly ensure that the details below are correct before submitting:</p>

      <div className='bg-[#F4F9FF] p-8 rounded-md mt-4'>
        <h2 className='text-xl font-bold mb-10'>Summary</h2>

        <div className='grid grid-cols-12 gap-4  items-center mb-10'>
          <div className='col-span-8'>
            <h2 className='text-xs mb-2 font-medium'>Name</h2>
            <p>{schoolName}</p>
          </div>

          <div className='col-span-4'>
            <h2 className='text-xs mb-2 font-medium'>Address</h2>
            <p>{location}</p>
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4  items-center mb-10'>
          <div className='col-span-8'>
            <h2 className='text-xs mb-2 font-medium'>Official Email</h2>
            <p>{schoolEmail}</p>
          </div>

          <div className='col-span-4'>
            <h2 className='text-xs mb-2 font-medium'>Local Govt</h2>
            <p>{lga?.label}</p>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-4  items-center mb-10'>
          <div className='col-span-8'>
            <h2 className='text-xs mb-2 font-medium'>Town</h2>
            <p>{town?.label}</p>
          </div>
        </div>

        <h2 className='text-center text-base text-[#E5A500] font-medium mb-3'>
          Note
        </h2>
        <p className='text-center'>
          Login details would be generated and sent to the school’s official
          email.
        </p>
      </div>
    </section>
  );
};

export default Publish;