import clsxm from '@/lib/clsxm';

export default function SmallTeacherCard({
  icon,
  title,
  subtitle,
  className,
}: {
  icon: JSX.Element;
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <div
      className={clsxm(
        'rounded-md flex items-center justify-center py-4 px-6 gap-2',
        className
      )}
    >
      <div>{icon}</div>
      <div>
        <div className='font-black text-4xl'>{title}</div>
        <div className='text-[#848689] font-bold'>{subtitle}</div>
      </div>
    </div>
  );
}
