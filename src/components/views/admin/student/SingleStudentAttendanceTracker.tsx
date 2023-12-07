/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyView from '@/components/misc/EmptyView';
import clsxm from '@/lib/clsxm';
import { useGetStudentAttendance } from '@/server/government/student';
import moment from 'moment';

export default function AttendanceTracker({
  studentId,
}: {
  studentId?: string;
}) {
  const { data, isLoading } = useGetStudentAttendance(studentId ?? '');

  return (
    <div className='flex flex-col gap-[22px]'>
      <div className='bg-white p-6 rounded border flex flex-col gap-5'>
        {data ? (
          <div>
            {!isLoading && data.length > 0 && (
              <div>
                <div className='flex space-x-2 items-center text-gray-500 font-semibold'>
                  <div className='w-3/5'>Date</div>
                  <div className='w-2/5'>Status</div>
                </div>
                {data.map((item, idx) => (
                  <div
                    key={idx}
                    className='flex space-x-2 items-center border-b p-2'
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
              </div>
            )}
            {data?.length === 0 && (
              <EmptyView
                label='No attendance history for this student'
                useStandardHeight
              />
            )}
          </div>
        ) : (
          <EmptyView
            label='No attendance history for this student'
            useStandardHeight
          />
        )}
      </div>
    </div>
  );
}
