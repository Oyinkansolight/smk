import Image from 'next/image';

export default function StudentActionCard({
  img,
  type,
}: {
  img: string;
  type: 'period' | 'assignment' | 'subject';
}) {
  return (
    <div className='flex items-center rounded-xl flex-col w-full bg-white border gap-3 py-4'>
      <div className='py-1 px-3 rounded-md bg-[#BB7101] text-white'>
        1 Ongoing Period
      </div>
      <Image src={img} alt={img} height={60} width={60} />
      <div className='capitalize font-extrabold text-3xl'>{type}</div>
      <div className='shadow-lg py-1 px-8 border rounded-lg border-[#3361FF]'>
        <div>View</div>
      </div>
    </div>
  );
}
