import moment from 'moment';

const weeks = ['M', 'T', 'W', 'T', 'F'];

export default function WeekCheckBox({ date }: { date: Date }) {
  return (
    <div className='flex flex-col items-center justify-center rounded-md bg-[#E6EFFF] p-4'>
      <div>{moment(date).format('hh:mm:ssa')}</div>
      <div>{moment(date).format('Do MMMM, YYYY')}</div>
      <div className='flex justify-between'>
        {weeks.map((week, i) => (
          <div key={i}>{week}</div>
        ))}
      </div>
    </div>
  );
}
