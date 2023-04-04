import moment from 'moment';
import { useState } from 'react';

import clsxm from '@/lib/clsxm';

import { CircularCounter } from '@/components/counter';
import CircularCheckbox from '@/components/input/CircularCheckbox';

export enum ClassState {
  active = 0,
  upcoming = 1,
}

export interface ClassScheduleViewProps {
  start: Date;
  end: Date;
  classState: ClassState;
  teacherName: string;
  progress: number;
  name: string;
}

export default function ClassScheduleView({
  start,
  end,
  classState,
  teacherName,
  progress,
  name,
}: ClassScheduleViewProps) {
  const [lessonNote, setLessonNote] = useState(false);
  const [assignment, setAssignment] = useState(true);
  return (
    <div className='relative text-sm font-medium'>
      <div
        className={clsxm(
          'absolute -top-2 left-3 rounded-md bg-[#42BBFF] py-1 px-4 text-white',
          classState === 1 && 'bg-[#FFF4C9] text-[#E5A500]'
        )}
      >
        {moment(start).format('hh:mm a')} - {moment(end).format('hh:mm a')}
      </div>
      <div
        className={clsxm(
          ' flex items-center justify-between rounded-lg bg-[#F4F9FF] p-6 ',
          classState === 1 && 'bg-[#FFF4C9] opacity-30'
        )}
      >
        <div className='flex flex-col gap-4'>
          <div className='text-2xl font-bold'>{name}</div>
          <div>
            <span className='font-normal'>Teacher:</span> {teacherName}
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-1'>
              <CircularCheckbox
                checked={lessonNote}
                onClick={() => setLessonNote(!lessonNote)}
              />
              <div>Lesson Note</div>
            </div>
            <div className='flex items-center gap-1'>
              <CircularCheckbox
                checked={assignment}
                onClick={() => setAssignment(!assignment)}
              />
              <div>Assignment</div>
            </div>
          </div>
        </div>
        <div>
          <div className=''>Progress:</div>
          <div className='h-2' />
          <CircularCounter total={progress} variant='secondary' size='sm' />
        </div>
        <div>
          <div
            className={clsxm(
              'rounded-xl bg-[#42BBFF] px-6 py-2 text-white',
              classState === 1 &&
                'border border-[#E5A500] bg-[#fff1b7]  text-[#E5A500]'
            )}
          >
            {classState === 0 ? 'Active' : 'Upcoming'}
          </div>
        </div>
      </div>
    </div>
  );
}
