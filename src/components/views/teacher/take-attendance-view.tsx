import TeacherAttendanceListItem from '@/components/views/teacher/TeacherAttendanceListItem';
import { getFromSessionStorage } from '@/lib/helper';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import {
  useGetLessonAttendance,
  useGetStudentsInTeacherClass,
} from '@/server/government/classes_and_subjects';
import { useTakeAttendance } from '@/server/government/student';
import { useGetSessionTerms } from '@/server/government/terms';
import { useGetAllClassArms } from '@/server/institution/class-arm';
import { useGetPeriodById } from '@/server/institution/period';
import { Institution } from '@/types/institute';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function TakeAttendanceView() {
  const params = useSearchParams();
  const id = params?.get('id');
  const { data: profile } = useGetProfile();
  const { data: period } = useGetPeriodById(id ? id : undefined);
  const { mutateAsync: takeAttendance } = useTakeAttendance();
  const institutionString = getFromSessionStorage('institution');
  const institution = institutionString
    ? (JSON.parse(institutionString) as Institution)
    : undefined;

  const { data: arms } = useGetAllClassArms({
    classId: period?.class?.id,
    institutionId: institution?.id,
    sessionId: profile?.currentSession?.id,
  });
  const arm = (arms ?? [])[0];
  const { data: students, isLoading: studentsLoading } =
    useGetStudentsInTeacherClass({
      classArmId: arm?.id,
      institutionId: institution?.id,
    });
  const { data: attendance } = useGetLessonAttendance({ periodId: id });

  const { data: terms } = useGetSessionTerms({
    sessionId: profile?.currentSession?.id,
  });

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
        {studentsLoading ||
          students?.map((v, i) => (
            <TeacherAttendanceListItem
              key={i}
              index={i}
              status={
                attendance?.find(
                  (stAtt) => stAtt.student.id === (v.id as unknown as string)
                )?.status
              }
              name={`${v?.firstName} ${v?.lastName}`}
              onTakeAttendance={async (status) => {
                try {
                  await takeAttendance({
                    classArmId: arm?.id,
                    institutionId: institution?.id,
                    periodId: id,
                    sessionId: profile?.currentSession?.id,
                    status,
                    studentId: v.id,
                    termId: (terms?.data ?? [])[0].id,
                  });
                  toast.success('Attendance Taken');
                } catch (error) {
                  toast.error(getErrMsg(error));
                }
              }}
            />
          ))}
      </div>
    </div>
  );
}