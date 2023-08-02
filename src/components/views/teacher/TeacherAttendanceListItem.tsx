import clsxm from '@/lib/clsxm';
import { useEffect, useState } from 'react';

export default function TeacherAttendanceListItem({
  index,
  name,
  onTakeAttendance,
  status,
}: {
  index: number;
  name: string;
  status?: 'ABSENT' | 'PRESENT';
  onTakeAttendance?: (status: 'ABSENT' | 'PRESENT') => void;
}) {
  const [isPresent, setIsPresent] = useState<'present' | 'absent' | null>(null);

  useEffect(() => {
    if (status) {
      setIsPresent(status === 'ABSENT' ? 'absent' : 'present');
    }
  }, [status]);

  return (
    <div
      className={clsxm(
        'flex py-2 px-6 rounded-md border bg-white items-center gap-8',
        isPresent === 'present' && 'border-green-500',
        isPresent === 'absent' && 'border-red-500'
      )}
    >
      <div className='font-bold text-lg'>{index + 1}</div>
      <div className='h-16 w-16 rounded-full bg-gray-300'></div>
      <div className='font-bold'>{name}</div>
      <div className='flex-1' />
      {(!isPresent || (isPresent && isPresent === 'present')) && (
        <button
          onClick={() => {
            setIsPresent('present');
            onTakeAttendance && onTakeAttendance('PRESENT');
          }}
          className='py-3 px-12 rounded-sm bg-green-500 font-bold text-white'
        >
          Present
        </button>
      )}
      {(!isPresent || (isPresent && isPresent === 'absent')) && (
        <button
          className='py-3 px-12 rounded-sm bg-red-500 font-bold text-white'
          onClick={() => {
            setIsPresent('absent');
            onTakeAttendance && onTakeAttendance('ABSENT');
          }}
        >
          Absent
        </button>
      )}
      <div
        className={clsxm(
          'cursor-pointer px-5 text-lg',
          !isPresent && 'opacity-0 cursor-default'
        )}
        onClick={() => setIsPresent(null)}
      >
        Edit
      </div>
    </div>
  );
}
