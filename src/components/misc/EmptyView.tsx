import Image from 'next/image';

export default function EmptyView({ label }: { label: string }) {
  return (
    <div className='bg-white flex flex-col gap-4 items-center justify-center'>
      <Image
        height={128}
        width={128}
        src='/images/empty_box.png'
        alt='empty box'
      />
      <div>{label}</div>
    </div>
  );
}
