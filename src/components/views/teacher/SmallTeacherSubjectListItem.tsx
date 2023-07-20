import Button from '@/components/buttons/Button';
import CreateSubjectActivityModal from '@/components/modals/create-subject-activity-modal';
import Image from 'next/image';
import { IoChevronForwardSharp } from 'react-icons/io5';

export default function SmallTeacherSubjectListItem({
  cl,
  day,
  time,
  onClick,
}: {
  day?: string;
  cl: string;
  time: string;
  onClick?: () => void;
}) {
  return (
    <div className='flex items-center gap-4 p-6 border bg-white'>
      <div className='relative rounded-full border h-20 w-20'>
        <Image
          alt='book-stack'
          className='absolute inset-2'
          src='/images/book_stack.png'
          fill
        />
      </div>
      <div className='flex flex-col'>
        <div className='flex'>
          <div>Class:</div>
          <div className='w-6' />
          <div className='font-bold'>{cl}</div>
        </div>
        <div className='flex'>
          <div>Time:</div>
          <div className='w-6' />
          <div className='font-bold'>{`${day} - ${time}`}</div>
        </div>
      </div>
      <div className='w-10' />
      <CreateSubjectActivityModal>
        <Button variant='secondary'>
          {' '}
          <div>
            {' '}
            <span className='md:hidden block'>+</span>{' '}
            <span className='hidden md:block'>Add Activity</span>{' '}
          </div>{' '}
        </Button>
      </CreateSubjectActivityModal>
      <div className='flex-1' />
      <div className='p-4'>
        <IoChevronForwardSharp
          onClick={onClick}
          className='h-8 w-8 text-[#D4D5D7] cursor-pointer'
        />
      </div>
    </div>
  );
}
