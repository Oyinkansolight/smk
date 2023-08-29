/* eslint-disable @typescript-eslint/no-explicit-any */
import clsxm from '@/lib/clsxm';
import Image from 'next/image';
import { RotatingLines } from 'react-loader-spinner';

export default function NewStudentSmallTimetable({ loading, todaysPeriod }) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='w-full max-w-[296px]'>
      <div className='flex justify-end'>
        <div className='flex justify-center items-center p-2 border border-[#EE9D50] rounded-sm bg-[#FFF6E7] w-max px-2 h-[30px] whitespace-nowrap'>
          {formattedDate}
        </div>
      </div>
      <div className='h-4' />
      <div className='flex gap-4 flex-col'>
        {!loading ? (
          <div>
            {' '}
            {todaysPeriod.map((v: any, i: number) => (
              <TimetableItem
                key={i}
                isCurrent={i === 0}
                img='/images/sidebar-icons/Subjects.png'
                subtitle={`${v.startTime} - ${v.endTime}`}
                title={v.title}
              />
            ))}
          </div>
        ) : (
          <div className='flex justify-center'>
            <RotatingLines
              width='100'
              visible={true}
              strokeWidth='5'
              strokeColor='#3361FF'
              animationDuration='0.75'
            />
          </div>
        )}
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
        'rounded-t-lg p-5 relative bg-[#FFFCF8] border-b-2 flex w-full',
        isCurrent && 'border border-blue-500 bg-[#EFF2F7] shadow-xl'
      )}
    >
      {isCurrent && (
        <div className='flex items-center justify-center py-1 px-3 rounded text-[7px] font-semibold whitespace-nowrap text-white bg-[#3361FF] absolute -top-2 -left-[1px] max-w-[59px] h-5'>
          Current Period
        </div>
      )}
      <div className='flex-1'>
        <div
          className={clsxm(
            isCurrent && 'text-lg',
            'text-[#160537] font-semibold text-sm'
          )}
        >
          {title}
        </div>
        <div className='text-[#808080]'>{subtitle}</div>
      </div>
      <div>
        <Image src={img} alt={img} height={40} width={40} />
      </div>
    </div>
  );
}
