'use client';

import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import ClassCalendarContent from '@/components/views/super-admin/SingleSchoolCalendar/ClassCalendarContent';
import ClassCalendarView from '@/components/views/super-admin/SingleSchoolCalendar/ClassCalendarView';
import TimeTable from '@/components/views/super-admin/SingleSchoolCalendar/ExamTimetable';
import Info from '@/components/views/super-admin/SingleSchoolCalendar/info';
import request from '@/server';
import { useGetClassesList } from '@/server/institution';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';

const SingleStudentDashboard = () => {
  const queryString = useSearchParams();
  const [tabIdx, setTabIdx] = useState(0);
  const [session, setsession] = useState<string | null>('');
  const [sessionname, setsessionname] = useState<string | null>('');
  const [schoolType, setschoolType] = useState<string | null>('');
  const [sessionterms, setsessionterms] = useState([]);

  const allclasses = useGetClassesList();

  const { data: classData } = allclasses;

  function Fetchterms() {
    request
      .get(`/v1/government/terms/session-terms?sessionId=${Number(session)}`)
      .then((v) => {
        const data = v.data.data.data;
        setsessionterms(data.data || []);
      });
  }
  // const allclasses = useGetClassesList();

  // const { data: classData } = allclasses;

  useEffect(() => {
    Fetchterms();
    // Create a URLSearchParams object with the query string

    // Extract the values of session and term parameters
    const currrentsession = queryString && queryString.get('session');
    const sn = queryString && queryString.get('name');
    const st = queryString && queryString.get('schooltype');

    setschoolType(st);
    setsession(currrentsession);
    setsessionname(sn);

    // // let termname;
    // if (currrentterm === '1') {
    //   settermname('First Term');
    // } else if (currrentterm === '2') {
    //   settermname('Second Term');
    // } else {
    //   settermname('Third Term');
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex'>
      <Info
        session={session}
        sessionname={sessionname}
        schoolType={schoolType}
      />
      <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
        <div className='flex w-full items-center justify-between'>
          <TabBar
            variant='primary'
            selected={tabIdx}
            onSelect={(i) => setTabIdx(i)}
            items={[
              {
                icon: <RiDashboardFill className='h-5 w-5' />,
                label: 'Academic Calendar',
              },
              {
                icon: <BiListCheck className='h-5 w-5' />,
                label: 'Class/Lecture Timetable',
              },
              {
                icon: <RiCalendar2Fill className='h-5 w-5' />,
                label: 'Exam Timetable',
              },
            ]}
          />

          <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

          <div className='h-full border-b-[2px] border-[#EDEFF2]'>
            <SearchInput placeholder='Search Tasks' className='pt-[14px]' />
          </div>
        </div>

        {tabIdx === 0 && <ClassCalendarContent />}
        {tabIdx === 1 && (
          <TimeTable
            schoolType={schoolType}
            academicyear={schoolType}
            classList={classData?.data || []}
            sessionterms={sessionterms || []}
            sessionId={session}
          />
        )}
        {tabIdx === 2 && <ClassCalendarView />}
      </div>
    </div>
  );
};

export default SingleStudentDashboard;
