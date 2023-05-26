import TeacherAttendanceListItem from '@/components/views/teacher/TeacherAttendanceListItem';
import ViewAttendanceListItem from '@/components/views/teacher/ViewAttendanceListItem';

export default function Page() {
  return (
    <div className='flex flex-col layout'>
      <div className='font-bold text-3xl my-12'>Class Attendance</div>
      <div className='bg-white rounded-xl p-8'>
        <div className='text-bold text-xl'>
          <div>Subject: Mathematics</div>
          <div>Date: October 16</div>
          <div>Time: 12:00 pm - 1:00 pm</div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='font-bold my-2 text-lg'>List of students</div>
          {Array(10)
            .fill(0)
            .map((v, i) => (
              <ViewAttendanceListItem key={i} index={i} name='Ighosa Ahmed' />
            ))}
        </div>
      </div>
    </div>
  );
}
