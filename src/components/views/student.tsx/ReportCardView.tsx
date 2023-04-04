import moment from 'moment';
import { MdKeyboardArrowDown } from 'react-icons/md';

import clsxm from '@/lib/clsxm';

export default function ReportCardView({
  report,
}: {
  report: { name: string; score: number; date: Date }[];
}) {
  return (
    <div className=''>
      <div className='border- flex items-center justify-between'>
        <div className='text-xl font-bold text-[#6B7A99]'>Exam Report List</div>
        <div className='flex items-center font-bold'>
          <div>Filter</div> <MdKeyboardArrowDown className='h-5 w-5' />
        </div>
      </div>
      <div className='relative overflow-x-auto'>
        <table className='w-full text-left text-sm text-gray-500 '>
          <thead className=' text-xs uppercase text-gray-700 '>
            <tr className=' border-b-2'>
              <th className=' px-6 py-3'>Subject</th>
              <th className=' px-6 py-3'>Status</th>
              <th className='px-6 py-3'>Average Score</th>
              <th className='px-6 py-3'>Date</th>
            </tr>
          </thead>
          <tbody>
            {report.map((task, i) => (
              <tr key={i} className='border-b  '>
                <th
                  scope='row'
                  className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'
                >
                  {task.name}
                </th>
                <td className='px-6 py-4'>
                  <div className='flex justify-start'>
                    <div
                      className={clsxm(
                        'rounded-full  py-1 px-6 text-white',
                        task.score > 70
                          ? 'bg-[#4AAF05]'
                          : task.score > 40
                          ? 'bg-[#FB8832]'
                          : 'bg-[#FF5756]'
                      )}
                    >
                      Status
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4'>{task.score} %</td>
                <td>{moment(task.date).format('DD/MM/YYYY')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
