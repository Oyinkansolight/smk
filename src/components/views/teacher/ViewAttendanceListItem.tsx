import clsxm from '@/lib/clsxm';
import { useGetProfile } from '@/server/auth';
import { useTakeAttendance } from '@/server/government/student';
import { useGetSessionTerms } from '@/server/government/terms';
import { Institution } from '@/types/institute';
import { toast } from 'react-toastify';
import { useSessionStorage } from 'usehooks-ts';


export default function ViewAttendanceListItem({
  index,
  name,
  studentId,
}: {
  index: number;
  name: string;
  studentId?: string;
}) {
  const { mutateAsync } = useTakeAttendance();
  const [institution] = useSessionStorage('institution', {} as Institution);
  const { data: profile } = useGetProfile();
  const { data: terms } = useGetSessionTerms({
    sessionId: profile?.currentSession?.id,
  });
  // const { data: student } = useGetStudentById({ id: studentId });
  const handlePresent = async (status: 'PRESENT' | 'ABSENT' | 'LATE') => {
    toast.info(`Marking "${name}" as ${status.toLowerCase()}...`);
    try {
      await mutateAsync({
        studentId,
        status: status,
        periodId: 1,
        institutionId: institution.id,
        classId: 1,
        sessionId: profile?.currentSession?.id,
        termId: (terms?.data ?? [])[0].id,
      });

      toast.success(`Student "${name}" marked as ${status.toLowerCase()}`);
    } catch (error) {
      toast.error(`Error marking "${name}" as ${status.toLowerCase()}`);
    }
  };

  return (
    <div
      className={clsxm(
        'flex flex-col lg:flex-row py-2 px-6 rounded-md border bg-white items-center gap-8'
      )}
    >
      <div className='font-bold text-lg'>{index}</div>
      <div className='min-w-[64px] h-16 w-16 rounded-full bg-gray-300'></div>
      <div className='font-bold'>{name}</div>
      <div className='flex-1' />
      <button
        onClick={() => handlePresent('PRESENT')}
        className='w-full rounded-sm bg-green-500 font-bold text-white min-w-[60px] max-w-[131px] justify-center h-10'
      >
        Present
      </button>
      <button
        onClick={() => handlePresent('ABSENT')}
        className='w-full rounded-sm bg-red-500 font-bold text-white min-w-[60px] max-w-[131px] justify-center h-10'
      >
        Absent
      </button>
      <button
        onClick={() => handlePresent('LATE')}
        className='w-full rounded-sm bg-[#E5A500] font-bold text-white min-w-[60px] max-w-[131px] justify-center h-10'
      >
        Late
      </button>
    </div>
  );
}