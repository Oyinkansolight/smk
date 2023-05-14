'use client';

import TeacherFullDashboard from '@/components/views/teacher/TeacherFullDashboard';
import { useGetStaffDashboardOverview } from '@/server/dashboard';

const Page = () => {
  const { data } = useGetStaffDashboardOverview();
  return <TeacherFullDashboard overviewData={data} />;
};

export default Page;
