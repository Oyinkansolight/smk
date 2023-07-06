import TeacherAttendanceListItem from '@/components/views/teacher/TeacherAttendanceListItem';

export default function TakeAttendanceView() {
  const Names = [
    'Ighosa Ahmed',
    'David Keyan',
    'Victoria Alle',
    'Sharon Orobosa',
  ];

  return (
    <div className='flex flex-col gap-10'>
      <div className='font-bold text-3xl'>Take Subject Attendance</div>
      <div className='text-bold text-xl'>
        <div>Subject: Mathematics</div>
        <div>Date: October 16</div>
        <div>Time: 12:00 pm - 1:00 pm</div>
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
