/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetTeacherAttendanceLog } from '@/server/institution';

export default function TaskListView() {
  const { data: attendanceLog } = useGetTeacherAttendanceLog();
  console.log(attendanceLog);

  return (
    <div className='flex flex-col space-y-6'>
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
