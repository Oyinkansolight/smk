/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import AddActivityName from '@/components/modal/TestSchedule';
import { getErrMsg } from '@/server';
import {
  useCreateAcademicTimeTable,
  useGetAcademicTimetable,
} from '@/server/Schedule';
import { useState } from 'react';
import { toast } from 'react-toastify';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

interface dataType {
  sessionId: number;
  institutionType: string | null;
  timeTableType: string;
  classId: number;
  term: number;
  type: string | number;
  periods?: any[];
  startTime: string | number;
  endTime: string | number;
  eventName?: string | number;
}
const TimeTable = ({
  sessionId,
  classId,
  termId,
  schoolType,
  isClassTimeTable = true,
  examSchedule,
  timeTableType = 'DEFAULT',
}: {
  sessionId: any;
  classId: number;
  termId: number;
  examSchedule?: any;
  isClassTimeTable?: boolean;
  schoolType: string | null;
  timeTableType?: string;
}) => {
  const { data, isLoading } = useGetAcademicTimetable({
    sessionId,
    classId,
    termId,
  });

  const handleCreateAcademicTimeTable = useCreateAcademicTimeTable();

  const [isOpenActivity, setisOpenActivity] = useState(false);
  const [startTime, setstartDate] = useState<string | number>('');
  const [endTime, setendDate] = useState<string | number>('');
  const [subjectId1, setSubjectId1] = useState<string | number>('');
  const [subjectId2, setSubjectId2] = useState<string | number>('');
  const [subjectId3, setSubjectId3] = useState<string | number>('');
  const [subjectId4, setSubjectId4] = useState<string | number>('');
  const [subjectId5, setSubjectId5] = useState<string | number>('');
  const [activityname1, setactivityname1] = useState<string | number>('');
  const [activityname2, setactivityname2] = useState<string | number>('');
  const [activityname3, setactivityname3] = useState<string | number>('');
  const [activityname4, setactivityname4] = useState<string | number>('');
  const [activityname5, setactivityname5] = useState<string | number>('');
  const [eventName, seteventname] = useState<string | number>('');
  const [loading, setloading] = useState(false);
  const [type, setType] = useState<string | number>('period');
  const [activity1, setactivity1] = useState(false);
  const [activity2, setactivity2] = useState(false);
  const [activity3, setactivity3] = useState(false);
  const [activity4, setactivity4] = useState(false);
  const [activity5, setactivity5] = useState(false);
  const modalActivityHandler = () => {
    setisOpenActivity(!isOpenActivity);
  };

  const generateKey = (decider: boolean) => {
    return decider ? 'eventName' : 'subject';
  };
  const SubmitHandler = async () => {
    const data: dataType = {
      sessionId: sessionId,
      institutionType: schoolType,
      classId,
      term: termId,
      timeTableType: timeTableType,
      type,
      periods: [
        {
          day: 'Monday',
          [generateKey(activity1)]: activity1 ? activityname1 : subjectId1,
          isEvent: activity1,
        },
        {
          day: 'Tuesday',
          [generateKey(activity2)]: activity2 ? activityname2 : subjectId2,
          isEvent: activity2,
        },
        {
          day: 'Wednesday',
          [generateKey(activity3)]: activity3 ? activityname3 : subjectId3,
          isEvent: activity3,
        },
        {
          day: 'Thursday',
          [generateKey(activity4)]: activity4 ? activityname4 : subjectId4,
          isEvent: activity4,
        },
        {
          day: 'Friday',
          [generateKey(activity5)]: activity5 ? activityname5 : subjectId5,
          isEvent: activity5,
        },
      ],
      startTime,
      endTime,
      eventName,
    };

    if (type === 'event') {
      delete data.periods;
    } else {
      delete data.eventName;
    }

    try {
      setloading(true);
      const response = await handleCreateAcademicTimeTable.mutateAsync(data);

      if (response) {
        toast.success('Timetable created successfully');
        // location.reload()
        setloading(false);
        modalActivityHandler();

        //2 Second - Open Success Modal
      }
    } catch (error) {
      setloading(false);
      toast.error(getErrMsg(error));
    }
  };

  function getEachDaySubject(data: any, day: string) {
    let subjectName;
    let isEvent;

    data.periods.forEach((element: any) => {
      if (element.day.toLowerCase() === day) {
        if (element.subject) {
          subjectName = element.subject.name;
          isEvent = false;
        } else {
          subjectName = element.eventName;
          isEvent = true;
        }
      }
    });

    return { subjectName, isEvent };
  }

  return (
    <section>
      {isOpenActivity && (
        <AddActivityName
          onClickHandler={modalActivityHandler}
          setStartDate={setstartDate}
          setEndDate={setendDate}
          setSubjectId1={setSubjectId1}
          setSubjectId2={setSubjectId2}
          setSubjectId3={setSubjectId3}
          setSubjectId4={setSubjectId4}
          setSubjectId5={setSubjectId5}
          seteventname={seteventname}
          setType={setType}
          type={type}
          loading={loading}
          SubmitHandler={SubmitHandler}
          setactivity1={setactivity1}
          activity1={activity1}
          setactivity2={setactivity2}
          activity2={activity2}
          setactivity3={setactivity3}
          activity3={activity3}
          setactivity4={setactivity4}
          activity4={activity4}
          setactivity5={setactivity5}
          activity5={activity5}
          setactivityname1={setactivityname1}
          activityname1={activityname1}
          setactivityname2={setactivityname2}
          activityname2={activityname2}
          setactivityname3={setactivityname3}
          activityname3={activityname3}
          setactivityname4={setactivityname4}
          activityname4={activityname4}
          setactivityname5={setactivityname5}
          activityname5={activityname5}
        />
      )}

      <div className='mt-8 bg-[#F5F5F6] p-2 rounded-md'>
        <div className='flex w-full mr-10 mb-4'>
          <div className='w-[150px] font-medium rounded-l p-3  border bg-white text-gray-500'>
            Date
          </div>
          <div className='w-full grid grid-cols-5 text-gray-200  border font-medium text-center'>
            <div className='p-3 bg-[#FB6340]'>Monday</div>
            <div className='p-3 bg-[#8E059A]'>Tuesday</div>
            <div className='p-3 bg-[#AA5C09]'>Wednesday</div>
            <div className='p-3 bg-[#099F8D]'>Thursday</div>
            <div className='p-3 bg-[#612503]'>Friday</div>
          </div>
          <div className='w-[40px] pl-4 flex flex-col space-y-2 text-[8px] '></div>
        </div>
        {!isLoading ? (
          <div>
            <div>
              {((isClassTimeTable ? data : examSchedule)?.data ?? []).map(
                (item: any, id: number) => (
                  <div key={id}>
                    {item.type === 'event' ? (
                      <div className='flex w-full mt-2 items-center'>
                        <div className='w-[150px] bg-white font-medium text-[10px] px-3 py-5  border'>
                          {item.startTime} - {item.endTime}
                        </div>
                        <button
                          onClick={modalActivityHandler}
                          className='w-full border p-5 text-center'
                        >
                          <p> {item.eventName} </p>
                        </button>
                        <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '>
                          <div className='text-green-600'>Edit</div>
                          <div className='text-red-600'>Delete</div>
                        </div>
                      </div>
                    ) : (
                      <div className='flex w-full mt-2 items-center'>
                        <div className='w-[150px] bg-white font-medium px-3 py-5  border'>
                          {item.startTime} - {item.endTime}
                        </div>

                        <div className='w-full grid grid-cols-5 text-gray-200  border font-medium text-center'>
                          <div
                            className={`${
                              getEachDaySubject(item, 'monday').isEvent
                                ? 'bg-white text-black'
                                : 'bg-[#FFF2F0] text-[#FB6340]'
                            }  px-3 py-5 `}
                          >
                            {getEachDaySubject(item, 'monday').subjectName}
                          </div>
                          <div
                            className={`${
                              getEachDaySubject(item, 'tuesday').isEvent
                                ? 'bg-white text-black'
                                : 'bg-[#FDE8FF] text-[#ED1CFF]'
                            }  px-3 py-5 `}
                          >
                            {getEachDaySubject(item, 'tuesday').subjectName}
                          </div>
                          <div
                            className={`${
                              getEachDaySubject(item, 'wednesday').isEvent
                                ? 'bg-white text-black'
                                : 'bg-[#FFF3E2] text-[#FF9F1C]'
                            }  px-3 py-5 `}
                          >
                            {getEachDaySubject(item, 'wednesday').subjectName}
                          </div>
                          <div
                            className={`${
                              getEachDaySubject(item, 'thursday').isEvent
                                ? 'bg-white text-black'
                                : 'bg-[#F4FFE6] text-[#60AC00]'
                            }  px-3 py-5 `}
                          >
                            {getEachDaySubject(item, 'thursday').subjectName}
                          </div>
                          <div
                            className={`${
                              getEachDaySubject(item, 'friday').isEvent
                                ? 'bg-white text-black'
                                : 'bg-[#FFFFEB] text-[#CDCD04]'
                            }  px-3 py-5 `}
                          >
                            {getEachDaySubject(item, 'friday').subjectName}
                          </div>
                        </div>
                        <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '>
                          <div className='text-green-600'>Edit</div>
                          <div className='text-red-600'>Delete</div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            <div className='flex w-full mt-2 items-center'>
              <div className='w-full py-5 flex justify-end px-4  border text-center'>
                <button
                  onClick={modalActivityHandler}
                  className='w-full text-center'
                >
                  <p>Click to add event or period </p>
                </button>
              </div>
              <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '></div>
            </div>
          </div>
        ) : (
          <div className='text-center text-xs mt-5'>Loading...</div>
        )}
      </div>
    </section>
  );
};

export default TimeTable;
