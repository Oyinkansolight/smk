/* eslint-disable @typescript-eslint/no-explicit-any */
import TaskAccordion from '@/components/accordions/TaskAccordion';
// import Button from '@/components/buttons/Button';
import { CurriculumCard } from '@/components/cards';

// import AddSubjectModal from '@/components/modals/add-subject-modal';
// import { MdKeyboardArrowDown } from 'react-icons/md';

export default function TaskListView({
  curriculumClicked,
  academicyear,
  classList,
  sessionterms,
  settermId,
  setclassId,
}: {
  curriculumClicked: (currId: number) => void;
  settermId: (id: number) => void;
  setclassId: (id: number) => void;
  schoolType?: number;
  academicyear?: string;
  classList: any;
  sessionterms: any;
}) {
  // const ECCDE = classList.filter((x: any) =>
  //   x.name.toLowerCase().includes('eccde')
  // );
  // const Primary = classList.filter((x: any) =>
  //   x.name.toLowerCase().includes('primary')
  // );
  // const Secondary = classList.filter((x: any) =>
  //   x.name.toLowerCase().includes('ss')
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
      <div className='flex justify-between items-center'>
        <div className='text-[#6B7A99] font-bold text-xl'> {academicyear}</div>
        <div className='flex justify-end'>
          {/* <div className='flex items-center font-bold'>
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
          </div> */}
        </div>
      </div>
      {/* {schoolType === 0 && (
        <div>
          {ECCDE.map((v: any, i: number) => {
            return (
              <TaskAccordion
                length={1}
                lesson={false}
                taskName={v.name}
                key={i}
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
                        settermId(value.id);
                        setclassId(v.id);
                      }}
                    />
                  ))}
                </div>
              </TaskAccordion>
            );
          })}
        </div>
      )}
      {schoolType === 1 && (
        <div>
          {Primary.map((v: any, i: number) => {
            return (
              <TaskAccordion
                length={1}
                lesson={false}
                taskName={v.name}
                key={i}
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
                        settermId(value.id);
                        setclassId(v.id);
                      }}
                    />
                  ))}
                </div>
              </TaskAccordion>
            );
          })}
        </div>
      )} */}

      <div>
        {classList.map((v: any, i: number) => {
          return (
            <TaskAccordion
              length={1}
              lesson={false}
              taskName={`${v.class.name} ${v.arm}`}
              key={i}
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
                      settermId(value.id);
                      setclassId(v.id);
                    }}
                  />
                ))}
              </div>
            </TaskAccordion>
          );
        })}
      </div>
    </div>
  );
}
