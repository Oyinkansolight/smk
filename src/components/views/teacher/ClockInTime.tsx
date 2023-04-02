import { useEffect, useState } from 'react';

import clsxm from '@/lib/clsxm';

enum ClockInState {
  tooFar = 0,
  clockedIn = 1,
  notClocked = 2,
}

export default function ClockInTime() {
  const [clockState, setClockState] = useState<ClockInState>(0);
  const distance = 2;
  useEffect(() => {
    const timeout = setTimeout(() => {
      setClockState((clockState + 1) % 3);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [clockState]);

  return clockState === ClockInState.clockedIn ? (
    <div className='flex items-center'>
      <div>
        Time Online: <span className='text-xl text-[#FB6340]'>00:20:05</span>
      </div>
      <div className='w-4' />
      <button className='h-[40px] w-[120px] rounded-[3.2px] border border-[#007AFF] bg-white py-2 px-5 text-[#007AFF]'>
        Stop Clock
      </button>
    </div>
  ) : clockState === ClockInState.notClocked ? (
    <div className='flex items-center'>
      <div>
        You are <span className='font-bold text-[#008146]'>Within</span> your
        clock area
      </div>
      <div className='w-4' />
      <button className='rounded-sm bg-[#007AFF] py-2 px-5 text-white'>
        Clock In
      </button>
    </div>
  ) : (
    <div className='flex items-center'>
      <div>
        You are <span className='font-bold text-[#FB6340]'>{distance} Km</span>{' '}
        away from your clock area
      </div>
      <div className='w-4' />
      <button
        disabled
        className={clsxm('rounded-sm bg-blue-200 py-2 px-5 text-white')}
      >
        Clock In
      </button>
    </div>
  );
}
