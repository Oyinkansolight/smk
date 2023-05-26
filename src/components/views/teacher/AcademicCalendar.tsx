import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

export default function AcademicCalendar() {
  return (
    <div className='w-full rounded-xl bg-white flex flex-col'>
      <div className='flex justify-between'>
        <div></div>
        <div className='flex items-center font-bold my-5 gap-3'>
          <IoChevronBack className='text-blue-500 h-5 w-5' /> <div>October</div>
          <IoChevronForward className='text-blue-500 h-5 w-5' />
        </div>
      </div>
    </div>
  );
}
