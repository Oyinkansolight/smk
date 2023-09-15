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
import { useState } from 'react';
import { toast } from 'react-toastify';
import Time from '~/svg/time.svg';


interface dataType {
  sessionId: string | null;
  institutionType: string;
  classId: string;
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
  classId: string;
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
  academicyear,
}: propType) => {
  const [showTimeTable, setShowTimeTable] = useState(false);
  const [classId, setclassId] = useState<string>('');
  const [termId, settermId] = useState<any>(null);
  const [ExamOrTest, setExamOrTest] = useState('');
  const [testTable, setTestTable] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentClassName, setClassName] = useState<string>('');

  const getClassesByInstitution = classList.filter(
    (item: any) =>
      typeof item.institutionType === 'string' &&
      item.institutionType.toLowerCase().includes(academicyear?.toLowerCase())
  );
  function customSort(a: any, b: any) {
    const aIsJSS = a.name.startsWith('JSS');
    const bIsJSS = b.name.startsWith('JSS');

    if (aIsJSS && !bIsJSS) {
      return -1;
    } else if (!aIsJSS && bIsJSS) {
      return 1;
    } else {
      // If both elements are JSS or both are SSS, sort them alphabetically.
      return a.name.localeCompare(b.name);
    }
  }

  const sortedSchools = getClassesByInstitution
    ? getClassesByInstitution.sort(customSort)
    : [];
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

  const fetchTestTimeTable = async (classId: string, type: string | number) => {
    setIsLoading(true);
    await request
      .get(
        `/v1/government/time-table/time-table-by-type?sessionId=${sessionId}&classId=${classId}&term=${currentTermId}&type=${type}&limit=10000`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setIsLoading(false);

        type == 'TEST'
          ? setTestTable(res.data.data.data)
          : setschedule(res.data.data.data);
      })
      .catch((err) => {
        getErrMsg(err);
      });
    // await request
    //   .get(
    //     `/v1/government/time-table/time-table-by-type?sessionId=${sessionId}&classId=${classId}&term=${currentTermId}&type=TEST&limit=10000`,
    //     {
    //       withCredentials: true,
    //     }
    //   )
    //   .then((res) => {
    //     setTestTable(res.data.data.data);
    //   });
  };

  async function HandleTimeTable({ classId, termId, type }: timetableArg) {
    setclassId(classId);
    settermId(termId);
    setExamOrTest(type);
    await fetchTestTimeTable(classId, type);
    setShowTimeTable(true);
  }
  const [schedule, setschedule] = useState<dataType[]>([]);
  const [isOpenActivity, setisOpenActivity] = useState(false);
  const [startTime, setStartTime] = useState<string | number>('');
  const [endTime, setEndTime] = useState<string | number>('');
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
      sessionId,
      institutionType: 'ECCDE',
      classId,
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
      if (!data.startTime || data.startTime === '') {
        toast.error('Start Time is invalid or missing');
        return;
      }
      if (!data.endTime || data.endTime === '') {
        toast.error('End time is invalid or missing');
        return;
      }
      if (data.periods && type === 'period') {
        for (const period of data.periods) {
          // Check if subject is a positive integer
          if (!period.subject) {
            toast.error('one or more subject in periods is invalid or missing');
            return;
          }
        }
      }
      // If isEvent is true, check for eventName
      if (type === 'event' && !data.eventName) {
        toast.error('Event Name is invalid or missing');
        return;
      }

      setloading(true);
      const response = await handleCreateTestTimetable.mutateAsync(data);
      if (response) {
        toast.success('Timetable updated successfully');
        setloading(false);
        // settypeDropdown(false);
        fetchTestTimeTable(classId, type);
        modalActivityHandler();

        // location.reload();
      }
    } catch (error) {
      toast.error(getErrMsg(error));
    }
  };

  // useEffect(() => {
  //   if (classId) {
  //     fetchTestTimeTable();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [classId]);

  return (
    <section className='bg-white p-4'>
      {isOpenActivity && (
        <AddActivityName
          onClickHandler={modalActivityHandler}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
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

      <div className='bg-[#F4F9FF] py-6 mt-5 flex items-center justify-between font-medium rounded-md px-4'>
        <h1 className='text-sm text-[#5A5A5A]'>
          {schoolType} - Exam/Test Timetable
        </h1>
        <div>
          <Time className='h-14 w-14' />
        </div>
      </div>

      <div className='flex flex-col space -y-6'>
        {!showTimeTable ? (
          <div>
            {sortedSchools.length > 0 ? (
              <div className='mt-6'>
                {sortedSchools.map((v: any, i: number) => {
                  return (
                    <TaskAccordion
                      length={1}
                      lesson={false}
                      taskName={`${v.name}`}
                      key={i}
                    >
                      <div>
                        <div className='flex flex-wrap mt-4 gap-[27px]'>
                          <CurriculumCard
                            name='Exam Timetable'
                            count={100}
                            variant={generateVariant(0)}
                            onClick={() => {
                              setClassName(v.name);
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
                              setClassName(v.name);
                              HandleTimeTable({
                                classId: v.id,
                                termId: currentTermId,
                                type: 'TEST',
                              });
                            }}
                          />
                        </div>
                        {isLoading && (
                          <div className='text-center pt-2 pb-4 '>
                            {' '}
                            Opening....{' '}
                          </div>
                        )}
                      </div>
                    </TaskAccordion>
                  );
                })}
              </div>
            ) : (
              <div className='py-10 text-center'>No class found</div>
            )}
          </div>
        ) : (
          <div className='mt-2'>
            <div className='flex justify-between items-center'>
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
              <h3 className='font-medium text-base'>{currentClassName} </h3>
            </div>

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
