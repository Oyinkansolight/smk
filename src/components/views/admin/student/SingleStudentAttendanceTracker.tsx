/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericLoader from '@/components/layout/Loader';
import EmptyView from '@/components/misc/EmptyView';
import Paginator from '@/components/navigation/Paginator';
import clsxm from '@/lib/clsxm';
import { useGetStudentAttendance } from '@/server/government/student';
import moment from 'moment';
import { useState } from 'react';

export default function AttendanceTracker({
  studentId,
}: {
  studentId?: string;
}) {
  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    studentId,
    limit: 10,
  });
  const { data, isLoading } = useGetStudentAttendance({ ...pagingData });

  return (
    <div className='flex flex-col gap-[22px]'>
      <div className='bg-white p-6 rounded border flex flex-col gap-5'>
        <div>
          {!isLoading && data?.data?.items.length > 0 && (
            <div>
              <div className='flex space-x-2 items-center text-gray-500 border-b-2 py-2 font-semibold'>
                <div className='w-3/5'>Date</div>
                <div className='w-2/5'>Status</div>
              </div>
              {data?.data?.items.map((item, idx) => (
                <div
                  key={idx}
                  className='flex space-x-2 items-center border-b py-2'
                >
                  <div className='w-3/5'>
                    {moment(item.createdAt).format('llll')}
                  </div>
                  <div
                    className={clsxm(
                      'w-2/5',
                      item.status === 'PRESENT' && 'text-green-500',
                      item.status === 'ABSENT' && 'text-red-500',
                      item.status === 'LATE' && 'text-yellow-500'
                    )}
                  >
                    {item.status}
                  </div>
                </div>
              ))}
              <div className='flex justify-center'>
                <Paginator
                  data={data}
                  pagingData={pagingData}
                  setPagingData={setPagingData}
                />
              </div>
            </div>
          )}
          {data?.data?.items.length === 0 && (
            <EmptyView
              label='No attendance history for this student'
              useStandardHeight
            />
          )}
          {isLoading && <GenericLoader />}
        </div>
      </div>
    </div>
  );
}
