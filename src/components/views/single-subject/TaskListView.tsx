/* eslint-disable @typescript-eslint/no-explicit-any */
import TaskAccordion from '@/components/accordions/TaskAccordion';
import Button from '@/components/buttons/Button';
// import Button from '@/components/buttons/Button';
import { CurriculumCard } from '@/components/cards';
import ControlledModal from '@/components/modal/ControlledModal';
import logger from '@/lib/logger';
import { useDeleteSubject } from '@/server/government/classes_and_subjects';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

// import AddSubjectModal from '@/components/modals/add-subject-modal';
// import { MdKeyboardArrowDown } from 'react-icons/md';

export default function TaskListView({
  curriculumClicked,
  academicyear,
  classList,
  sessionterms,
  settermId,
  setclassId,
  schoolType,
  isLoading,
  params,
}: {
  curriculumClicked: (currId: number) => void;
  settermId: (id: string) => void;
  setclassId: (id: string) => void;
  schoolType?: number;
  isLoading?: boolean;
  academicyear?: string;
  classList: any;
  sessionterms: any;
  params?: any;
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const ECCDE = classList.filter((x: any) =>
    x.className.toLowerCase().includes('eccde')
  );
  const Primary = classList.filter((x: any) =>
    x.className.toLowerCase().includes('primary')
  );
  const Secondary = classList.filter((x: any) =>
    x.className.toLowerCase().includes('ss')
  );
  function customSort(a: any, b: any) {
    const aIsJSS = a.className.startsWith('JSS');
    const bIsJSS = b.className.startsWith('JSS');

    if (aIsJSS && !bIsJSS) {
      return -1;
    } else if (!aIsJSS && bIsJSS) {
      return 1;
    } else {
      // If both elements are JSS or both are SSS, sort them alphabetically.
      return a.className.localeCompare(b.className);
    }
  }

  const sortedSecondary = Secondary ? Secondary.sort(customSort) : [];
  // const Tertiary = classList.filter(
  //   (x: any) =>
  //     !x.className.toLowerCase().includes('ss') ||
  //     !x.className.toLowerCase().includes('primary') ||
  //     !x.className.toLowerCase().includes('eccde')
  // );
  const generateVariant = (id: number) => {
    if (id === 0) {
      return 'primary';
    }
    if (id === 1) {
      return 'secondary';
    }
    if (id === 2) {
      return 'tertiary';
    }
  };

  const { mutateAsync } = useDeleteSubject();

  const handleDelete = async () => {
    const subjectId = params?.get('id');

    if (subjectId) {
      try {
        const res = await mutateAsync(subjectId);
        res && router.replace('/super-admin/all-subject');
      } catch (error) {
        logger(error);
      }
    }
  };

  const DeleteModalContent = () => (
    <div className='flex flex-col space-y-4 items-center justify-center'>
      <div className='font-bold text-4xl'>Delete Subject</div>
      <div className='text-base text-[#6B7A99]'>
        Are you sure you want to delete this subject?
      </div>
      <div className='flex flex-row items-center justify-end space-x-4'>
        <Button onClick={toggleModal} className='flex flex-row items-center justify-center w-[168px] whitespace-nowrap'>
          Keep
        </Button>

        <Button
          onClick={handleDelete}
          variant='danger'
          className='flex flex-row items-center justify-center w-[168px] whitespace-nowrap'
        >
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <ControlledModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        content={<DeleteModalContent />}
        className='max-w-[777px] w-full h-[267px]'
      />

      <div className='flex flex-col space-y-6'>
        <div className='flex flex-row items-center justify-between'>
          <div className='text-[#6B7A99] font-bold text-xl'>{academicyear}</div>

          <div className='flex flex-col lg:flex-row items-center justify-center space-x-2 space-y-4 lg:space-y-0'>
            <Button
              variant='outline'
              className='flex flex-row items-center space-x-2 bg-white w-[168px] whitespace-nowrap'
            >
              Download Report
            </Button>

            <Button
              variant='danger'
              onClick={toggleModal}
              className='flex flex-row items-center justify-center space-x-2 w-[168px] whitespace-nowrap'
            >
              <span>Delete Subject</span>
            </Button>
          </div>
        </div>
        <div className='flex justify-center'>
          {isLoading && (
            <RotatingLines
              width='100'
              visible={true}
              strokeWidth='5'
              strokeColor='#008146'
              animationDuration='0.75'
            />
          )}
        </div>
        {!isLoading && schoolType === 0 && (
          <div>
            {ECCDE.map((v: any, i: number) => {
              return (
                <TaskAccordion
                  length={1}
                  lesson={false}
                  percentage={v.percentage ? v.percentage : '0'}
                  taskName={v.className}
                  key={i}
                  onClick={() => {
                    curriculumClicked(i);
                    setclassId(v.classId);
                  }}
                >
                  <div className='flex flex-wrap mt-4 gap-[27px]'></div>
                </TaskAccordion>
              );
            })}
          </div>
        )}
        {!isLoading && schoolType === 1 && (
          <div>
            {Primary.map((v: any, i: number) => {
              return (
                <TaskAccordion
                  length={1}
                  lesson={false}
                  percentage={v.percentage ? v.percentage : '0'}
                  taskName={v.className}
                  key={i}
                  onClick={() => {
                    curriculumClicked(i);
                    setclassId(v.classId);
                  }}
                >
                  <div className='flex flex-wrap mt-4 gap-[27px]'></div>
                </TaskAccordion>
              );
            })}
          </div>
        )}
        {!isLoading && schoolType === 2 && (
          <div>
            {sortedSecondary.map((v: any, i: number) => {
              return (
                <TaskAccordion
                  length={1}
                  lesson={false}
                  taskName={v.className}
                  percentage={v.percentage ? v.percentage : '0'}
                  key={i}
                  onClick={() => {
                    curriculumClicked(i);
                    setclassId(v.classId);
                  }}
                >
                  <div className='flex flex-wrap mt-4 gap-[27px]'></div>
                </TaskAccordion>
              );
            })}
          </div>
        )}
        {!isLoading && schoolType === 3 && (
          <div>
            {[].map((v: any, i: number) => {
              return (
                <TaskAccordion
                  length={1}
                  lesson={false}
                  taskName={v.className}
                  key={i}
                  onClick={() => {
                    curriculumClicked(i);
                    setclassId(v.classId);
                  }}
                >
                  <div className='flex flex-wrap mt-4 gap-[27px]'>
                    {sessionterms.map((value: any, id: number) => (
                      <CurriculumCard
                        key={id}
                        name={`${value.name} Curriculum`}
                        count={100}
                        variant={generateVariant(id)}
                        onClick={() => {
                          curriculumClicked(i);
                          setclassId(v.id);
                          settermId(value.id);
                        }}
                      />
                    ))}
                  </div>
                </TaskAccordion>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
