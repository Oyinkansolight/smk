import Image from 'next/image';
import Link from 'next/link';

const Overview = ({
  src,
  title,
  count,
  link,
}: {
  title: string;
  count: number;
  link: string;
  src: string;
}) => {
  return (
    <div className='rounded-lg bg-[#040930] bg-gradient-to-bl from-[#040930] via-white/[10%]  backdrop-blur-3xl backdrop-opacity-60 space-y-2 px-2 py-4'>
      <div>
        <div>
          {' '}
          <Image
            src={src}
            height={40}
            width={40}
            alt='image_count'
          />{' '}
        </div>
        <p className='text-sm text-[#8E8E8E]'>{title}</p>
      </div>
      <div className='w-full'>
        <h1 className='text-white text-xl'>{count}</h1>
        <div className='flex justify-center'>
          {' '}
          <Link href={link} className='mt-3 text-base text-secondary'>
            Click to View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;