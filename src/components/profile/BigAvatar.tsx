import Image from 'next/image';

export function BigAvatar({ src }: { src: string }) {
  return (
    <div className='relative h-[117px] w-[117px]'>
      <div className='absolute inset-0 rounded-full border-2 border-[#DADEE6]'></div>
      <div className='absolute inset-2 overflow-hidden rounded-full'>
        <Image src={src} alt='profile-picture' fill />
      </div>
    </div>
  );
}
