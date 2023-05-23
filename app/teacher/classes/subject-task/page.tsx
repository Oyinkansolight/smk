'use client';

import Button from '@/components/buttons/Button';
import CreateSubjectActivityModal from '@/components/modals/create-subject-activity-modal';
import { IoAddCircle } from 'react-icons/io5';

export default function Page() {
  return (
    <div className='px-8'>
      <div className='text-[#D4D5D7] py-8 text-2xl'>
        {'Classes > Mathematics'}
      </div>
      <div className='font-bold py-8 text-4xl'>Mathematics - Primary 1</div>
      <div className='text-2xl'>
        <span className='font-bold'>Period: </span>October 16, 12:00 PM - 1:00
        PM
      </div>
      <div className='flex justify-start my-6'>
        <Button variant='secondary'>Take Attendance</Button>
      </div>
      <div className='flex items-start gap-10'>
        <div className='flex-1 h-96 rounded-lg bg-white'></div>
        <div className='bg-white p-4 flex flex-col gap-4 rounded-lg'>
          <div className='text-xl font-bold'>Lesson Tasks</div>
          <div className='flex justify-between rounded-md bg-[#F7F8FA] p-5'>
            <div className=''>Home Work</div>
            <div className='w-16' />
            <div>Due: October 24</div>
          </div>
          <div className='rounded-md bg-[#F7F8FA] p-5'>Class Work</div>
          <div className='rounded-md bg-[#F7F8FA] p-5'>Pop Quiz</div>
          <CreateSubjectActivityModal>
            <div className='flex justify-end'>
              <IoAddCircle className='h-8 w-8 text-blue-500' />
            </div>
          </CreateSubjectActivityModal>
        </div>
      </div>
    </div>
  );
}
