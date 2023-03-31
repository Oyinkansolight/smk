import LessonProgress from '@/components/counter/LessonProgress';

export default function LessonsTable({
  lessons,
}: {
  lessons: { topic: string; progress: number }[];
}) {
  return (
    <div className='relative overflow-x-auto'>
      <table className='w-full text-left text-sm text-gray-500 '>
        <thead className=' text-xs uppercase text-gray-700 '>
          <tr>
            <th className='px-6 py-3'>No</th>
            <th className='px-6 py-3'>Topic</th>
            <th className='px-6 py-3'>Progress</th>
            <th className='px-6 py-3'></th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson, i) => (
            <tr key={i} className='border-b  '>
              <th
                scope='row'
                className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'
              >
                {i + 1}
              </th>
              <td className='px-6 py-4'>{lesson.topic}</td>
              <td className='px-6 py-4'>
                <LessonProgress done={lesson.progress} total={10} />
              </td>
              <td className='flex items-center justify-center px-6 py-4'>
                <div className='cursor-pointer text-[#ADB3CC] hover:text-blue-500'>
                  Edit
                </div>
                <div className='w-4' />
                <div className='cursor-pointer text-[#ADB3CC] hover:text-blue-500'>
                  Delete
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
