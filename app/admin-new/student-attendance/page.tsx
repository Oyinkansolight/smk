'use client';
import { useGetStudentAttendance } from '@/server/government/student';
import { useState } from 'react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import clsxm from '@/lib/clsxm';

export default function StudentAttendance() {
  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
  });
  const attendance = useGetStudentAttendance({
    ...pagingData,
  });

  const handleNextPage = () => {
    setPagingData({ ...pagingData, page: pagingData.page + 1 });
  };

  const handlePrevPage = () => {
    if (pagingData.page === 1) return;
    setPagingData({ ...pagingData, page: pagingData.page - 1 });
  };

  const handleJumpToStart = () => {
    setPagingData({ ...pagingData, page: 1 });
  };

  const handleJumpToEnd = () => {
    if (attendance.data)
      setPagingData({
        ...pagingData,
        page: attendance?.data.paging?.totalPages,
      });
  };
  console.log(attendance.data?.meta);

  return (
    <div>
      <div className='relative overflow-x-auto'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Institution
              </th>
              <th scope='col' className='px-6 py-3'>
                Type
              </th>
              <th scope='col' className='px-6 py-3'>
                Attendance Status
              </th>
              <th scope='col' className='px-6 py-3'>
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {attendance.data?.items &&
              attendance.data.items.map((d, i) => (
                <SingleAttendanceItem key={i} data={d} />
              ))}
          </tbody>
        </table>
      </div>

      {attendance && attendance?.data?.items?.length > 0 && (
        <div className='lg:min-w-[800px] my-4 flex items-center justify-center lg:justify-end space-x-3 lg:pr-10'>
          <button
            onClick={handleJumpToStart}
            disabled={pagingData.page === 1}
            className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
          >
            <BiChevronsLeft />
          </button>

          <button
            onClick={handlePrevPage}
            disabled={pagingData.page === 1}
            className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
          >
            <svg
              width='6'
              height='8'
              viewBox='0 0 6 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M4.43018 0.169922L5.83643 1.5764L3.72705 3.68612L5.83643 5.79583L4.43018 7.20231L0.914551 3.68612L4.43018 0.169922Z'
                fill='#8898AA'
              />
            </svg>
          </button>

          {Array(attendance.data.meta.totalPages)
            .fill(0)
            .slice(0, 2)
            .map((item, idx: number) => (
              <div
                key={Math.random() * 100}
                className={clsxm(
                  pagingData.page === idx + 1
                    ? 'bg-[#008146] text-white'
                    : 'bg-white text-gray-500',
                  'grid h-7 w-7 place-content-center rounded-full border p-2'
                )}
              >
                {idx + 1}
              </div>
            ))}

          {attendance.data.meta.totalPages > 3 && (
            <div
              key={Math.random() * 100}
              className={clsxm(
                pagingData.page === 3 ||
                  (pagingData.page > 3 &&
                    pagingData.page < attendance.data.meta.totalPages)
                  ? 'bg-[#008146] text-white'
                  : 'bg-white text-gray-500',
                'grid h-7 w-7 place-content-center rounded-full border p-2'
              )}
            >
              {pagingData.page > 3 &&
              pagingData.page < attendance.data.meta.totalPages
                ? pagingData.page
                : 3}
            </div>
          )}

          {attendance.data.meta.totalPages > 4 && (
            <div
              key={Math.random() * 100}
              className={clsxm(
                'bg-white text-gray-500',
                'grid h-7 w-7 place-content-center rounded-full border p-2'
              )}
            >
              ...
            </div>
          )}

          {attendance.data.meta.totalPages > 1 && (
            <div
              className={clsxm(
                pagingData.page === attendance.data.meta.totalPages
                  ? 'bg-[#008146] text-white'
                  : 'bg-white text-gray-500',
                'grid h-7 w-7 place-content-center rounded-full border p-2'
              )}
            >
              {attendance.data.meta.totalPages}
            </div>
          )}

          <button
            onClick={handleNextPage}
            disabled={
              attendance.data &&
              attendance.data?.data?.attendance.datas?.length < 10
            }
            className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
          >
            <svg
              width='6'
              height='8'
              viewBox='0 0 6 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2.32031 0.169922L0.914062 1.5764L3.02344 3.68612L0.914062 5.79583L2.32031 7.20231L5.83594 3.68612L2.32031 0.169922Z'
                fill='#8898AA'
              />
            </svg>
          </button>

          <button
            onClick={handleJumpToEnd}
            disabled={
              attendance.data &&
              attendance.data?.data?.attendance.datas?.length < 10
            }
            className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
          >
            <BiChevronsRight />
          </button>
        </div>
      )}
    </div>
  );
}

function SingleAttendanceItem(props: { data: any; children?: JSX.Element }) {
  return (
    <tr className='bg-white border-b'>
      <th
        scope='row'
        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
      >
        {props.data.student.lastName} {props.data.student.firstName}
      </th>
      <td className='px-6 py-4'>
        {props.data.student?.institution?.instituteName ?? 'NULL'}
      </td>
      <td className='px-6 py-4'>
        {props.data.student?.institution?.instituteType ?? 'NULL'}
      </td>
      <td className='px-6 py-4'>{props.data.status}</td>
      <td className='px-6 py-4'></td>
    </tr>
  );
}
