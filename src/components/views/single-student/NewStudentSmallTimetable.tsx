import Image from 'next/image';

export default function NewStudentSmallTimetable() {
  return (
    <div>
      <div className='flex justify-end'>
        <div className='p-2 border border-[#EE9D50] rounded-sm bg-[#FFF6E7]'>
          23 May, 2023
        </div>
      </div>
      <div>
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
    <div className='rounded-t-lg p-5 bg-[#FFFCF8] border-b-2 flex'>
      <div className='text-bold text-xl flex-1'>
        <div>{title}</div>
        <div className='text-[#808080]'>{subtitle}</div>
      </div>
      <div>
        <Image src={img} alt={img} height={60} width={60} />
      </div>
    </div>
  );
}
