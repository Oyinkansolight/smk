import NextImage from '@/components/NextImage';

export function BigAvatar({ src }: { src: string }) {
  return (
    <div className='relative h-[117px] w-[117px]'>
      <div className='absolute inset-0 rounded-full border-2 border-[#DADEE6]'></div>
      <div className='absolute inset-2 overflow-hidden rounded-full'>
        <NextImage
          src={src}
          width={100}
          height={120}
          alt='student-profile-picture'
          className='rounded-full bg-cover'
        />
      </div>
    </div>
  );
}
