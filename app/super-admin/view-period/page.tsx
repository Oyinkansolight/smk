'use client';

import Button from '@/components/buttons/Button';
import Success from '@/components/modal/Success';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ViewPeriod = () => {
  const router = useRouter();
  const [isOpen] = useState(false);
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

      <div className='flex items-center'>
        <h1 className='mt-5 mb-6 text-2xl font-bold'>
          First Term Primary 1 Mathematics Curriculum - Period 1
        </h1>
        <div className='flex-1' />
        <Button
          onClick={() => {
            router.push('/super-admin/edit-period');
          }}
          variant='outline'
        >
          Edit
        </Button>
      </div>

      <div className='table-add-student mt-7 px-20 py-10 pb-4 bg-white'>
        <div className='grid grid-cols-2 w-full'>
          <div className='font-bold'>Week</div>
          <div className='font-bold'>Period</div>
          <div>Week 1</div>
          <div>Period 1</div>
        </div>
        <div className='h-10' />
        <div className='grid grid-cols-2'>
          <div className='font-bold'>Subject</div>
          <div />
          <div>Mathematics</div>
        </div>
        <div className='h-px w-full bg-black my-10' />
        <div className='grid grid-cols-2 w-full'>
          <div className='font-bold'>Title</div>
          <div className='font-bold'>Teaching Method</div>
          <div>Primary 1</div>
          <div>Mathematics, English, Yoruba</div>
        </div>
        <div className='h-10' />

        <div className='grid grid-cols-2 w-full'>
          <div className='font-bold'>Instructional Materials</div>
          <div className='font-bold'>Teacher Preparation for the lesson</div>
          <div>Primary 1</div>
          <div>Mathematics, English, Yoruba</div>
        </div>
        <div className='h-px w-full bg-black my-10' />
        <div className='grid grid-cols-2 w-full'>
          <div className='font-bold'>Step 1</div>
          <div className='font-bold'>Subjects</div>
          <div>Primary 1</div>
          <div>Mathematics, English, Yoruba</div>
        </div>
      </div>
      {isOpen && (
        <Success
          title='School created successfully'
          description='Login details would be generated and sent to the school’s official email.'
          link='/super-admin/all-school'
          textLink='Manage School'
        />
      )}
    </section>
  );
};

export default ViewPeriod;
