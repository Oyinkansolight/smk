import React from 'react';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';

import clsxm from '@/lib/clsxm';

interface CircularCounterProps {
  total?: number;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
}

const CircularCounter = ({
  total = 0,
  variant = 'primary',
  size = 'md',
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
        className={clsxm(
          'h-full  w-full ',
          size === 'sm'
            ? 'max-h-[60px] max-w-[60px]'
            : 'max-h-[95px] max-w-[95px]'
        )}
      >
        <div
          className={clsxm(
            'font-bold',
            size === 'sm' ? 'mt-1 text-[23px]' : 'text-[30px]'
          )}
        >
          {total}%
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default CircularCounter;
