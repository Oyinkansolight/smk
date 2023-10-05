/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import EmptyView from '@/components/misc/EmptyView';
import {
  getFromLocalStorage,
  getFromSessionStorage,
  timeConverter,
} from '@/lib/helper';
import { useGetAcademicTimetable } from '@/server/Schedule';
import { useEffect, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const AcadamicCalendar = ({
  isClassTimeTable = true,
  classId,
}: {
  isClassTimeTable: boolean;
  classId?: string;
}) => {
  const currentSessionId = getFromLocalStorage('currentSessionId');
  const currentTerm = getFromSessionStorage('currentTerm');
  const [type, setType] = useState('DEFAULT');
  let currentTermInfo;
  if (currentTerm) {
    currentTermInfo = JSON.parse(currentTerm);
  }
  const { data, isLoading, refetch } = useGetAcademicTimetable({
    sessionId: currentSessionId,
    classId: classId ?? '',
    termId: currentTermInfo?.id ?? '',
    type: type,
  });
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

  const timetableData = isClassTimeTable ? data : [];

  useEffect(() => {
    // Make the second query only when the first query data is available
    refetch();
  }, [refetch, type]);

  return (
    <section>
      <div className='mt-8 p-2 rounded-md'>
        <div className='flex justify-between items-center'>
          <h1 className='text-base text-[#6B7A99]'> TimeTable</h1>
          <select
            name=''
            id=''
            className='border p-2 w-[150px] rounded text-xs'
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value='DEFAULT'>Class Timetable</option>
            <option value='TEST'>Test Timetable</option>
            <option value='EXAM'>Exam Timetable</option>
          </select>
        </div>

        {!isLoading ? (
          <div>
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
              </div>
              {!isLoading ? (
                <div>
                  <div>
                    {((isClassTimeTable ? timetableData : []) ?? []).map(
                      (item: any, id: number) => (
                        <div key={id}>
                          {item.type === 'event' ? (
                            <div className='flex w-full mt-2 items-center'>
                              <div className='w-[150px] bg-white font-medium text-[10px] pl-3 py-5  border'>
                                {timeConverter(item.startTime)} -
                                {timeConverter(item.endTime)}
                              </div>
                              <div className='w-full border p-5 text-center'>
                                <p> {item.eventName} </p>
                              </div>
                            </div>
                          ) : (
                            <div className='flex w-full mt-2 items-center'>
                              <div className='w-[150px] bg-white  font-medium pl-3 py-5  border'>
                                {timeConverter(item.startTime)} -
                                {timeConverter(item.endTime)}
                              </div>

                              <div className='w-full grid grid-cols-5 text-gray-200  border font-medium text-center'>
                                <div
                                  className={`${
                                    getEachDaySubject(item, 'monday').isEvent
                                      ? 'bg-white text-black'
                                      : 'bg-[#FFF2F0] text-[#FB6340]'
                                  }  px-3 py-5 truncate `}
                                >
                                  {
                                    getEachDaySubject(item, 'monday')
                                      .subjectName
                                  }
                                </div>
                                <div
                                  className={`${
                                    getEachDaySubject(item, 'tuesday').isEvent
                                      ? 'bg-white text-black'
                                      : 'bg-[#FDE8FF] text-[#ED1CFF]'
                                  }  px-3 py-5 truncate `}
                                >
                                  {
                                    getEachDaySubject(item, 'tuesday')
                                      .subjectName
                                  }
                                </div>
                                <div
                                  className={`${
                                    getEachDaySubject(item, 'wednesday').isEvent
                                      ? 'bg-white text-black'
                                      : 'bg-[#FFF3E2] text-[#FF9F1C]'
                                  }  px-3 py-5 truncate `}
                                >
                                  {
                                    getEachDaySubject(item, 'wednesday')
                                      .subjectName
                                  }
                                </div>
                                <div
                                  className={`${
                                    getEachDaySubject(item, 'thursday').isEvent
                                      ? 'bg-white text-black'
                                      : 'bg-[#F4FFE6] text-[#60AC00]'
                                  }  px-3 py-5 truncate `}
                                >
                                  {
                                    getEachDaySubject(item, 'thursday')
                                      .subjectName
                                  }
                                </div>
                                <div
                                  className={`${
                                    getEachDaySubject(item, 'friday').isEvent
                                      ? 'bg-white text-black'
                                      : 'bg-[#FFFFEB] text-[#CDCD04]'
                                  }  px-3 py-5 truncate`}
                                >
                                  {
                                    getEachDaySubject(item, 'friday')
                                      .subjectName
                                  }
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div className='text-center text-xs mt-5'>Loading...</div>
              )}
            </div>
          </div>
        ) : (
          <div className='text-center text-xs mt-5'>Loading...</div>
        )}
        {!isLoading && timetableData.length === 0 && (
          <EmptyView label='No Timetable for this class yet' />
          // <div className='text-center text-xs mt-5'>
          //   No Timetable for this class yet
          // </div>
        )}
      </div>
    </section>
  );
};

export default AcadamicCalendar;
