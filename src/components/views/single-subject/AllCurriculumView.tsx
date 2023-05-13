import TaskAccordion from '@/components/accordions/TaskAccordion';
import Button from '@/components/buttons/Button';
import { CircularCounter } from '@/components/counter';
import AddWeekModal from '@/components/modals/add-week-modal';
import clsxm from '@/lib/clsxm';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AiTwotoneFlag } from 'react-icons/ai';
import { SlOptionsVertical } from 'react-icons/sl';

export default function AllCurriculumView() {
  const router = useRouter();

  const isEmpty = false;
  const count = 100;
  return (
    <div className='bg-white h-full p-4'>
      <div className='rounded-lg py-6 px-6 flex items-center bg-[#ECF4FF]'>
        <div>First Term Primary 1 Mathematics Curriculum</div>
        <div className='flex-1' />
        {count === 100 ? (
          <Image
            src='/images/curriculum_done.png'
            alt='done'
            height={65}
            width={65}
          />
        ) : (
          <CircularCounter size='sm' total={count} />
        )}
      </div>
      <div className='h-4' />
      <div className='flex flex-col space-y-6'>
        {isEmpty ? (
          <div className='flex flex-col items-center gap-8'>
            <div className='h-10' />
            <Image
              src='/images/empty_box.png'
              alt='empty-box'
              height={128}
              width={128}
            />
            <div className='text-xl'>You have not added a school type yet</div>
            <AddWeekModal>
              <Button variant='outline'>Add Week</Button>
            </AddWeekModal>
          </div>
        ) : (
          Array(3)
            .fill(0)
            .map((v, i) => {
              return (
                <TaskAccordion
                  bordered
                  length={4}
                  lesson={false}
                  taskName={`Week ${i + 1}`}
                  subName={
                    <div className='flex items-center flex-1 w-full'>
                      <AiTwotoneFlag className='h-5 w-5 text-[#C3CAD9]' />
                      <div className='w-4' />
                      <div>
                        Theme: <span className='font-bold'>Prime Number</span>
                      </div>
                    </div>
                  }
                  actions={
                    <div className='flex items-center'>
                      <Button
                        onClick={() => router.push('/super-admin/edit-period')}
                      >
                        Add Period
                      </Button>
                      <div className='w-2' />
                      <SlOptionsVertical className='w-4 h-4' />
                    </div>
                  }
                  showIcons={false}
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
                              <div
                                className='cursor-pointer'
                                onClick={() =>
                                  router.push('/super-admin/view-period')
                                }
                              >
                                View
                              </div>
                              <div
                                className='cursor-pointer'
                                onClick={() =>
                                  router.push('/super-admin/edit-period')
                                }
                              >
                                Edit
                              </div>
                              <div>Delete</div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </TaskAccordion>
              );
            })
        )}
        <div>
          <AddWeekModal>
            <Button variant='outline'>Add Week</Button>
          </AddWeekModal>
        </div>
      </div>
    </div>
  );
}
