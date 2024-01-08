import TeacherAttendanceListItem from '@/components/views/teacher/TeacherAttendanceListItem';
import { getFromLocalStorage, getFromSessionStorage } from '@/lib/helper';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import { useGetLessonAttendance } from '@/server/government/classes_and_subjects';
import {
  useTakeAttendance,
  useUpdateSubjectAttendance,
} from '@/server/government/student';
import { useGetClassArmStudents } from '@/server/institution/class-arm';
import { useGetPeriodById } from '@/server/institution/period';
import { Institution } from '@/types/institute';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function TakeAttendanceView() {
  const sessionId: string = getFromLocalStorage('currentSessionId') ?? '';
  const term: any = getFromSessionStorage('currentTerm');
  const params = useSearchParams();
  const id = params?.get('id');
  const classArmId = params?.get('classArmId');
  const { data: profile } = useGetProfile();
  const { data: period } = useGetPeriodById(id ? id : undefined);
  const { mutateAsync: takeAttendance } = useTakeAttendance();
  const { mutateAsync: updateAttendance } = useUpdateSubjectAttendance();
  const institutionString = getFromSessionStorage('institution');
  const institution = institutionString
    ? (JSON.parse(institutionString) as Institution)
    : undefined;

  const { data: students, isLoading: studentsLoading } = useGetClassArmStudents(
    {
      classArmId: classArmId,
    }
  );

  const { data: attendance, refetch: refetchAttendanceRecord } =
    useGetLessonAttendance({ periodId: id });

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
        {studentsLoading || students ? (
          students
            ?.sort((a, b) => a.lastName.localeCompare(b.lastName))
            .map((v, i) => {
              const attendanceStatus = attendance?.find(
                (stAtt) => stAtt.student.id === (v.id as unknown as string)
              );

              return (
                <TeacherAttendanceListItem
                  index={i}
                  key={v.id}
                  status={attendanceStatus?.status}
                  name={`${v?.firstName} ${v?.lastName}`}
                  onTakeAttendance={async (status) => {
                    try {
                      await takeAttendance({
                        classArmId: classArmId,
                        institutionId: institution?.id,
                        periodId: id,
                        sessionId,
                        status,
                        studentId: v.id,
                        termId: JSON.parse(term)?.id,
                      });
                      toast.success('Attendance Taken');
                      refetchAttendanceRecord();
                    } catch (error) {
                      toast.error(getErrMsg(error));
                    }
                  }}
                  onUpdateAttendance={async (status) => {
                    try {
                      await updateAttendance({
                        status,
                        attendenceId: attendanceStatus?.id,
                      });
                      toast.success('Attendance Updated');
                      refetchAttendanceRecord();
                    } catch (error) {
                      toast.error(getErrMsg(error));
                    }
                  }}
                />
              );
            })
        ) : (
          <div className='text-center'>
            No students have been added to this class arm
          </div>
        )}
      </div>
    </div>
  );
}
