import clsxm from '@/lib/clsxm';
import Image from 'next/image';

export default function EmptyView({
  label,
  useStandardHeight,
}: {
  label: string;
  useStandardHeight: boolean;
}) {
  return (
    <div
      className={clsxm(
        'bg-white flex flex-col gap-4 items-center justify-center',
        useStandardHeight && 'h-96'
      )}
    >
      <Image
        height={128}
        width={128}
        src='/images/empty_box.png'
        alt='empty box'
      />
      <div>{label}</div>
    </div>
  );
}
