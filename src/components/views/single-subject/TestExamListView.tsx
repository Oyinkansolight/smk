/* eslint-disable @typescript-eslint/no-explicit-any */
import TaskAccordion from '@/components/accordions/TaskAccordion';
import Button from '@/components/buttons/Button';
// import Button from '@/components/buttons/Button';
import { CurriculumCard } from '@/components/cards';
import { RotatingLines } from 'react-loader-spinner';

// import AddSubjectModal from '@/components/modals/add-subject-modal';
// import { MdKeyboardArrowDown } from 'react-icons/md';

export default function TestExamListView({
  curriculumClicked,
  academicyear,
  classList,
  sessionterms,
  settermId,
  setclassId,
  schoolType,
  isLoading,
}: {
  curriculumClicked: (currId: number) => void;
  settermId: (id: string) => void;
  setclassId: (id: string) => void;
  schoolType?: number;
  isLoading?: boolean;
  academicyear?: string;
  classList: any;
  sessionterms: any;
}) {
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

  return (
    <div className='flex flex-col space-y-6'>
      <div className='flex flex-row items-center justify-between'>
        <div className='text-[#6B7A99] font-bold text-xl'>{academicyear}</div>

        <div className='flex flex-col lg:flex-row items-center justify-center space-x-2 space-y-4'>
          <Button
            variant='outline'
            className='flex flex-row items-center space-x-2 bg-white w-[168px] whitespace-nowrap'
          >
            Download Report
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
  );
}
