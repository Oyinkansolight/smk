import moment, { Duration } from 'moment';

export default function StudentActivityHistory({
  activities,
}: {
  activities: {
    activity: string;
    date: Date;
    duration: Duration;
    status: string;
  }[];
}) {
  return (
    <div className=''>
      <div className='flex items-center justify-between border-b-[2px] py-3'>
        <div className='text-xl font-bold text-[#6B7A99]'>Activity History</div>
        <div className='flex items-center font-bold'>
          <div>Filter</div>
        </div>
      </div>
      <div className='h-8' />
      <div className='relative overflow-x-auto'>
        <table className='w-full text-left text-sm text-gray-500 '>
          <thead className=' text-xs uppercase text-gray-700 '>
            <tr className=' border-b-2 bg-[#F6F9FC]'>
              <th className=' px-6 py-3'>Date & Time</th>
              <th className=' px-6 py-3'>Activity</th>
              <th className='px-6 py-3'>Duration</th>
              <th className='px-6 py-3'>Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((task, i) => (
              <tr key={i} className='border-b  '>
                <td
                  scope='row'
                  className='whitespace-nowrap px-6 py-4  text-[#ADB3CC]'
                >
                  {moment(task.date).format('hh:mm:SS - DD/MM/YYYY')}
                </td>
                <td className='px-6 py-4'>{task.activity}</td>
                <td className='px-6 py-4'>{task.duration.asHours()} H</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
