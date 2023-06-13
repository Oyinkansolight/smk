import clsxm from '@/lib/clsxm';

export default function AcademicCalendarListItem({
  event,
}: {
  event: {
    day: string;
    allEvents: string[];
    backgroundColor: string;
    textColor: string;
  };
}) {
  return (
    <div
      className={clsxm(
        'border rounded-md h-36 w-2h-28 text-xs py-4 px-2 font-bold'
      )}
    >
      <div className='p-4 font-bold'>{event.day}</div>
      <div className='gap-1 flex flex-col items-center'>
        {event.allEvents.map((e, i) => (
          <div
            key={i}
            className={clsxm(
              'py-1 px-3 rounded-sm',
              event.textColor,
              event.backgroundColor
            )}
          >
            {e}
          </div>
        ))}
      </div>
    </div>
  );
}
