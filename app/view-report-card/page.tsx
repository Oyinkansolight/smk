'use client';

import React from 'react'
import { useSearchParams } from 'next/navigation';
import { useGetStudentReportCard } from '@/server/student';
import PrintedReportCard from '@/components/print/ReportCard'


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
    classArmId
  });

  return (
    <PrintedReportCard data={reportCard} />
  )
}

export default ViewReportCard