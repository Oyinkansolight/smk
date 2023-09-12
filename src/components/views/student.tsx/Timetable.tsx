/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import EmptyView from '@/components/misc/EmptyView';
import { getFromLocalStorage, getFromSessionStorage } from '@/lib/helper';
import { useGetAcademicTimetable } from '@/server/Schedule';

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

const AcadamicCalendar = ({
  isClassTimeTable = true,
}: {
  isClassTimeTable: boolean;
}) => {
  const currentSessionId = getFromLocalStorage('currentSessionId');
  const currentTerm = getFromSessionStorage('currentTerm');
  let currentTermInfo;
  if (currentTerm) {
    currentTermInfo = JSON.parse(currentTerm);
  }
  const { data, isLoading } = useGetAcademicTimetable({
    sessionId: currentSessionId,
    classId: 'c0c590b0-5dc0-446c-a93c-42fe95602faa',
    termId: currentTermInfo?.id ?? "",
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
  return (
    <section>
      <div className='mt-8 p-2 rounded-md'>
        {!isLoading ? (
          <div>
            <div>
              {(timetableData ?? []).map((item: any, id: number) => (
                <div key={item?.id ?? id}>
                  {item.type === 'event' ? (
                    <div className='flex w-full mt-2 items-center'>
                      <div className='w-[150px] bg-white font-medium text-[10px] px-3 py-5  border'>
                        {item.startTime} - {item.endTime}
                      </div>
                      <div className='w-full border p-5 text-center'>
                        <p> {item.eventName} </p>
                      </div>
                    </div>
                  ) : (
                    <div className='flex w-full mt-2 items-center'>
                      <div className='w-[150px] bg-white font-medium px-3 py-5  border'>
                        {item.startTime} - {item.endTime}
                      </div>

                      <div className='w-full grid grid-cols-5 text-gray-200  border font-medium text-center'>
                        <div
                          className={`${getEachDaySubject(item, 'monday').isEvent
                            ? 'bg-white text-black'
                            : 'bg-[#FFF2F0] text-[#FB6340]'
                            }  px-3 py-5 `}
                        >
                          {getEachDaySubject(item, 'monday').subjectName}
                        </div>
                        <div
                          className={`${getEachDaySubject(item, 'tuesday').isEvent
                            ? 'bg-white text-black'
                            : 'bg-[#FDE8FF] text-[#ED1CFF]'
                            }  px-3 py-5 `}
                        >
                          {getEachDaySubject(item, 'tuesday').subjectName}
                        </div>
                        <div
                          className={`${getEachDaySubject(item, 'wednesday').isEvent
                            ? 'bg-white text-black'
                            : 'bg-[#FFF3E2] text-[#FF9F1C]'
                            }  px-3 py-5 `}
                        >
                          {getEachDaySubject(item, 'wednesday').subjectName}
                        </div>
                        <div
                          className={`${getEachDaySubject(item, 'thursday').isEvent
                            ? 'bg-white text-black'
                            : 'bg-[#F4FFE6] text-[#60AC00]'
                            }  px-3 py-5 `}
                        >
                          {getEachDaySubject(item, 'thursday').subjectName}
                        </div>
                        <div
                          className={`${getEachDaySubject(item, 'friday').isEvent
                            ? 'bg-white text-black'
                            : 'bg-[#FFFFEB] text-[#CDCD04]'
                            }  px-3 py-5 `}
                        >
                          {getEachDaySubject(item, 'friday').subjectName}
                        </div>
                      </div>
                    </div>
                  )}

                  {timetableData.length === 0 && (
                    // <EmptyView label='No Timetable for this class yet' />
                    <div className='text-center text-xs mt-5'>
                      No Timetable for this class yet
                    </div>
                  )}
                </div>
              ))}
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
