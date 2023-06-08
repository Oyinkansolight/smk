import clsxm from '@/lib/clsxm';
import { useTakeAttendance } from '@/server/teacher';
import { toast } from 'react-toastify';

export default function ViewAttendanceListItem({
  index,
  name,
}: {
  index: number;
  name: string;
}) {
  const { mutateAsync } = useTakeAttendance();

  const handlePresent = async () => {
    toast.info(`Marking "${name}" as present...`);

    try {
      await mutateAsync({
        studentId: index,
        status: 'PRESENT',
        lessonId: 1,
        institutionId: 1,
        classId: 1,
        sessionId: 1,
        term: 1
      });

      toast.success(`Student "${name}" marked as present`);
    } catch (error) {
      toast.error(`Error marking "${name}" as present`);
    }
  };

  const handleAbsent = async () => {
    toast.info(`Marking "${name}" as absent...`);

    try {
      await mutateAsync({
        studentId: index,
        status: 'ABSENT',
        lessonId: 1,
        institutionId: 1,
        classId: 1,
        sessionId: 1,
        term: 1
      });

      toast.success(`Student "${name}" marked as absent`);
    } catch (error) {
      toast.error(`Error marking "${name}" as absent`);
    }
  };

  const handleLate = async () => {
    toast.info(`Marking "${name}" as late...`);

    try {
      await mutateAsync({
        studentId: index,
        status: 'LATE',
        lessonId: 1,
        institutionId: 1,
        classId: 1,
        sessionId: 1,
        term: 1
      });
      toast.success(`Student "${name}" marked as late`);
    } catch (error) {
      toast.error(`Error marking "${name}" as late`);
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
      <button onClick={handlePresent} className='w-full rounded-sm bg-green-500 font-bold text-white min-w-[60px] max-w-[131px] justify-center h-10'>
        Present
      </button>
      <button onClick={handleAbsent} className='w-full rounded-sm bg-red-500 font-bold text-white min-w-[60px] max-w-[131px] justify-center h-10'>
        Absent
      </button>
      <button onClick={handleLate} className='w-full rounded-sm bg-[#E5A500] font-bold text-white min-w-[60px] max-w-[131px] justify-center h-10'>
        Late
      </button>
    </div>
  );
}
