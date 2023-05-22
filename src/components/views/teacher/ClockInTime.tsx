import clsxm from '@/lib/clsxm';
import { getFromLocalStorage } from '@/lib/helper';
import logger from '@/lib/logger';
import calculateEarthDistance from '@/misc/functions/calculateEarthDistance';
import { useClockIn, useClockOut } from '@/server/teacher';
import { useEffect, useState } from 'react';
import { useGeoLocation } from 'use-geo-location';

export default function ClockInTime() {
  const clockIn = useClockIn();
  const clockOut = useClockOut();
  const [inArea, setInArea] = useState(false);
  const [distance, setDistance] = useState('Calculating...');
  const [isLoading, setIsLoading] = useState(false);
  const [clockedIn, setClockedIn] = useState(false);
  const [clockedInTime, setClockedInTime] = useState(0);
  const { latitude, longitude, loading, error } = useGeoLocation();
  const institutionData = getFromLocalStorage('institution');
  let institute;

  if (institutionData) {
    institute = JSON.parse(institutionData);
  }

  const lat = institute?.instituteLat ?? '6.5994752';
  const long = institute?.instituteLong ?? '3.3488896';

  const handleClockIn = async () => {
    const res = await clockIn.mutateAsync({
      clockInTime: `${Date()}`,
      teacherId: 1
    });
    console.log(res);

    // setClockedIn(true)
  }

  const handleClockOut = async () => {
    const res = await clockOut.mutateAsync({
      clockOutTime: `${Date()}`,
      teacherId: 1
    });
    console.log(res);
    // setClockedIn(false);
  }

  useEffect(() => {
    setIsLoading(loading);
    logger({ latitude, longitude, loading, error });
    if (latitude && longitude) {
      const d = calculateEarthDistance(latitude, longitude, lat, long);
      setDistance(d.toFixed(2));
      if (d < 100) {
        setInArea(true);
        setIsLoading(false);
      }
    }
  }, [latitude, longitude, loading, error, lat, long]);

  useEffect(() => {
    setTimeout(() => {
      if (clockedIn) setClockedInTime(clockedInTime + 1);
    }, 1000);
  }, [clockedIn, clockedInTime]);

  return !inArea ? (
    <div className='flex items-center'>
      {latitude && longitude ? (
        <div>
          You are{' '}
          <span className='font-bold text-[#FB6340]'>
            {isLoading ? 'Calculating' : distance} Km
          </span>{' '}
          away from your clock area
        </div>
      ) : (
        <div>
          You are <span className='font-bold text-[#FB6340]'>?? Km</span> away
          from your clock area
        </div>
      )}
      <div className='w-4' />
      <button
        disabled
        className={clsxm('rounded-sm bg-blue-200 py-2 px-5 text-white')}
      >
        Clock In
      </button>
    </div>
  ) : clockedIn ? (
    <div className='flex items-center'>
      <div>
        Time Online:{' '}
        <span className='text-xl text-[#FB6340]'>
          {(Math.floor(clockedInTime / (60 * 60)) % 60)
            .toString()
            .padStart(2, '0')}
          :{(Math.floor(clockedInTime / 60) % 60).toString().padStart(2, '0')}:
          {(clockedInTime % 60).toString().padStart(2, '0')}
        </span>
      </div>
      <div className='w-4' />
      <button
        onClick={handleClockOut}
        className='h-[40px] w-[120px] rounded-[3.2px] border border-[#007AFF] bg-white py-2 px-5 text-[#007AFF]'
      >
        Stop Clock
      </button>
    </div>
  ) : (
    <div className='flex items-center'>
      <div>
        You are <span className='font-bold text-[#008146]'>Within</span> your
        clock area
      </div>
      <div className='w-4' />
      <button
        onClick={handleClockIn}
        className='rounded-sm bg-[#007AFF] py-2 px-5 text-white'
      >
        Clock In
      </button>
    </div>
  );
}
