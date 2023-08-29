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
  status?: 'ABSENT' | 'PRESENT' | 'LATE' | undefined;
  onTakeAttendance?: (status: 'ABSENT' | 'PRESENT' | 'LATE') => void;
}) {
  const [isPresent, setIsPresent] = useState<
    'present' | 'absent' | 'late' | null
  >(null);

  useEffect(() => {
    if (status) {
      setIsPresent(
        status === 'ABSENT'
          ? 'absent'
          : status === 'PRESENT'
            ? 'present'
            : 'late'
      );
    }
  }, [status]);

  return (
    <div
      className={clsxm(
        'grid-cols-1 sm:grid-cols-5',
        'grid py-2 px-6 rounded-md border bg-white items-center gap-4 lg:gap-8 sm:h-[82px] sm:max-h-[82px]',
        isPresent === 'present' && 'border-green-500',
        isPresent === 'absent' && 'border-red-500',
        isPresent === 'late' && 'border-yellow-500'
      )}
    >
      <div className='flex flex-row gap-4 items-center mx-auto'>
        <div className='font-bold text-lg'>{index + 1}</div>
        <div className='h-20 w-20 sm:h-16 sm:w-16 rounded-full bg-gray-300'></div>
      </div>
      <div className='font-bold text-center'>{name}</div>
      {(!isPresent || (isPresent && isPresent === 'present')) &&
        (isPresent === 'present' ? (
          <div className='text-green-500 font-semibold'>Present</div>
        ) : (
          <button
            disabled={isPresent === 'present'}
            onClick={() => {
              setIsPresent('present');
              onTakeAttendance && onTakeAttendance('PRESENT');
            }}
            className='py-3 px-12 rounded-sm bg-green-500 font-bold text-white items-center flex justify-center'
          >
            Present
          </button>
        ))}
      {(!isPresent || (isPresent && isPresent === 'absent')) &&
        (isPresent === 'absent' ? (
          <div className='text-red-500 font-semibold'>Absent</div>
        ) : (
          <button
            disabled={isPresent === 'absent'}
            className='py-3 px-12 rounded-sm bg-red-500 font-bold text-white items-center flex justify-center'
            onClick={() => {
              setIsPresent('absent');
              onTakeAttendance && onTakeAttendance('ABSENT');
            }}
          >
            Absent
          </button>
        ))}
      {(!isPresent || (isPresent && isPresent === 'late')) &&
        (isPresent === 'late' ? (
          <div className='text-yellow-500 font-semibold'>Late</div>
        ) : (
          <button
            disabled={isPresent === 'late'}
            className='py-3 px-12 rounded-sm bg-yellow-500 font-bold text-white items-center flex justify-center'
            onClick={() => {
              setIsPresent('late');
              onTakeAttendance && onTakeAttendance('LATE');
            }}
          >
            Late
          </button>
        ))}
      <div
        className={clsxm(
          isPresent !== null && 'col-span-2',
          'cursor-pointer px-5 justify-self-end text-lg text-gray-500',
          !isPresent && 'opacity-0 cursor-default'
        )}
        onClick={() => setIsPresent(null)}
      >
        Edit
      </div>
    </div>
  );
}
