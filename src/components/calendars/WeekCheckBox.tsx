'use-client';
import moment from 'moment';
import Image from 'next/image';

import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

const weeks = ['M', 'T', 'W', 'T', 'F'];

export default function WeekCheckBox({
  date,
  weekValues = [false, true, null, null, null],
}: {
  date: Date;
  weekValues?: (boolean | null)[];
}) {
  logger(moment().date());
  logger(moment(date).date());
  return (
    <div className='flex flex-col items-center justify-center gap-4 rounded-md bg-[#E6EFFF] p-4'>
      <div className='rounded-full bg-[#FFEB9A] py-1 px-4'>
        {moment(date).format('hh:mm:ss a')}
      </div>
      <div className='rounded-full bg-[#F4F1E7] py-1 px-4'>
        {moment(date).format('Do MMMM, YYYY')}
      </div>
      <div className='flex justify-between gap-4'>
        {weeks.map((week, i) => (
          <div
            key={i}
            className={clsxm(
              'flex  flex-col items-center rounded-md p-2 text-base font-bold text-[#450065]',
              i + 3 === moment(date).date() && 'border border-[#008146]'
            )}
          >
            {i + 3 >= moment(date).date() ? (
              <div className='aspect-square h-[20px] rounded-full border border-[#008146] bg-white' />
            ) : (
              <Image
                width={20}
                height={20}
                src={
                  weekValues[i]
                    ? '/svg/circle_check.svg'
                    : '/svg/circle_cancel.svg'
                }
                alt={weekValues[i] ? 'circle_check' : 'circle_cancel'}
              />
            )}
            <div>{week}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
