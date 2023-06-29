import clsxm from '@/lib/clsxm';
import Link from 'next/link';
import UsersThree from '~/svg/users_three_alt.svg';

export default function CountCardAlt({
  title,
  count,
  viewAllLabel,
  url,
  variant = 0,
}: {
  title: string;
  count: number;
  viewAllLabel: string;
  variant?: number;
  url?: string;
}) {
  const classNames = [
    'bg-[#FFF3EF] border-[#FF6633]',
    'bg-[#FBEEFF] border-[#660195]',
    'bg-[#EDFFF9] border-[#008146]',
  ];
  const textColors = ['text-[#FF6633]', 'text-[#660195]', 'text-[#02A369]'];
  return (
    <div
      className={clsxm(
        'rounded-lg border p-[20px] h-[240px] min-w-[240px] flex flex-col gap-3',
        classNames[variant]
      )}
    >
      <div className='flex justify-between items-center text-[#8F8F8F]'>
        <div className='text-xl'>{title}</div>
        <UsersThree className='h-8 w-8' />
      </div>
      <div className='font-bold text-5xl'>{count}</div>
      <div className='flex-1' />
      <Link href={url ?? '#'}>
        <div
          className={clsxm(
            'rounded-lg border text-center py-[9px]',
            classNames[variant],
            textColors[variant]
          )}
        >
          {viewAllLabel}
        </div>
      </Link>
    </div>
  );
}
