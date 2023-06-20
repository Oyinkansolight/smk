import clsxm from '@/lib/clsxm';

export default function ScoreStatus({ score }: { score: number }) {
  return (
    <div
      className={clsxm(
        'flex items-center justify-center max-h-[20px] rounded-full py-1 px-8 capitalize text-white',
        score > 50
          ? 'bg-[#4AAF05]'
          : score > 40
          ? 'bg-orange-500'
          : 'bg-red-500'
      )}
    >
      {score > 50 ? 'Good' : score > 40 ? 'Below Average' : 'Poor'}
    </div>
  );
}
