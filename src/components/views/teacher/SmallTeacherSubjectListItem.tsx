import Button from '@/components/buttons/Button';
import Image from 'next/image';
import { IoChevronForwardSharp } from 'react-icons/io5';

export default function SmallTeacherSubjectListItem({
  cl,
  time,
  onClick,
}: {
  cl: string;
  time: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className='flex items-center gap-4 p-6 border bg-white cursor-pointer'
    >
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
          <div className='font-bold'>{time}</div>
        </div>
      </div>
      <div className='w-10' />
      <Button variant='secondary'>Add Activity</Button>
      <div className='flex-1' />
      <div className='p-4'>
        <IoChevronForwardSharp className='h-8 w-8 text-[#D4D5D7]' />
      </div>
    </div>
  );
}
