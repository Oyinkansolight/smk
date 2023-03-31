import moment from 'moment';

export default function TaskAccordion({
  taskName,
  lessons,
  nextClass,
  endDate,
}: {
  taskName: string;
  lessons: { topic: string; progress: number }[];
  nextClass: Date;
  endDate: Date;
}) {
  return (
    <div>
      <div className='flex rounded-md bg-white p-4 '>
        <div>Arrow Icon</div>
        <div>{taskName}</div>
        <div className='w-4' />
        <div>{`${lessons.length} Lesson${lessons.length > 1 ? 's' : ''}`}</div>
        <div>Task Icon</div>
        <div>Clip Icon</div>
        <div className='flex-1' />
        <div>Flag Icon</div>
        <div>Next Class: {moment(nextClass).format('MMM D, ha')}</div>
        <div>Clock Icon</div>
        <div>End Date: {moment(endDate).format('MMM D, ha')}</div>
      </div>
    </div>
  );
}
