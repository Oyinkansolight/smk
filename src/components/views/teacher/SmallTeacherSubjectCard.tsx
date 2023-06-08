import clsxm from '@/lib/clsxm';
import Image from 'next/image';


export default function SmallTeacherSubjectCard({
  isNext,
  subject,
  assignmentDue,
  tasks,
  className,
  onClick,
  showTasks = true,
}: {
  isNext: boolean;
  subject: string;
  assignmentDue: number;
  tasks: number;
  className?: string;
  onClick?: () => void;
  showTasks?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={clsxm(
        'flex flex-col items-center w-[240px] h-[284px] gap-2 cursor-pointer self-center rounded-lg',
        className
      )}
    >
      <div className='flex w-full justify-end'>
        <div
          className={clsxm(
            'py-2 px-4 mx-4 rounded-md my-2 bg-[#6A2B56] font-bold text-white',
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
      {showTasks && (
        <div className='w-full p-2'>
          <div className='w-full h-[90px] rounded-lg bg-white p-4'>
            <div>
              <span className='font-bold'>{assignmentDue}</span> Assignment Due
            </div>
            <div>
              <span className='font-bold'>{tasks}</span> Tasks This Week
            </div>
          </div>
        </div>
      )}
    </div>
  );
}