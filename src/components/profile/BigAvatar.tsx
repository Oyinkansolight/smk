import NextImage from '@/components/NextImage';

export function BigAvatar({ src }: { src: string }) {
  return (
    <div className='relative h-[117px] w-[117px]'>
      <div className='absolute inset-0 rounded-full border-2 border-[#DADEE6]'></div>
      <div className='absolute inset-2 overflow-hidden rounded-full'>
        <NextImage
          src={src}
          width={99}
          height={99}
          alt='student-profile-picture'
        />
      </div>
    </div>
  );
}
