import moment from 'moment';

import clsxm from '@/lib/clsxm';

export default function BreakTimeView({
  start,
  end,
}: {
  start: Date;
  end: Date;
}) {
  return (
    <div className='flex w-full justify-center'>
      <div className='flex w-full max-w-md flex-col items-center text-sm font-medium'>
        <div
          className={clsxm(
            'translate-y-3 rounded-xl bg-[#42BBFF] py-1 px-4 text-white'
          )}
        >
          {moment(start).format('hh:mm a')} - {moment(end).format('hh:mm a')}
        </div>
        <div className='w-full rounded-full bg-[#E9D8FF] p-3 text-center  text-[#9013FE]'>
          Break Time
        </div>
      </div>
    </div>
  );
}
