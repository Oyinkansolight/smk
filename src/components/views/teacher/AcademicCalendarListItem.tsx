import clsxm from '@/lib/clsxm';

export default function AcademicCalendarListItem({
  events,
}: {
  events?: {
    allEvents: string[];
    backgroundColor: string;
    textColor: string;
  };
}) {
  return (
    <div></div>
    // <div
    //   className={clsxm(
    //     'border rounded-md h-36 w-36  text-xs py-4 px-2 font-bold',
    //     events?.textColor,
    //     !events && 'border-transparent'
    //   )}
    // >
    //   {events && (
    //     <div
    //       className={clsxm(
    //         'h-full w-full rounded-md flex gap-6 flex-col justify-center items-center',
    //         events.subjectColor
    //       )}
    //     >
    //       <div>{events.name}</div>
    //       <div>{events.time}</div>
    //     </div>
    //   )}
    // </div>
  );
}
