/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import { useGetSubjectList, useGetTeacherAttendanceLog } from '@/server/institution';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default function TaskListView() {
 

  const { data: attendanceLog } = useGetTeacherAttendanceLog();
  return (
    <div className='flex flex-col space-y-6'>
      <div className='flex justify-end'>
        <div className='flex items-center font-bold'>
          <div>Filter</div> <MdKeyboardArrowDown className='h-5 w-5' />
        </div>
        <div className='w-8' />
        <div className='flex gap-5'>
          <Button
            variant='outline'
            className='!text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
          >
            Download Report
          </Button>
          <Button
            variant='outline'
            className='!text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
          >
            Manage
          </Button>
        </div>
      </div>
      <div className='layout h-full'>
        <div className='flex flex-col bg-white h-screen overflow-y-auto'>
          <div className='w-full'>
            <div className='font-bold py-8 px-4 md:text-3xl text-xl'>
              Attendance History
              <div className='h-px bg-black mt-[22px] mb-10 flex flex-wrap ' />
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
