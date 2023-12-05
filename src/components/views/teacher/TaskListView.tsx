/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyView from '@/components/misc/EmptyView';
import { useGetSingleTeacherAttendanceLog } from '@/server/institution';
import moment from 'moment';

export default function TaskListView({ userId }: { userId: string }) {
  const { data: attendanceLog } = useGetSingleTeacherAttendanceLog(
    userId ?? ''
  );

  return (
    <div className='flex flex-col space-y-6'>
      <div className='layout h-full'>
        <div className='flex flex-col bg-white h-screen overflow-y-auto'>
          <div className='w-full'>
            <div className='font-bold py-8 px-4 md:text-3xl text-xl'>
              Attendance History
              <div className='h-px bg-gray-500 mt-[22px] mb-4 flex flex-wrap ' />
              {attendanceLog && attendanceLog.length > 0 && (
                <div>
                  <div className='grid grid-cols-3 gap-4 border-b  text-base font-medium'>
                    <div>Name</div>
                    <div>Clock In</div>
                    <div>Clock Out</div>
                  </div>
                  {attendanceLog.map((v, idx) => (
                    <div
                      key={idx}
                      className='border-b py-2 grid grid-cols-3 gap-4 text-gray-500 font-medium text-xs'
                    >
                      <div>
                        {v?.user?.firstName ?? 'N/A'}{' '}
                        {v?.user?.firstName ?? 'N/A'}
                      </div>
                      <div>{moment(v.clockInTime).format('llll')}</div>
                      <div>
                        {v.clockOutTime
                          ? moment(v.clockOutTime).format('llll')
                          : 'N/A'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {attendanceLog?.length === 0 && (
                <EmptyView
                  label='No attendance history for this teacher'
                  useStandardHeight
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
