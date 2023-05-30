import {
  BsExclamationCircleFill,
  BsFillCalendarWeekFill,
  BsFillCheckCircleFill,
  BsXCircleFill,
} from 'react-icons/bs';

export default function AttendanceHistory() {
  const history = [
    {
      time: '12:03:00',
      activity: 'Class',
      status: <BsFillCheckCircleFill className='text-green-500 h-8 w-8' />,
    },
    {
      time: '12:03:00',
      activity: 'Class',
      status: <BsExclamationCircleFill className='text-[#E5A500] h-8 w-8' />,
    },
    {
      time: '12:03:00',
      activity: 'Class',
      status: <BsXCircleFill className='text-red-500 h-8 w-8' />,
    },
    {
      time: '12:03:00',
      activity: 'Class',
      status: <BsFillCheckCircleFill className='text-green-500 h-8 w-8' />,
    },
  ];
  return (
    <div className='flex-1'>
      <div className='flex justify-between items-center py-4 border-b-2'>
        <div className='text-xl font-bold text-[#6B7A99] '>
          Attendance History
        </div>
        <div className='border-2 rounded-sm gap-3 py-1 px-2 flex items-center border-[#9E7200] bg-[#FFFCF5]'>
          <div>
            <BsFillCalendarWeekFill className='h-5 w-5 text-[#DCA007]' />
          </div>
          <div>18/10/2023</div>
        </div>
      </div>
      <table className='w-full'>
        <tr className='text-start'>
          <th className='text-start text-xl'>Time</th>
          <th className='text-start text-xl'>Activity</th>
          <th className='text-start text-xl'>Status</th>
        </tr>
        {history.map((v, i) => (
          <tr key={i} className='border-b h-14 border-b-black'>
            <td className='text-xl text-[#ADB3CC]'>{v.time}</td>
            <td className='text-xl'>{v.activity}</td>
            <td className='text-xl'>{v.status}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
