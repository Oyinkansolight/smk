import Button from '@/components/buttons/Button';
import clsxm from '@/lib/clsxm';
import moment from 'moment';

export default function ExamReportView({
  report,
}: {
  report: { name: string; score: number; date: Date }[];
}) {
  return (
    <div className='bg-white p-5 rounded-[4.5px] border border-[#E5E5E5]'>
      <div className='flex items-center justify-between border-b-[2px] py-3'>
        <div className='text-xl font-bold text-[#6B7A99]'>Exam Report List</div>
        <div className='flex items-center gap-[30px] font-bold'>
          <Button variant='ghost'>View Graph</Button>

          <Button
            variant='outline'
            className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
          >
            Download Report
          </Button>
        </div>
      </div>
      <div className='h-8' />
      <div className='relative overflow-x-auto'>
        <table className='w-full text-left text-sm text-gray-500 '>
          <thead className=' text-xs uppercase text-gray-700 '>
            <tr className=' border-b-2 bg-[#F6F9FC]'>
              <th className=' px-6 py-3'>Subject</th>
              <th className='  px-6 py-3'>Status</th>
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
                        'w-48  rounded-full py-1 px-6 text-center text-white',
                        task.score > 70
                          ? 'bg-[#4AAF05]'
                          : task.score > 40
                          ? 'bg-[#FB8832]'
                          : 'bg-[#FF5756]'
                      )}
                    >
                      {task.score > 70
                        ? 'Good'
                        : task.score > 40
                        ? 'Below Average'
                        : 'Poor'}
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
