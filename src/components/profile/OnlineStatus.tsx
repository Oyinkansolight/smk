import clsxm from '@/lib/clsxm';

export default function OnlineStatus({
  status,
}: {
  status: 'online' | 'offline' | 'away' | 'inactive' | 'deactivated';
}) {
  return (
    <div
      className={clsxm(
        'flex items-center justify-center max-h-[20px] rounded-full py-1 px-8 capitalize text-white',
        status === 'online'
          ? 'bg-[#4AAF05]'
          : status === 'away' || status === 'inactive'
          ? 'bg-orange-500'
          : status === 'deactivated'
          ? 'bg-[#FF5756]'
          : 'bg-gray-400'
      )}
    >
      {status}
    </div>
  );
}
