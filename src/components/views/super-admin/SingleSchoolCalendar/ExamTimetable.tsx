/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import TaskAccordion from '@/components/accordions/TaskAccordion';
import { CurriculumCard } from '@/components/cards';
import AddActivityName from '@/components/modal/TestSchedule';
import TimeTable from '@/components/views/super-admin/SingleSchoolCalendar/Timetable';
import request from '@/server';
import { getErrMsg } from '@/server';
import { useCreateTestTimeTable } from '@/server/Schedule';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Time from '~/svg/time.svg';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

interface dataType {
  sessionId: number;
  institutionType: string;
  classId: number;
  term: any;
  type: string | number;
  timeTableType: string | number;
  periods?: {
    day: string;
    subject: string | number;
    isEvent: boolean;
  }[];
  startTime: string | number;
  endTime: string | number;
  eventName?: string | number;
}
interface timetableArg {
  classId: number;
  termId: any;
  type: string;
}
interface propType {
  schoolType: string | null;
  academicyear?: string | null;
  sessionId: string | null;
  classList: any;
  sessionterms?: any;
  currentTermId?: number;
}
const AcademicCalendar = ({
  schoolType,
  classList,
  sessionId,
  currentTermId,
}: propType) => {
  const [showTimeTable, setShowTimeTable] = useState(false);
  const [classId, setclassId] = useState<number>(0);
  const [termId, settermId] = useState<any>(null);
  const [ExamOrTest, setExamOrTest] = useState('');
  const [testTable, setTestTable] = useState('');
  // const handleCreateAcademicTimeTable = useCreateAcademicTimeTable();
  // const { data, error, isLoading } = useGetAcademicTimetable(1, 1, 1);

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
  // const router = useRouter();

  const fetchTestTimeTable = () => {
    request
      .get(
        `/v1/government/time-table/time-table-by-type?sessionId=${sessionId}&classId=${classId}&term=${currentTermId}&type=EXAM`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setschedule(res.data.data.data);
      });
    request
      .get(
        `/v1/government/time-table/time-table-by-type?sessionId=${sessionId}&classId=${classId}&term=${currentTermId}&type=TEST`, {
        withCredentials: true,
      }
      )
      .then((res) => {
        setTestTable(res.data.data.data);
      });
  };

  function HandleTimeTable({ classId, termId, type }: timetableArg) {
    setShowTimeTable(true);

    setclassId(classId);
    settermId(termId);
    setExamOrTest(type);
    fetchTestTimeTable();
  }
  const [schedule, setschedule] = useState<dataType[]>([]);
  const [isOpenActivity, setisOpenActivity] = useState(false);
  const [startTime, setstartDate] = useState<string | number>('');
  const [endTime, setendDate] = useState<string | number>('');
  const [subjectId1, setSubjectId1] = useState<string | number>('');
  const [subjectId2, setSubjectId2] = useState<string | number>('');
  const [subjectId3, setSubjectId3] = useState<string | number>('');
  const [subjectId4, setSubjectId4] = useState<string | number>('');
  const [subjectId5, setSubjectId5] = useState<string | number>('');
  const [eventName, seteventname] = useState<string | number>('');
  const [activityname1, setactivityname1] = useState<string | number>('');
  const [activityname2, setactivityname2] = useState<string | number>('');
  const [activityname3, setactivityname3] = useState<string | number>('');
  const [activityname4, setactivityname4] = useState<string | number>('');
  const [activityname5, setactivityname5] = useState<string | number>('');
  const [loading, setloading] = useState(false);
  const [type, setType] = useState<string | number>('period');
  const [timeTableType, settimeTableType] = useState<string | number>('period');
  const [activity1, setactivity1] = useState(false);
  const [activity2, setactivity2] = useState(false);
  const [activity3, setactivity3] = useState(false);
  const [activity4, setactivity4] = useState(false);
  const [activity5, setactivity5] = useState(false);
  // const [typeDropdown, settypeDropdown] = useState(false);

  const modalActivityHandler = (type?: string) => {
    setisOpenActivity(!isOpenActivity);
    if (type && type) {
      settimeTableType(type);
    }
  };

  const handleCreateTestTimetable = useCreateTestTimeTable();

  const SubmitHandler = async () => {
    const data: dataType = {
      sessionId: 8,
      institutionType: 'ECCDE',
      classId: 2,
      term: currentTermId,
      type,
      periods: [
        {
          day: 'Monday',
          subject: activity1 ? activityname1 : subjectId1,
          isEvent: activity1,
        },
        {
          day: 'Tuesday',
          subject: activity2 ? activityname2 : subjectId2,
          isEvent: activity2,
        },
        {
          day: 'Wednesday',
          subject: activity3 ? activityname3 : subjectId3,
          isEvent: activity3,
        },
        {
          day: 'Thursday',
          subject: activity4 ? activityname4 : subjectId4,
          isEvent: activity4,
        },
        {
          day: 'Friday',
          subject: activity5 ? activityname5 : subjectId5,
          isEvent: activity5,
        },
      ],
      timeTableType,
      startTime,
      endTime,
      eventName,
    };

    if (type === 'event') {
      delete data.periods;
    } else {
      delete data.eventName;
    }

    try {
      setloading(true);
      const response = await handleCreateTestTimetable.mutateAsync(data);
      if (response) {
        toast.success('Timetable updated successfully');
        setloading(false);
        // settypeDropdown(false);
        fetchTestTimeTable();
        modalActivityHandler();

        // location.reload();
      }
    } catch (error) {
      toast.error(getErrMsg(error));
    }
  };

  useEffect(() => {
    fetchTestTimeTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='bg-white p-4'>
      {isOpenActivity && (
        <AddActivityName
          onClickHandler={modalActivityHandler}
          setStartDate={setstartDate}
          setEndDate={setendDate}
          setSubjectId1={setSubjectId1}
          setSubjectId2={setSubjectId2}
          setSubjectId3={setSubjectId3}
          setSubjectId4={setSubjectId4}
          setSubjectId5={setSubjectId5}
          seteventname={seteventname}
          setType={setType}
          type={type}
          loading={loading}
          SubmitHandler={SubmitHandler}
          setactivity1={setactivity1}
          activity1={activity1}
          setactivity2={setactivity2}
          activity2={activity2}
          setactivity3={setactivity3}
          activity3={activity3}
          setactivity4={setactivity4}
          activity4={activity4}
          setactivity5={setactivity5}
          activity5={activity5}
          setactivityname1={setactivityname1}
          activityname1={activityname1}
          setactivityname2={setactivityname2}
          activityname2={activityname2}
          setactivityname3={setactivityname3}
          activityname3={activityname3}
          setactivityname4={setactivityname4}
          activityname4={activityname4}
          setactivityname5={setactivityname5}
          activityname5={activityname5}
        />
      )}
      {/* <div className='flex justify-end relative'>
        <button
          onClick={() => {
            settypeDropdown(!typeDropdown);
          }}
          className='p-2 border-2 border-primary text-center  text-primary rounded-md'
        >
          <p>Add Test/Exam Schedule</p>
        </button>
        {typeDropdown && (
          <div className='absolute top-10 shadow-lg bg-white rounded-md w-[160px]'>
            <button
              className='p-4'
              onClick={() => modalActivityHandler('EXAM')}
            >
              Exam Timetable
            </button>
            <button
              className='p-4'
              onClick={() => modalActivityHandler('TEST')}
            >
              Test Timetable
            </button>
          </div>
        )}
      </div> */}
      <div className='bg-[#F4F9FF] py-6 mt-5 flex items-center justify-between font-medium rounded-md px-4'>
        <h1 className='text-sm text-[#5A5A5A]'>
          {schoolType} - Exam/Test Timetable
        </h1>
        <div>
          <Time className='h-14 w-14' />
        </div>
      </div>

      {/* <div className='mt-8  p-2 rounded-md'>
        <div className='flex w-full mr-10 mb-4'>
          <div className='w-[150px] font-medium rounded-l p-3 text-base  border bg-white text-gray-500'>
            Date
          </div>
          <div className='w-full grid grid-cols-5 text-base  border font-medium text-center bg-white'>
            <div className='p-3 border-r'>Monday</div>
            <div className='p-3 border-r'>Tuesday</div>
            <div className='p-3 border-r'>Wednesday</div>
            <div className='p-3 border-r'>Thursday</div>
            <div className='p-3 border-r'>Friday</div>
          </div>
          <div className='w-[40px] pl-4 flex flex-col space-y-2 text-[8px] '></div>
        </div>

        <div>
          {schedule.reverse().map((item: any, id: number) => (
            <div key={id}>
              {item.type === 'event' ? (
                <div className='flex w-full mt-2 items-center'>
                  <div className='w-[150px] text-base bg-white font-medium px-3 py-5  border'>
                    {item.startTime} - {item.endTime}
                  </div>
                  <div className='w-full border p-5 text-center'>
                    <p className='font-medium text-base'> {item.eventName} </p>
                  </div>
                  <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '>
                    <div className='text-green-600'>Edit</div>
                    <div className='text-red-600'>Delete</div>
                  </div>
                </div>
              ) : (
                <div className='flex w-full mt-2 items-center'>
                  <div className='w-[150px] bg-white font-medium px-3 py-5  border'>
                    {item.startTime} - {item.endTime}
                  </div>

                  <div className='w-full grid grid-cols-5 text-gray-200  text-base border font-medium text-center'>
                    <div className='px-3 py-5 bg-[#FFF2F0] text-[#FB6340]'>
                      {item?.periods ? item?.periods[0].subject : 'Null'}
                    </div>
                    <div className='px-3 py-5 bg-[#FDE8FF] text-[#ED1CFF]'>
                      {item?.periods ? item?.periods[1].subject : 'Null'}
                    </div>
                    <div className='px-3 py-5 bg-[#FFF3E2] text-[#FF9F1C]'>
                      {item?.periods ? item?.periods[2].subject : 'Null'}
                    </div>
                    <div className='px-3 py-5 bg-[#F4FFE6] text-[#60AC00]'>
                      {item?.periods ? item?.periods[3].subject : 'Null'}
                    </div>
                    <div className='px-3 py-5 bg-[#FFFFEB] text-[#CDCD04]'>
                      {item?.periods ? item?.periods[4].subject : 'Null'}
                    </div>
                  </div>
                  <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '>
                    <div className='text-green-600'>Edit</div>
                    <div className='text-red-600'>Delete</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div> */}

      <div className='flex flex-col space -y-6'>
        {!showTimeTable ? (
          <div>
            {/* {schoolType?.toLowerCase()?.includes('eccde') && (
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
                        <CurriculumCard
                          name='Exam Timetable'
                          count={100}
                          variant={generateVariant(0)}
                          onClick={() => {
                            HandleTimeTable({
                              classId: v.id,
                              termId: currentTermId,
                              type: 'EXAM',
                            });
                          }}
                        />
                        <CurriculumCard
                          name='Test Timetable'
                          count={100}
                          variant={generateVariant(1)}
                          onClick={() => {
                            HandleTimeTable({
                              classId: v.id,
                              termId: currentTermId,
                              type: 'TEST',
                            });
                          }}
                        />
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
                                type: 'TEST',
                              });
                            }}
                          />
                        ))}
                      </div>
                    </TaskAccordion>
                  );
                })}
              </div>
            )} */}

            {classList.length > 0 ? (
              <div className='mt-6'>
                {classList.map((v: any, i: number) => {
                  return (
                    <TaskAccordion
                      length={1}
                      lesson={false}
                      taskName={`${v.class.name} ${v.arm}`}
                      key={i}
                    >
                      <div className='flex flex-wrap mt-4 gap-[27px]'>
                        <CurriculumCard
                          name='Exam Timetable'
                          count={100}
                          variant={generateVariant(0)}
                          onClick={() => {
                            HandleTimeTable({
                              classId: v.id,
                              termId: currentTermId,
                              type: 'EXAM',
                            });
                          }}
                        />
                        <CurriculumCard
                          name='Test Timetable'
                          count={100}
                          variant={generateVariant(1)}
                          onClick={() => {
                            HandleTimeTable({
                              classId: v.id,
                              termId: currentTermId,
                              type: 'TEST',
                            });
                          }}
                        />
                      </div>
                    </TaskAccordion>
                  );
                })}
              </div>
            ) : (
              <div className='py-10 text-center'>No class arm found</div>
            )}
          </div>
        ) : (
          <div className='mt-2'>
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
              isClassTimeTable={false}
              examSchedule={ExamOrTest === 'EXAM' ? schedule : testTable}
              timeTableType={ExamOrTest}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default AcademicCalendar;
