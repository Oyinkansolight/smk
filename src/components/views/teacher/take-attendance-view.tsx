import TeacherAttendanceListItem from '@/components/views/teacher/TeacherAttendanceListItem';
import { useGetPeriodById } from '@/server/institution/period';
import { useSearchParams } from 'next/navigation';

export default function TakeAttendanceView() {
  const Names = [
    'Ighosa Ahmed',
    'David Keyan',
    'Victoria Alle',
    'Sharon Orobosa',
  ];
  const params = useSearchParams();
  const id = params?.get('id');
  const { data: period } = useGetPeriodById(id ? id : undefined);


  return (
    <div className='flex flex-col gap-10'>
      <div className='font-bold text-3xl'>Take Subject Attendance</div>
      <div className='text-bold text-xl'>
        <div>Subject: {period?.subject?.name}</div>
        <div>Date: {period?.day}</div>
        <div>
          Time: {period?.startTime} - {period?.endTime}
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='font-bold'>List of students</div>
        {Names.map((v, i) => (
          <TeacherAttendanceListItem key={i} index={i} name={v} />
        ))}
      </div>
    </div>
  );
}