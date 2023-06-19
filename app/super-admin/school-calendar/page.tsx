'use client';

import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import TaskListView from '@/components/views/super-admin/ManageClass/TaskListView';
import ClassCalendarView from '@/components/views/super-admin/SingleSchoolCalendar/ClassCalendarView';
import ExamTimeTable from '@/components/views/super-admin/SingleSchoolCalendar/ExamTimetable';
import Info from '@/components/views/super-admin/SingleSchoolCalendar/info';
import request from '@/server';
import { useGetClassesList } from '@/server/institution';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';

const Index = () => {
  const queryString = useSearchParams();
  const [tabIdx, setTabIdx] = useState(0);
  const [session, setsession] = useState<string | null>('');
  const [sessionname, setsessionname] = useState<string | null>('');
  const [schoolType, setschoolType] = useState<string | null>('');
  const [sessionterms, setsessionterms] = useState([]);
  function Fetchterms(currrentsession: string | null) {
    request
      .get(
        `/v1/government/terms/session-terms?sessionId=${Number(
          currrentsession
        )}`
      )
      .then((v) => {
        const data = v.data.data.data;
        console.log(data);
        setsessionterms(data.data || []);
      });
  }
  const allclasses = useGetClassesList();

  const { data: classData } = allclasses;

  useEffect(() => {
    // Create a URLSearchParams object with the query string
    // Extract the values of session and term parameters
    const currrentsession = queryString && queryString.get('session');
    Fetchterms(currrentsession);
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
                label: 'Test/Exam Schedule',
              },
            ]}
          />

          <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

          <div className='h-full border-b-[2px] border-[#EDEFF2]'>
            <SearchInput placeholder='Search Tasks' className='pt-[14px]' />
          </div>
        </div>

        {tabIdx === 0 && <ClassCalendarView />}
        {tabIdx === 1 && (
          <TaskListView
            schoolType={schoolType}
            academicyear={schoolType}
            classList={classData?.data || []}
            sessionterms={sessionterms || []}
            sessionId={session}
          />
        )}
        {tabIdx === 2 && (
          <ExamTimeTable
            schoolType={schoolType}
            academicyear={schoolType}
            classList={classData?.data || []}
            sessionterms={sessionterms || []}
            sessionId={session}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
