/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyView from '@/components/misc/EmptyView';
import {
  timeConverter,
} from '@/lib/helper';

export default function TimetableView({ data, isLoading }) {
  const days = ['M', 'T', 'W', 'T', 'F'];
  const subjects = [
    {
      name: 'Mathematics',
      textColor: 'text-white',
      subjectColor: 'bg-[#6A2B56]',
      time: '9:00 am - 10:00 am',
    },
    {
      name: 'English',
      subjectColor: 'bg-[#FFF7D6]',
      textColor: 'text-black',
      time: '9:00 am - 10:00 am',
    },
    {
      name: 'Science',
      textColor: 'text-black',
      subjectColor: 'bg-[#FFEFEA]',
      time: '9:00 am - 10:00 am',
    },
    undefined,
  ];
  function getEachDaySubject(data: any, day: string) {
    let subjectName;
    let isEvent;

    data && data?.periods && data?.periods?.forEach((element: any) => {
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
    // <div className='flex bg-blue-500 rounded-2xl'>
    //   <div className='grid-cols-1 px-8 grid gap-2'>
    //     <div className='h-20' />
    //     {Array(8)
    //       .fill(0)
    //       .map((v, i) => (
    //         <div
    //           key={i}
    //           className='flex font-bold text-white items-center justify-center h-36 w-full'
    //         >
    //           <div>9:00 AM</div>
    //         </div>
    //       ))}
    //   </div>
    //   <div className='flex-1 bg-white rounded-2xl px-6'>
    //     <div className='flex flex-col items-center'>
    //       <div className='h-12' />
    //       <div className='grid grid-cols-5 gap-2'>
    //         {days.map((d, i) => (
    //           <div
    //             key={i}
    //             className='flex items-center justify-center w-full max-w-[144px] h-full font-bold text-lg'
    //           >
    //             <div>{d}</div>
    //           </div>
    //         ))}
    //       </div>
    //       <div className='h-1 w-full bg-[#E7E7E5] my-6' />
    //       <div className='grid grid-cols-5 gap-2'>
    //         <div className='col-span-5 h-32 rounded-md border p-3'>
    //           <div className='h-full w-full text-4xl flex font-bold items-center justify-center bg-[#C0EAD3]'>
    //             <div>Assembly</div>
    //           </div>
    //         </div>
    //         {Array(15)
    //           .fill(0)
    //           .map((v, i) => (
    //             <TimetableListItem
    //               key={i}
    //               subject={
    //                 subjects[Math.floor(Math.random() * subjects.length - 1)]
    //               }
    //             />
    //           ))}
    //         <div className='col-span-5 h-32 rounded-md border p-3'>
    //           <div className='h-full w-full flex text-4xl font-bold items-center justify-center bg-[#C0D1EA]'>
    //             <div>Break</div>
    //           </div>
    //         </div>
    //         {Array(15)
    //           .fill(0)
    //           .map((v, i) => (
    //             <TimetableListItem
    //               key={i}
    //               subject={
    //                 subjects[Math.floor(Math.random() * subjects.length - 1)]
    //               }
    //             />
    //           ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <section>
      <div className='mt-8 p-2 rounded-md'>
        <div className='flex w-full'>
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
              {(data ?? []).map((item: any, id: number) => (
                <div key={item?.id ?? id}>
                  {item.type === 'event' ? (
                    <div className='flex w-full  items-center'>
                      <div className='w-[150px] bg-white font-medium text-[10px] px-3 py-5  border'>
                        {timeConverter(item.startTime)} -
                        {timeConverter(item.endTime)}
                      </div>
                      <div className='w-full border p-5 text-center'>
                        <p> {item.eventName} </p>
                      </div>
                    </div>
                  ) : (
                    <div className='flex w-full  items-center'>
                      <div className='w-[150px] bg-white font-medium px-3 py-5  border'>
                        {timeConverter(item.startTime)} -
                        {timeConverter(item.endTime)}
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

                  {(data ?? []).length === 0 && (
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
        {!isLoading && (data ?? []).length === 0 && (
          <EmptyView
            label='No Timetable for this class yet'
            useStandardHeight
          />
          // <div className='text-center text-xs mt-5'>
          //   No Timetable for this class yet
          // </div>
        )}
      </div>
    </section>
  );
}
