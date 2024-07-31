'use client';

import PrintedReportCard from '@/components/print/ReportCard';
import { useGetStudentList } from '@/server/government/student';
import { useGetStudentReportCard } from '@/server/student';
import { Term } from '@/types/classes-and-subjects';
import { Student } from '@/types/institute';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const ViewReportCard = () => {
  const params = useSearchParams();
  const termId = params?.get('termId') ?? '';
  const studentId = params?.get('studentId') ?? '';
  const sessionId = params?.get('sessionId') ?? '';
  const classArmId = params?.get('classArmId') ?? '';
  const { data } = useGetStudentList({
    id: studentId,
  });

  const { data: reportCard } = useGetStudentReportCard({
    termId,
    studentId,
    sessionId,
    classArmId,
  });

  return (
    <PrintedReportCard
      domains={reportCard?.domains}
      subjectResults={reportCard?.subjectResults}
      agregates={reportCard?.agregates}
      attendanceReport={reportCard?.attendanceReport}
      termInfo={reportCard?.term as Term}
      adminSignature={reportCard?.adminSignature ?? ''}
      studentData={data as Student}
    />
  );
};

export default ViewReportCard;
