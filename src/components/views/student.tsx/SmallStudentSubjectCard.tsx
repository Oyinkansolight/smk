/* eslint-disable @typescript-eslint/no-explicit-any */
import clsxm from '@/lib/clsxm';
import Image from 'next/image';

export default function SmallStudentSubjectCard({
  subject,
  className,
  onClick,
}: {
  subject: any;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={clsxm(
        'flex flex-col items-center justify-center w-full min-w-[200px] max-w-[200px] h-[194px] gap-2 self-center',
        className
      )}
    >
      <div className='relative rounded-full border h-20 w-20'>
        <Image
          alt='book-stack'
          className='absolute inset-2'
          src='/images/book_stack.png'
          fill
        />
      </div>
      <div className='font-bold text-xl'>{subject?.name}</div>
      <div
        onClick={onClick}
        className='text-[#3361FF] text-xs font-semibold cursor-pointer'
      >
        View
      </div>
    </div>
  );
}
