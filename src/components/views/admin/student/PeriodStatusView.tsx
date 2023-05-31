import { TbFileText } from 'react-icons/tb';

export type PeriodStatus = 'attend' | 'missed' | 'not-started';

export default function PeriodStatusView() {
  const getStatusView = (status: PeriodStatus) => {
    switch (status) {
      case 'attend':
        return <div className='text-green-500 text-center'>Attended Class</div>;
      case 'missed':
        return <div className='text-red-500 text-center'>Missed Class</div>;
      case 'not-started':
        return <div className='text-[#746D69] text-center'>Missed Class</div>;
      default:
        break;
    }
  };
  const details = [
    { title: 'Subject', value: 'Mathematics' },
    { title: 'Class', value: 'Primary 1' },
    { title: 'Week', value: 'Week 1' },
    { title: 'Period', value: 'Period 1' },
    { title: 'Date', value: '24-March-2022' },
    { title: 'Time', value: '08:10am - 08:50am' },
    { title: 'Title', value: 'Introduction to Calculus' },
  ];
  return (
    <div className='flex text-start flex-col gap-5'>
      <div className='bg-[#F4F9FF] p-8'>
        <div className='text-start font-extrabold text-xl'>Status</div>
        <div className='py-3 my-2 border-y font-bold'>
          {getStatusView('attend')}
        </div>
      </div>
      <div className='border p-4 rounded-lg'>
        <div className='grid grid-cols-2 gap-4'>
          {details.map((v, i) => (
            <div className='text-start' key={i}>
              <div className='text-[#A5A5A5]'>{v.title}</div>
              <div className='font-extrabold'>{v.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div>Attached File</div>
        <div className='rounded-md px-4 border gap-4 bg-[#F2F2F2] border-[#C8C8C8] flex items-center'>
          <TbFileText className='h-5 w-5' />
          <div className='font-bold text-xl text-[#525F7F]'>
            Calculus Introduction
          </div>
        </div>
      </div>
    </div>
  );
}
