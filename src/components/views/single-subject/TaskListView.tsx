import TaskAccordion from '@/components/accordions/TaskAccordion';
import Button from '@/components/buttons/Button';
import FilterModal from '@/components/modals/add-subject-modal';
import LessonsTable from '@/components/tables/LessonsTable';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default function TaskListView() {
  return (
    <div className='flex flex-col space-y-6'>
      <div className='flex justify-end'>
        <div className='flex items-center font-bold'>
          <div>Filter</div> <MdKeyboardArrowDown className='h-5 w-5' />
        </div>
        <div className='w-8' />
        <div className='flex gap-5'>
          <Button
            variant='outline'
            className='!text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
          >
            Download Report
          </Button>

          <FilterModal>
            <Button
              variant='outline'
              className='!text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
            >
              Manage
            </Button>
          </FilterModal>
        </div>
      </div>
      {Array(3)
        .fill(0)
        .map((v, i) => {
          return (
            <TaskAccordion
              length={4}
              taskName={`Class ${i + 1}`}
              nextClass={new Date()}
              endDate={new Date()}
              key={i}
            >
              <LessonsTable
                lessons={[
                  { progress: 2, topic: 'English' },
                  { progress: 5, topic: 'Mathematics' },
                  { progress: 7, topic: 'Computer Studies' },
                  { progress: 2, topic: 'Engineering' },
                ]}
              />
            </TaskAccordion>
          );
        })}
    </div>
  );
}
