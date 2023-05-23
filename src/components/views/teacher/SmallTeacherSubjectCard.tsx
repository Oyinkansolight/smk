import clsxm from '@/lib/clsxm';
import Image from 'next/image';

export default function SmallTeacherSubjectCard({
  isNext,
  subject,
  assignmentDue,
  tasks,
  className,
  onClick,
}: {
  isNext: boolean;
  subject: string;
  assignmentDue: number;
  tasks: number;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={clsxm(
        'flex flex-col items-center max-w-xs gap-5 cursor-pointer self-center w-full',
        className
      )}
    >
      <div className='flex w-full justify-end'>
        <div
          className={clsxm(
            'py-2 px-4 mx-4 rounded-md my-6 bg-[#6A2B56] font-bold text-white',
            !isNext && 'opacity-0'
          )}
        >
          Next Class
        </div>
      </div>
      <div className='relative rounded-full border h-20 w-20'>
        <Image
          alt='book-stack'
          className='absolute inset-2'
          src='/images/book_stack.png'
          fill
        />
      </div>
      <div className='font-bold text-2xl'>{subject}</div>
      <div className='w-full p-2'>
        <div className='w-full h-24 rounded-lg bg-white p-4'>
          <div>
            <span className='font-bold'>{assignmentDue}</span> Assignment Due
          </div>
          <div>
            <span className='font-bold'>{tasks}</span> Tasks This Week
          </div>
        </div>
      </div>
    </div>
  );
}
