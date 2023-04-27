import TaskAccordion from '@/components/accordions/TaskAccordion';
import Button from '@/components/buttons/Button';
import { CurriculumCard } from '@/components/cards';
import FilterModal from '@/components/modals/add-subject-modal';
import clsxm from '@/lib/clsxm';
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
          if (i === 2) {
            return (
              <TaskAccordion
                bordered
                length={4}
                lesson={false}
                taskName={`Primary ${i + 1}`}
                key={i}
              >
                <div className='flex flex-col divide-y-2 !text-xs pt-[33px]'>
                  {Array(4)
                    .fill(0)
                    .map((v, j) => {
                      return (
                        <div
                          key={j}
                          className={clsxm(
                            j === 0 && 'border-t',
                            j === 3 && 'border-b',
                            'flex flex-row justify-between py-[22px]'
                          )}
                        >
                          <div>Period {j}</div>
                          <div>
                            <span className='text-[#8898AA]'>5</span>/10
                          </div>
                          <div className='flex flex-row text-[#ADB3CC] gap-[10px]'>
                            <div>View</div>
                            <div>Edit</div>
                            <div>Delete</div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </TaskAccordion>
            );
          }
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
                  count={85}
                  variant='primary'
                />
                <CurriculumCard
                  name='Second Term Curriculum'
                  count={85}
                  variant='secondary'
                />
                <CurriculumCard
                  name='Third Term Curriculum'
                  count={85}
                  variant='tertiary'
                />
              </div>
            </TaskAccordion>
          );
        })}
    </div>
  );
}
