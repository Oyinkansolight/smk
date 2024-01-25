'use client';

import PrintedReportCard from '@/components/print/ReportCard';
import { useGetStudentReportCard } from '@/server/student';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const ViewReportCard = () => {
  const params = useSearchParams();
  const termId = params?.get('termId') ?? '';
  const studentId = params?.get('studentId') ?? '';
  const sessionId = params?.get('sessionId') ?? '';
  const classArmId = params?.get('classArmId') ?? '';

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
    />
  );
};

export default ViewReportCard;
