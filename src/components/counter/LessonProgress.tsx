import clsxm from '@/lib/clsxm';

export default function LessonProgress({
  done,
  total,
}: {
  total: number;
  done: number;
}) {
  return (
    <div className='flex w-full items-center'>
      <div className='flex font-bold'>
        <div className='text-[#8898AA]'>{done}</div>
        <div>/{total}</div>
      </div>
      <div className='w-2' />
      <div className='h-2 flex-1 overflow-hidden rounded-full border border-[#3361FF] bg-white'>
        <div
          style={{ width: `${(done / total) * 100}%` }}
          className={clsxm('h-full w-[10%] bg-[#3361FF]')}
        ></div>
      </div>
    </div>
  );
}
