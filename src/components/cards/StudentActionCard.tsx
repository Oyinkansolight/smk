import Image from 'next/image';

export default function StudentActionCard({
  img,
  type,
  ongoing = false,
}: {
  img: string;
  ongoing?: boolean;
  type: 'period' | 'assignment' | 'subject';
}) {
  return (
    <div className='flex items-center rounded-xl flex-col justify-between w-full bg-white border gap-3 py-4 max-w-[250px] h-[273px]'>
      {ongoing ? (
        <div className='flex items-center font-semibold text-base leading-6 whitespace-nowrap justify-center py-1 px-3 rounded-md bg-[#BB7101] text-white w-full max-w-[163px] h-full max-h-[32px]'>
          1 Ongoing Period
        </div>
      ) : (
        <div className='h-8' />
      )}
      <Image src={img} alt={img} height={80} width={80} />
      <div className='capitalize font-bold text-2xl leading-7'>{type}</div>
      <button className='shadow-lg py-1 px-8 border rounded-lg border-[#3361FF] w-full h-full max-w-[110px] max-h-[35px]'>
        <div className='font-semibold text-sm leading-4'>View</div>
      </button>
    </div>
  );
}
