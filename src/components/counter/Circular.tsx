import React from 'react';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';

import clsxm from '@/lib/clsxm';

interface CircularCounterProps {
  total?: number;
}

const CircularCounter = ({ total = 0 }: CircularCounterProps) => {
  return (
    <div>
      <CircularProgressbarWithChildren
        counterClockwise
        strokeWidth={2}
        value={total || 0}
        styles={buildStyles({
          pathColor: `rgba(34, 234, 126, ${total / 100})`,
          trailColor: 'rgba(0, 0, 0, 0.1)',
        })}
        className='h-full max-h-[95px] w-full max-w-[95px]'
      >
        <div className={clsxm('text-[32px] font-semibold')}>{total}%</div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default CircularCounter;
