import clsxm from '@/lib/clsxm';

export default function LessonProgress({
  done,
  total,
  showLabel = true,
  variant = 'primary',
}: {
  total: number;
  done: number;
  showLabel?: boolean;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <div className='flex w-full items-center'>
      {showLabel && (
        <>
          <div className='flex font-bold'>
            <div className='text-[#8898AA]'>{done}</div>
            <div>/{total}</div>
          </div>
          <div className='w-2' />
        </>
      )}
      <div
        className={clsxm(
          'h-2 max-w-xs flex-1 overflow-hidden rounded-full border border-dodger-500 bg-white',
          variant === 'primary' ? 'border-dodger-500' : 'border-fun-green-500'
        )}
      >
        <div
          style={{ width: `${(done / total) * 100}%` }}
          className={clsxm(
            'h-full w-[10%]',
            variant === 'primary' ? 'bg-dodger-500' : 'bg-fun-green-500'
          )}
        ></div>
      </div>
    </div>
  );
}
