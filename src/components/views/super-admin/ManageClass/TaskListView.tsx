/* eslint-disable @typescript-eslint/no-explicit-any */
import TaskAccordion from '@/components/accordions/TaskAccordion';
import Button from '@/components/buttons/Button';
import { CurriculumCard } from '@/components/cards';
import AddSubjectModal from '@/components/modals/add-subject-modal';
import TimeTable from '@/components/views/super-admin/SingleSchoolCalendar/Timetable';
import Image from 'next/image';
import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface timetableArg {
  classId: number;
  termId: number;
}
interface propType {
  schoolType: string | null;
  academicyear?: string | null;
  sessionId: string | null;
  classList: any;
  sessionterms?: any;
}
export default function TaskListView({
  schoolType,
  academicyear,
  classList,
  sessionterms,
  sessionId,
}: propType) {
  const ECCDE = classList.filter((x: any) =>
    x.name.toLowerCase().includes('eccde')
  );
  const Primary = classList.filter((x: any) =>
    x.name.toLowerCase().includes('primary')
  );
  const Secondary = classList.filter((x: any) =>
    x.name.toLowerCase().includes('ss')
  );
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
  // const router = useRouter();

  const [showTimeTable, setShowTimeTable] = useState(false);
  const [classId, setclassId] = useState<number>(0);
  const [termId, settermId] = useState<any>(null);

  function HandleTimeTable({ classId, termId }: timetableArg) {
    setShowTimeTable(true);

    setclassId(classId);
    settermId(termId);
  }

  return (
    <div className='flex flex-col space -y-6'>
      {!showTimeTable ? (
        <div>
          <div className='flex justify-between items-center'>
            <div className='text-[#6B7A99] font-bold text-xl'>
              {' '}
              {academicyear}
            </div>
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
          </div>
          {schoolType?.toLowerCase()?.includes('eccde') && (
            <div className='mt-6'>
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
                          name={`${value.name} Timetable`}
                          count={100}
                          variant={generateVariant(id)}
                          onClick={() => {
                            HandleTimeTable({
                              classId: v.id,
                              termId: value.id,
                            });
                          }}
                        />
                      ))}
                    </div>
                  </TaskAccordion>
                );
              })}
            </div>
          )}
          {schoolType?.toLowerCase()?.includes('primary') && (
            <div className='mt-6'>
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
                          name={`${value.name} Timetable`}
                          count={100}
                          variant={generateVariant(id)}
                          onClick={() => {
                            HandleTimeTable({
                              classId: v.id,
                              termId: id + 1,
                            });
                          }}
                        />
                      ))}
                    </div>
                  </TaskAccordion>
                );
              })}
            </div>
          )}
          {schoolType?.toLowerCase()?.includes('ss') && (
            <div className='mt-6'>
              {Secondary.map((v: any, i: number) => {
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
                          name={`${value.name} Timetable`}
                          count={100}
                          variant={generateVariant(id)}
                          onClick={() => {
                            HandleTimeTable({
                              classId: v.id,
                              termId: id + 1,
                            });
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
      ) : (
        <div>
          <button
            onClick={() => {
              setShowTimeTable(false);
            }}
            className='flex items-center space-x-4 bg-[#EDEFF2] rounded-md px-3 py-1'
          >
            <Image
              src='/svg/back_yellow.svg'
              width={10}
              height={10}
              alt='back'
              className='h-3 w-3'
            />
            <h3 className='text-[14px] font-bold'>Back</h3>
          </button>
          <TimeTable
            sessionId={sessionId}
            schoolType={schoolType}
            classId={classId}
            termId={termId}
          />
        </div>
      )}
    </div>
  );
}
