import LessonProgress from '@/components/counter/LessonProgress';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default function StudentTaskListView({
  tasks,
}: {
  tasks: { name: string; progress: number }[];
}) {
  return (
    <div className=''>
      <div className='flex items-center justify-between border-b-[2px] py-3'>
        <div className='text-xl font-bold text-[#6B7A99]'>Exam Report List</div>
        <div className='flex items-center font-bold'>
          <div>Filter</div> <MdKeyboardArrowDown className='h-5 w-5' />
        </div>
      </div>
      <div className='h-8' />
      <div className='relative overflow-x-auto'>
        <table className='w-full text-left text-sm text-gray-500 '>
          <thead className=' text-xs uppercase text-gray-700 '>
            <tr className=' border-b-2'>
              <th className='w-20 px-6 py-3'>No</th>
              <th className='w-64 px-6 py-3'>Task</th>
              <th className='px-6 py-3'>Progress</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => (
              <tr key={i} className='border-b  '>
                <th
                  scope='row'
                  className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'
                >
                  {i + 1}
                </th>
                <td className='px-6 py-4'>{task.name}</td>
                <td className='px-6 py-4'>
                  <LessonProgress
                    variant='secondary'
                    showLabel={false}
                    done={task.progress}
                    total={100}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
