import AcademicCalendarListItem from '@/components/views/teacher/AcademicCalendarListItem';
import {
  IoChevronBack,
  IoChevronDown,
  IoChevronForward,
} from 'react-icons/io5';

type EventType = 'break' | 'holiday' | 'school';

export default function AcademicCalendar() {
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
  return (
    <div className='w-full rounded-xl bg-white flex flex-col px-4'>
      <div className='flex justify-between px-8'>
        <div className='flex items-center font-bold my-5 gap-3'>
          <div>Academic Calendar 2022/2023 </div>
          <IoChevronDown className='text-blue-500 h-5 w-5' />
        </div>
        <div className='flex items-center font-bold my-5 gap-3'>
          <IoChevronBack className='text-blue-500 h-5 w-5' /> <div>October</div>
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
        {Array(31)
          .fill(0)
          .map((v, i) => {
            const e = events[Math.floor(Math.random() * events.length)];
            const c = getColors(e.type);
            return (
              <AcademicCalendarListItem
                key={i}
                event={{
                  allEvents: e.allEvents,
                  day: `${i + 1}`,
                  backgroundColor: c.backgroundColor,
                  textColor: c.textColor,
                }}
              />
            );
          })}
      </div>
    </div>
  );
}
