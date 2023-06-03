import clsxm from '@/lib/clsxm';
import Image from 'next/image';

export default function NewStudentSmallTimetable() {
  return (
    <div>
      <div className='flex justify-end'>
        <div className='p-2 border border-[#EE9D50] rounded-sm bg-[#FFF6E7]'>
          23 May, 2023
        </div>
      </div>
      <div className='h-4' />
      <div className='flex gap-4 flex-col'>
        {Array(3)
          .fill(0)
          .map((v, i) => (
            <TimetableItem
              key={i}
              isCurrent={i === 0}
              img='/images/sidebar-icons/Subjects.png'
              subtitle='09:00 AM - 08:30 am'
              title='English'
            />
          ))}
      </div>
    </div>
  );
}

function TimetableItem({
  isCurrent,
  img,
  title,
  subtitle,
}: {
  isCurrent: boolean;
  title: string;
  subtitle: string;
  img: string;
}) {
  return (
    <div
      className={clsxm(
        'rounded-t-lg p-5 relative bg-[#FFFCF8] border-b-2 flex',
        isCurrent && 'border border-blue-500 bg-[#EFF2F7] shadow-xl'
      )}
    >
      {isCurrent && (
        <div className='py-1 px-3 rounded text-white bg-[#3361FF] absolute -top-2 left-0'>
          Current Period
        </div>
      )}
      <div className='text-bold text-xl flex-1'>
        <div className={clsxm(isCurrent && 'text-xl')}>{title}</div>
        <div className='text-[#808080]'>{subtitle}</div>
      </div>
      <div>
        <Image src={img} alt={img} height={60} width={60} />
      </div>
    </div>
  );
}
