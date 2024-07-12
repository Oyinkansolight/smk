/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericLoader from '@/components/layout/Loader';
import EmptyView from '@/components/misc/EmptyView';
import Paginator from '@/components/navigation/Paginator';
import { useGetSingleTeacherAttendanceLog } from '@/server/institution';
import moment from 'moment';
import { useState } from 'react';

export default function AttendanceLog({ userId }: { userId?: string }) {
  const [pagingData, setPagingData] = useState<any>({
    userId,
    page: 1,
    limit: 10,
  });
  const { data: attendanceLog, isLoading } = useGetSingleTeacherAttendanceLog({
    ...pagingData,
  });

  return (
    <div className='flex flex-col space-y-6'>
      <div className='layout h-full'>
        <div className='flex flex-col bg-white max-h-fit'>
          <div className='w-full'>
            <div className='py-8 px-4 '>
              <h2 className='md:text-2xl text-xl'> Attendance History</h2>
              <div className='h-px bg-gray-500 mt-[22px] mb-4 flex flex-wrap ' />
              {attendanceLog && attendanceLog?.data?.length > 0 && (
                <div>
                  <div className='grid grid-cols-3 gap-4 border-b  text-base font-medium'>
                    <div>Name</div>
                    <div>Clock In</div>
                    <div>Clock Out</div>
                  </div>
                  {attendanceLog?.data?.map((v, idx) => (
                    <div
                      key={idx}
                      className='border-b py-2 grid grid-cols-3 gap-4 text-gray-500 font-medium text-xs'
                    >
                      <div>
                        {v?.user?.firstName ?? 'N/A'}{' '}
                        {v?.user?.lastName ?? 'N/A'}
                      </div>
                      <div>{moment(v.clockInTime).format('llll')}</div>
                      <div>
                        {v.clockOutTime
                          ? moment(v.clockOutTime).format('llll')
                          : 'N/A'}
                      </div>
                    </div>
                  ))}
                  <div className='flex justify-center'>
                    <Paginator
                      data={attendanceLog}
                      pagingData={pagingData}
                      setPagingData={setPagingData}
                    />
                  </div>
                </div>
              )}
              {attendanceLog?.data?.length === 0 && (
                <EmptyView
                  label='No attendance history for this teacher'
                  useStandardHeight
                />
              )}
              {isLoading && <GenericLoader />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
