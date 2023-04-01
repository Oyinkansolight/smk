import { MdKeyboardArrowDown } from 'react-icons/md';

import TaskAccordion from '@/components/accordions/TaskAccordion';

export default function TaskListView() {
  return (
    <div className='flex flex-col space-y-6'>
      <div className='flex justify-end'>
        <div className='flex items-center font-bold'>
          <div>Filter</div> <MdKeyboardArrowDown className='h-5 w-5' />
        </div>
        <div className='w-8' />
        <div className='cursor-pointer rounded-md border border-blue-500 bg-white py-2 px-8 text-center font-bold text-blue-500'>
          Add
        </div>
      </div>
      {Array(5)
        .fill(0)
        .map((v, i) => {
          return (
            <TaskAccordion
              taskName={`Class ${i + 1}`}
              lessons={[
                { progress: 2, topic: 'English' },
                { progress: 5, topic: 'Mathematics' },
                { progress: 7, topic: 'Computer Studies' },
                { progress: 2, topic: 'Engineering' },
              ]}
              nextClass={new Date()}
              endDate={new Date()}
              key={i}
            />
          );
        })}
    </div>
  );
}
