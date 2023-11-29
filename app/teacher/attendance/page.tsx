'use client';

import EmptyView from '@/components/misc/EmptyView';
import TeacherAttendanceListItem from '@/components/views/teacher/TeacherAttendanceListItem';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import {
  useGetClassArmAttendance,
  useTakeClassArmAttendance,
  useUpdateClassArmAttendance,
} from '@/server/institution/class-arm';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { MdArrowBackIos } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function Page() {
  const { data: profileData } = useGetProfile();
  const { data: attendance } = useGetClassArmAttendance({
    classArmId: profileData?.userInfo?.staff?.managedClassArm?.id,
  });
  const { mutateAsync: takeAttendance } = useTakeClassArmAttendance();
  const { mutateAsync: updateAttendance } = useUpdateClassArmAttendance();
  const router = useRouter();

  return (
    <div className='flex flex-col layout'>
      <div
        onClick={() => router.back()}
        className='cursor-pointer flex items-center mt-6'
      >
        <MdArrowBackIos className='text-[#42BBFF]' />
        <div>Back</div>
      </div>
      <div className='font-bold text-3xl mt-6 mb-12'>Class Attendance</div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-[10px] font-bold text-xl leading-6 text-[#746D69] bg-white rounded-xl py-[18px] px-[50px]'>
          <div>
            Class: {profileData?.userInfo?.staff?.managedClassArm?.class.name}{' '}
            {profileData?.userInfo?.staff?.managedClassArm?.arm}
          </div>
          <div>Date: {moment().format('MMMM DD')}</div>
          <div>Time: {moment().format('LT')}</div>
        </div>

        <div className='bg-white rounded-xl py-3 md:py-6 lg:py-[26px] px-6 md:px-10 lg:px-[50px]'>
          {attendance && attendance.length > 0 && (
            <div className='mb-[18px] text-xl font-semibold text-[#262626]'>
              List of students
            </div>
          )}
          <div className='flex flex-col gap-4'>
            {attendance && attendance.length > 0 ? (
              attendance
                .sort((a, b) => a.lastName.localeCompare(b.lastName))
                .map((student, index) => {
                  const userName = student.lastName + ', ' + student.firstName;
                  const studentId = student.id;
                  return (
                    <TeacherAttendanceListItem
                      key={studentId}
                      index={index}
                      status={student?.attendanceToday?.status}
                      name={userName}
                      onTakeAttendance={async (status) => {
                        try {
                          if (!student?.attendanceToday?.status) {
                            await takeAttendance({
                              status,
                              studentId: studentId as unknown as string,
                            });
                          } else {
                            await updateAttendance({
                              status,
                              classArmAttendanceId:
                                student?.attendanceToday?.id,
                            });
                          }
                          toast.success('Attendance Taken');
                        } catch (error) {
                          toast.error(getErrMsg(error));
                        }
                      }}
                    />
                  );
                })
            ) : (
              <EmptyView label='No student has been assigned to your class' />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
