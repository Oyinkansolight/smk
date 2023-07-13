import clsxm from '@/lib/clsxm';
import Image from 'next/image';

export default function SubjectCard({
  subject,
  className,
}: {
  subject: string;
  className?: string;
}) {
  return (
    <div
      className={clsxm(
        'flex flex-col items-center w-[240px] h-[200px] justify-center gap-2 cursor-pointer self-center rounded-lg',
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
      <div className='font-bold text-2xl'>{subject}</div>
    </div>
  );
}
