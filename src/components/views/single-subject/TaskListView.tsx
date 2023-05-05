import TaskAccordion from '@/components/accordions/TaskAccordion';
import Button from '@/components/buttons/Button';
import { CurriculumCard } from '@/components/cards';
import AddSubjectModal from '@/components/modals/add-subject-modal';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default function TaskListView({
  curriculumClicked,
}: {
  curriculumClicked: (currId: number) => void;
}) {
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

          <AddSubjectModal>
            <Button
              variant='outline'
              className='!text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
            >
              Manage
            </Button>
          </AddSubjectModal>
        </div>
      </div>
      {Array(3)
        .fill(0)
        .map((v, i) => {
          return (
            <TaskAccordion
              length={1}
              lesson={false}
              taskName={`Primary ${i + 1}`}
              key={i}
            >
              <div className='flex flex-wrap mt-4 gap-[27px]'>
                <CurriculumCard
                  name='First Term Curriculum'
                  count={100}
                  variant='primary'
                  onClick={() => curriculumClicked(i)}
                />
                <CurriculumCard
                  name='Second Term Curriculum'
                  count={85}
                  variant='secondary'
                  onClick={() => curriculumClicked(i)}
                />
                <CurriculumCard
                  name='Third Term Curriculum'
                  count={85}
                  variant='tertiary'
                  onClick={() => curriculumClicked(i)}
                />
              </div>
            </TaskAccordion>
          );
        })}
    </div>
  );
}
