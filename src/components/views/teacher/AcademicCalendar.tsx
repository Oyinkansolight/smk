import NextImage from '@/components/NextImage';
import { getFromLocalStorage, getFromSessionStorage } from '@/lib/helper';
import { useGetAcademicEvent } from '@/server/Schedule';
import { AcademicCalendarType } from '@/types/institute';
import moment from 'moment';

type EventType = 'break' | 'holiday' | 'school';

interface AcademicCalendarProps {
  sessionCalendarData: AcademicCalendarType[];
}

export default function AcademicCalendar({
  sessionCalendarData,
}: AcademicCalendarProps) {
  const { data, isLoading } = useGetAcademicEvent();

  const currentSessionId: string =
    getFromLocalStorage('currentSessionId') ?? '';
  const institutionInfo = getFromSessionStorage('institution') ?? '';
  const events: { allEvents: string[]; type: EventType }[] = [
    { allEvents: ['Id El Maulad', 'Workers Day'], type: 'holiday' },
    { allEvents: ['Resumption'], type: 'school' },
    { allEvents: ['Independence Day'], type: 'holiday' },
    { allEvents: ['First Test'], type: 'school' },
    { allEvents: ['Break'], type: 'break' },
    { allEvents: [], type: 'break' },
    { allEvents: [], type: 'break' },
    { allEvents: [], type: 'break' },
  ];
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const getColors = (e: EventType) => {
    switch (e) {
      case 'break':
        return { backgroundColor: 'bg-[#E5A500]', textColor: 'text-white' };
      case 'holiday':
        return { backgroundColor: 'bg-[#1A8FE3]', textColor: 'text-white' };
      case 'school':
        return { backgroundColor: 'bg-[#6A2B56]', textColor: 'text-white' };
      default:
        return { backgroundColor: 'bg-[#6A2B56]', textColor: 'text-white' };
    }
  };

  const allDays = Array(31).fill('No Event');

  // console.log(sessionCalendarData);

  for (let index = 0; index < sessionCalendarData.length; index++) {
    const element = sessionCalendarData[index];
    const getDay = Number(moment(element.startDate).format('DD'));

    allDays[getDay - 1] = element.title;
  }
  const filteredEvents = (data?.data ?? []).filter(
    (item: any) =>
      item?.session?.id === currentSessionId &&
      item.institutionType.includes(
        JSON.parse(institutionInfo).instituteType
      ) &&
      item.type === 'CALENDAR'
  );

  return (
    <div className='w-full rounded-xl bg-white flex flex-col px-4'>
      {/* <div className='flex justify-between px-8'>
        <div className='flex items-center font-bold my-5 gap-3'>
          <div>Academic Calendar 2022/2023 </div>
          <IoChevronDown className='text-blue-500 h-5 w-5' />
        </div>
        <div className='flex items-center font-bold my-5 gap-3'>
          <IoChevronBack className='text-blue-500 h-5 w-5' /> <div>July</div>
          <IoChevronForward className='text-blue-500 h-5 w-5' />
        </div>
      </div>
      <div className='grid grid-cols-7 py-3 border-t-2 border-b-2 text-lg border-[#EFF7F6] my-4 gap-x-4'>
        {days.map((d, i) => (
          <div key={i} className='w-full text-center'>
            {d}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7 gap-y-6 gap-x-4'>
        <div />
        {allDays.map((data, i) => {
          const e = events[Math.floor(Math.random() * events.length)];
          const c = getColors(e.type);

          return (
            <AcademicCalendarListItem
              key={i}
              event={{
                allEvents: [data ?? ''],
                day: `${i + 1}`,
                backgroundColor:
                  data === 'No Event' ? 'bg-red-200' : c.backgroundColor,
                textColor: c.textColor,
              }}
            />
          );
        })}
      </div> */}

      <div className='bg-white rounded-md px-6 py-10'>
        <div className='bg-[#ECF4FF] rounded-lg pr-10 pl-5 py-8'>
          <div className='flex justify-between items-center text-[10px]'>
            <div className='font-semibold text-[#5A5A5A] text-xs'>
              Schools - Academic Calendar
            </div>

            {/* <p className='font-bold'>
            <span className='font-normal'>Start Date:</span> 23, September,
            2022
          </p>
          <p className='font-bold'>
            <span className='font-normal'>End Date:</span> 23, December, 2022
          </p> */}
            <div>
              <NextImage
                src='/svg/calendar_mini.svg'
                width={52}
                height={99}
                alt='calendar_mini'
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className='text-center my-4'>Loading...</div>
        ) : (
          filteredEvents.map((item: any, idx: number) => (
            <div
              key={item.id}
              className='bg-white border rounded-lg px-4 py-2 mt-4'
            >
              <div className='text-[#6B7A99] grid grid-cols-12 items-center text-[10px]'>
                <div className='font-semibold  text-xs col-span-4'>
                  {item.title}
                </div>

                <div className='col-span-6 flex space-x-4 items-center'>
                  <p className='font-bold'>
                    <span className='font-normal'>Start Date:</span>{' '}
                    {moment(item.startDate).format('ll')}
                  </p>
                  <p className='font-bold'>
                    <span className='font-normal'>End Date:</span>{' '}
                    {moment(item.endDate).format('ll')}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
