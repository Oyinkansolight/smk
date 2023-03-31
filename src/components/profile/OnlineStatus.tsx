import clsxm from '@/lib/clsxm';

export default function OnlineStatus({
  status,
}: {
  status: 'online' | 'offline' | 'away';
}) {
  return (
    <div
      className={clsxm(
        'rounded-full py-1 px-8 capitalize text-white',
        status === 'online'
          ? 'bg-green-500'
          : status === 'away'
          ? 'bg-orange-500'
          : 'bg-gray-400'
      )}
    >
      {status}
    </div>
  );
}
