import React from 'react';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';

import clsxm from '@/lib/clsxm';

interface CircularCounterProps {
  total?: number;
  variant?: 'primary' | 'secondary';
}

const CircularCounter = ({
  total = 0,
  variant = 'primary',
}: CircularCounterProps) => {
  return (
    <div>
      <CircularProgressbarWithChildren
        counterClockwise
        strokeWidth={2}
        value={total || 0}
        styles={buildStyles({
          pathColor:
            variant === 'primary'
              ? `rgb(34, 234, 126, ${total / 100})`
              : `rgb(51, 97, 255, ${total / 100})`,
          trailColor: 'rgba(0, 0, 0, 0.1)',
        })}
        className='h-full max-h-[95px] w-full max-w-[95px]'
      >
        <div className={clsxm('text-[30px] font-semibold')}>{total}%</div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default CircularCounter;
