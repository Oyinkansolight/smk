import { useEffect, useState } from 'react';

export default function CountDown() {
  const [clockedInTime, setClockedInTime] = useState(1000);

  useEffect(() => {
    setTimeout(() => {
      setClockedInTime(clockedInTime - 1);
    }, 1000);
  }, [clockedInTime]);

  return (
    <span className='text-xl text-[#FB6340]'>
      {(Math.floor(clockedInTime / (60 * 60)) % 60).toString().padStart(2, '0')}
      :{(Math.floor(clockedInTime / 60) % 60).toString().padStart(2, '0')}:
      {(clockedInTime % 60).toString().padStart(2, '0')}
    </span>
  );
}
