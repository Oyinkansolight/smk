import clsxm from '@/lib/clsxm';
import Image from 'next/image';

export default function GradeSubjectCard({
  subject,
  className,
  onClick,
}: {
  subject: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={clsxm(
        'flex flex-col items-center justify-center w-[210px] h-[195px] gap-[17px] cursor-pointer self-center rounded-lg',
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
      <div className='font-bold text-xl leading-6 text-center'>{subject}</div>
    </div>
  );
}
