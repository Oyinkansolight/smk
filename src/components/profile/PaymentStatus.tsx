import clsxm from '@/lib/clsxm';

export default function ScoreStatus({ status }: { status: number | string }) {
  return (
    <div
      className={clsxm(
        'flex w-full whitespace-nowrap max-w-[130px] items-center justify-center max-h-[20px] rounded-full py-3 capitalize text-white',
        status === 'Completed' && 'bg-[#4AAF05]',
        status === 'Pending' && 'bg-orange-500',
        status === 'Due' && 'bg-red-500'
      )}
    >
      <div>{status}</div>
    </div>
  );
}
