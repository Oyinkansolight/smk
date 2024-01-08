import { useGlobalContext } from '@/hooks/useGlobalState';
import clsxm from '@/lib/clsxm';
import { getFromLocalStorage, getFromSessionStorage } from '@/lib/helper';
import logger from '@/lib/logger';
import { calculateEarthDistanceTwo } from '@/misc/functions/calculateEarthDistance';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import { useGetClockInfo } from '@/server/institution/clock-in-clock-out';
import { useClockIn, useSubmitStaffCoordinates } from '@/server/teacher';
import moment, { Duration } from 'moment';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGeoLocation } from 'use-geo-location';

const savedInstitutionData = getFromSessionStorage('institution');

export default function ClockInTime() {
  const clockIn = useClockIn();
  const submitCoordinates = useSubmitStaffCoordinates();
  // const clockOut = useClockOut();
  const { data: clockInfo } = useGetClockInfo();
  const { data: profile } = useGetProfile();
  const [inArea, setInArea] = useState(false);
  const [distance, setDistance] = useState('Calculating...');
  const [isLoading, setIsLoading] = useState(false);
  const [isClockingIn, setIsClockingIn] = useState(false);
  const [clockedInTime, setClockedInTime] = useState<Duration | undefined>();
  const { institutionData } = useGlobalContext();
  const sessionId: string = getFromLocalStorage('currentSessionId') ?? '';
  const term: any = getFromSessionStorage('currentTerm');

  const { latitude, longitude, loading, error } = useGeoLocation();
  let institute;

  if (savedInstitutionData) {
    institute = JSON.parse(savedInstitutionData);
  }

  const lat = institutionData?.instituteLat ?? 6.5994752;
  const long = institutionData?.instituteLong ?? 3.3488896;



  const handleClockIn = async () => {
    setIsClockingIn(true);
    try {
      const res = await clockIn.mutateAsync({
        sessionId,
        termId: JSON.parse(term)?.id,
      });
      toast.success(res.data.data.message);
      setIsClockingIn(false);
    } catch (error) {
      toast.error(getErrMsg(error));
      setIsClockingIn(false);
    }
  };

  // const handleClockOut = async () => {
  //   try {
  //     const res = await clockOut.mutateAsync({
  //       clockOutTime: `${new Date().toISOString()}`,
  //     });
  //     toast.success(res.data.data.message);
  //   } catch (error) {
  //     toast.error(getErrMsg(error));
  //   }
  // };

  useEffect(() => {
    setIsLoading(loading);
    logger({ latitude, longitude, loading, error });
    console.log(latitude, longitude);
    console.log(lat, long);

    if (latitude && longitude) {
      //conver lat and long to number before usage
      const d = calculateEarthDistanceTwo(latitude, +lat, longitude, +long);
      logger(d.toFixed(2));
      setDistance(d.toFixed(2));
      if (d < 200) {
        setInArea(true);
        setIsLoading(false);
      } else {
        //* This is done to track the coordinates of teachers that can't clock in due to distance
        if (!clockInfo?.isClockedIn && profile?.userInfo?.staff?.id) {
          submitCoordinates.mutateAsync({
            latitude: String(latitude),
            longitude: String(longitude),
            staff: profile?.userInfo?.staff?.id,
            address: `Distance from school: ${d.toFixed(2)} Km`,
          });
        }
      }
    }
  }, [
    latitude,
    longitude,
    loading,
    error,
    lat,
    long,
    clockInfo?.isClockedIn,
    profile?.userInfo?.staff?.id,
  ]);

  useEffect(() => {
    setTimeout(() => {
      if (clockInfo?.isClockedIn && clockInfo?.clockInTime) {
        const duration = moment
          .duration(moment().diff(moment(clockInfo?.clockInTime)))
          .add(1, 'hour');
        setClockedInTime(duration);
      }
    }, 1000);
  }, [clockInfo?.clockInTime, clockInfo?.isClockedIn, clockedInTime]);

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
  ) : clockInfo?.isClockedIn ? (
    <div className='flex items-center'>
      <div className='flex items-center gap-2'>
        <span>Time Online:</span>

        <span className='text-xl text-[#FB6340]'>
          {clockedInTime?.hours().toString().padStart(2, '0')}:
          {clockedInTime?.minutes().toString().padStart(2, '0')}:
          {clockedInTime?.seconds().toString().padStart(2, '0')}
        </span>
      </div>
      {/* <div className='w-4' />
      <button
        onClick={handleClockOut}
        className='h-[40px] w-[120px] rounded-[3.2px] border border-[#007AFF] bg-white py-2 px-5 text-[#007AFF]'
      >
        Stop Clock
      </button> */}
    </div>
  ) : (
    <div className='flex items-center'>
      <div>
        You are <span className='font-bold text-[#008146]'>Within</span> your
        clock area
      </div>
      <div className='w-4' />
      <button
        disabled={isClockingIn}
        onClick={handleClockIn}
        className='rounded-sm bg-[#007AFF] py-2 px-5 text-white'
      >
        {isClockingIn ? 'Loading...' : 'Clock In'}
      </button>
    </div>
  );
}
