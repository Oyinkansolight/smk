import clsxm from '@/lib/clsxm';


export default function CircularCheckboxPrimary({
  checked,
  onClick,
  className,
}: {
  checked: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={clsxm(
        'relative h-5 w-5 rounded-full flex items-center justify-center border border-primary',
        checked ? '' : 'bg-white',
        className
      )}
    >
      <div
        className={clsxm(
          ' bg-primary h-3 w-3 rounded-full',
          !checked && 'hidden'
        )}
      ></div>
    </div>
  );
}